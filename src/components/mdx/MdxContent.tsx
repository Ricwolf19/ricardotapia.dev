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
 * The compiled source is evaluated directly rather than through the package's
 * `<MDXRemote>` or the RSC `compileMDX`, both of which break under React 19 /
 * Next 15. @see AGENTS.md#mdx-case-studies
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
