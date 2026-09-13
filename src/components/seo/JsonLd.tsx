/**
 * Server-rendered JSON-LD. Emits a <script type="application/ld+json"> so search
 * engines get structured data in the initial HTML, with no client JS involved.
 * Build the payload with the helpers in `@/lib/schema`.
 */
export const JsonLd = ({ data }: { data: object | object[] }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
