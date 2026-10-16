import { notFound } from "next/navigation";

/**
 * Catch-all so an unmatched locale-prefixed URL renders [locale]/not-found.tsx
 * inside the shell instead of the bare root not-found. Real routes are more
 * specific and win; this only sees what nothing else matched.
 */
const CatchAllPage = () => notFound();

export default CatchAllPage;
