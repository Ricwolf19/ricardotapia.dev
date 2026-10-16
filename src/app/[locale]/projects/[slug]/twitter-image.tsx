// The case-study Twitter card reuses the case-study Open Graph card. Without
// this file the route would inherit the locale twitter-image (the generic site
// card) while og:image showed the project — the two previews would disagree.
export {
  default,
  size,
  contentType,
  generateStaticParams,
  generateImageMetadata,
} from "./opengraph-image";
