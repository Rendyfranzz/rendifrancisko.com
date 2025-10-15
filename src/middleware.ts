import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const QUERY_PARAMS_TO_STRIP = ['_rsc', '__nextDataReq'];

function isHtmlRequest(request: NextRequest) {
  const acceptHeader = request.headers.get('accept') ?? '';
  return acceptHeader.includes('text/html');
}

function isNextDataRequest(request: NextRequest) {
  return (
    request.headers.has('rsc') ||
    request.headers.has('next-router-prefetch') ||
    request.headers.has('next-router-state-tree')
  );
}

export function middleware(request: NextRequest) {
  if (!isHtmlRequest(request) || isNextDataRequest(request)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  let shouldRedirect = false;

  for (const param of QUERY_PARAMS_TO_STRIP) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      shouldRedirect = true;
    }
  }

  return shouldRedirect
    ? NextResponse.redirect(url, { status: 301 })
    : NextResponse.next();
}

export const config = {
  matcher: [
    /**
     * Match all routes except:
     * - API routes
     * - Next.js internal assets (`_next/`)
     * - Static files with extensions
     */
    '/((?!api/|_next/|.*\\.[^/]+$).*)',
  ],
};
