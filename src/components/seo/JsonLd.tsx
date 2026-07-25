type JsonLdProps = {
  id?: string;
  data:
    | Record<string, unknown>
    | Array<Record<string, unknown>>
    | Array<unknown>;
};

export function JsonLd({ id, data }: JsonLdProps) {
  const jsonString = JSON.stringify(
    Array.isArray(data)
      ? data.length === 1
        ? data[0]
        : { '@graph': data }
      : data,
  );

  return (
    <script
      id={id}
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
