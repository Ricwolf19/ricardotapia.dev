"use client";

import { useMemo, type ReactElement } from "react";
import * as prodRuntime from "react/jsx-runtime";
import * as devRuntime from "react/jsx-dev-runtime";
import { mdxComponents } from "./mdx-components";

export interface SerializedMdx {
  compiledSource: string;
  scope?: Record<string, unknown>;
}

// Pick the JSX runtime that matches how the source was compiled on the server
// (jsxDEV in development, jsx in production). next-mdx-remote/serialize keys this
// off NODE_ENV, so we mirror that here.
const runtime = (process.env.NODE_ENV === "production" ? prodRuntime : devRuntime) as Record<
  string,
  unknown
>;

/**
 * Renders MDX that was serialized on the server.
 *
 * The MDX is compiled to a function body by `next-mdx-remote/serialize` (with
 * rehype-pretty-code already applied), then evaluated here on the client. We
 * evaluate the source directly instead of using the package's `<MDXRemote>` or
 * the RSC `compileMDX` because both break under React 19 / Next 15: the RSC path
 * produces elements the dev error serializer can't stringify, and the client
 * component ships without a "use client" directive, so it resolves the
 * server build of React during static generation (`useState` is null).
 */
export const MdxContent = ({ source }: { source: SerializedMdx }) => {
  const Content = useMemo(() => {
    const scope = {
      ...runtime,
      ...source.scope,
      useMDXComponents: () => mdxComponents,
    };
    const hydrate = new Function(source.compiledSource);
    return hydrate(scope).default as (props: { components?: typeof mdxComponents }) => ReactElement;
  }, [source.compiledSource, source.scope]);

  return <Content components={mdxComponents} />;
};
