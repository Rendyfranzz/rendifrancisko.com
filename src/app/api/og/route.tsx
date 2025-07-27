import { combineStyles, ogPresets, ogStyles } from '@/lib/og-styles';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  try {
    return new ImageResponse(
      <div
        style={combineStyles(ogStyles.layout.center, ogPresets.bgDark, {
          height: '100%',
          width: '100%',
          fontFamily: 'Inter',
          position: 'relative',
        })}
      >
        {/* Main Content */}
        <div
          style={combineStyles(ogStyles.layout.centerColumn, {
            textAlign: 'center',
            padding: `${ogStyles.spacing[20]} ${ogStyles.spacing[16]}`,
            position: 'relative',
            zIndex: 2,
          })}
        >
          <h1 style={ogPresets.heroTitle}>RENDI DWI FRANCISKO</h1>

          <p style={ogPresets.heroSubtitle}>Software Engineer</p>

          <p
            style={combineStyles(ogPresets.bodyText, {
              maxWidth: '720px',
              marginBottom: ogStyles.spacing[10],
            })}
          >
            Explore my portfolio showcasing modern web development projects,
            innovative solutions, and insights into cutting-edge technologies.
          </p>
        </div>

        <div
          style={combineStyles(ogPresets.brandUrl, {
            position: 'absolute',
            bottom: ogStyles.spacing[10],
            right: ogStyles.spacing[16],
            zIndex: 3,
          })}
        >
          rendifrancisko.com
        </div>

        {/* Decorative elements using brand colors */}
        <div
          style={combineStyles(ogPresets.decorativeCircle, {
            position: 'absolute',
            top: ogStyles.spacing[12],
            left: ogStyles.spacing[12],
            width: '100px',
            height: '100px',
            background: ogStyles.gradients.primary,
            opacity: 0.15,
            zIndex: 1,
          })}
        />

        <div
          style={combineStyles(ogPresets.decorativeCircle, {
            position: 'absolute',
            bottom: ogStyles.spacing[12],
            left: ogStyles.spacing[12],
            width: '80px',
            height: '80px',
            background: ogStyles.gradients.primaryReverse,
            opacity: 0.1,
            zIndex: 1,
          })}
        />

        <div
          style={combineStyles(ogPresets.decorativeCircle, {
            position: 'absolute',
            top: '30%',
            right: '8%',
            width: '120px',
            height: '120px',
            background: ogStyles.gradients.rainbow,
            opacity: 0.08,
            zIndex: 1,
          })}
        />
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (_error) {
    return new Response('Failed to generate image', {
      status: 500,
    });
  }
}
