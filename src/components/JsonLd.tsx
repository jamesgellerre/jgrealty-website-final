import { jsonLdScript } from '../site';

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript() }}
    />
  );
}
