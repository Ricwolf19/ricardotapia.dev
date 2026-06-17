import type { MDXComponents } from "mdx/types";
import { MdxImage } from "./MdxImage";

/**
 * Component mapping for the MDX renderer (spec §10 mdx-components).
 * rehype-pretty-code handles syntax highlighting of code blocks,
 * so `pre`/`code` only receive container styles.
 */
export const mdxComponents: MDXComponents = {
  Image: MdxImage,
  h2: (props) => <h2 className="mt-12 mb-4 font-mono text-2xl tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-3 font-mono text-xl tracking-tight" {...props} />,
  p: (props) => <p className="text-foreground-muted my-4 leading-relaxed" {...props} />,
  ul: (props) => <ul className="text-foreground-muted my-4 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => (
    <ol className="text-foreground-muted my-4 list-decimal space-y-2 pl-6" {...props} />
  ),
  a: (props) => <a className="text-accent underline-offset-4 hover:underline" {...props} />,
  strong: (props) => <strong className="text-foreground font-semibold" {...props} />,
  pre: (props) => (
    // Syntax highlighting uses the `github-dark-dimmed` theme, so the block keeps
    // a dark surface in both light and dark mode — otherwise the dimmed token
    // colors wash out on a light background.
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-[#2d333b] bg-[#1c2128] p-4 text-sm leading-7 text-[#adbac7]"
      {...props}
    />
  ),
};
