import type { MDXComponents } from "mdx/types";
import { MdxImage } from "./MdxImage";

/**
 * Mapping de componentes para el renderer MDX (spec §10 mdx-components).
 * rehype-pretty-code maneja el syntax highlighting de los code blocks,
 * por lo que `pre`/`code` solo reciben estilos de contenedor.
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
    <pre
      className="border-border bg-surface-elevated my-6 overflow-x-auto rounded-lg border p-4 text-sm leading-7"
      {...props}
    />
  ),
};
