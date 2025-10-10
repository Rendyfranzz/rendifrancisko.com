import Script from 'next/script';

type JsonLdProps = {
  id: string;
  data:
    | Record<string, unknown>
    | Array<Record<string, unknown>>
    | Array<unknown>;
};

export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <Script
      id={id}
      type='application/ld+json'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
