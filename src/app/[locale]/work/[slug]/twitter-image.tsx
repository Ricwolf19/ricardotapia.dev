// The case-study Twitter card reuses the case-study Open Graph card. Without
// this file the route would inherit app/twitter-image.tsx (the generic site
// card) while og:image showed the project — the two previews would disagree.
export { default, alt, size, contentType, generateStaticParams } from "./opengraph-image";
