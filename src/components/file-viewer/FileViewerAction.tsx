import type { ReactNode, Ref } from "react";

/** Shared chrome of the header actions, so they read as one control strip. */
const ACTION_CLASS =
  "focus-visible:ring-primary rounded-md inline-flex shrink-0 cursor-pointer items-center gap-1.5 bg-white/10 px-3 py-1.5 text-xs whitespace-nowrap text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none";

type Common = {
  /** The accessible name, and the visible text on a fine pointer. */
  label: string;
  /** Replaces the text on a coarse pointer, where three labels plus the file
   * name do not fit a phone. */
  icon: ReactNode;
  compact: boolean;
  /** Keep the icon alongside the label on a fine pointer (the close button). */
  iconAlways?: boolean;
};

type AsLink = Common & {
  href: string;
  download?: string | undefined;
  newTab?: boolean;
  ref?: Ref<HTMLAnchorElement>;
  onClick?: never;
};

type AsButton = Common & {
  href?: never;
  onClick: () => void;
  download?: never;
  newTab?: never;
  ref?: never;
};

export type FileViewerActionProps = AsLink | AsButton;

/**
 * One action in the FileViewer header (download, open in a tab, close). Renders
 * an `<a>` when given an `href` and a `<button>` otherwise, so all three share
 * one set of chrome, one accessible-name rule and one compact-mode rule.
 *
 * Anchors carry a `ref` because the D/O keyboard shortcuts click them: replaying
 * a download or a popup from a handler would mean re-deriving the browser's own
 * `download` and popup rules.
 */
export const FileViewerAction = ({
  label,
  icon,
  compact,
  iconAlways = false,
  ...rest
}: FileViewerActionProps) => {
  const content = compact ? (
    icon
  ) : iconAlways ? (
    <>
      {icon} {label}
    </>
  ) : (
    label
  );

  if (rest.href === undefined) {
    return (
      <button
        type="button"
        onClick={rest.onClick}
        aria-label={label}
        title={label}
        className={ACTION_CLASS}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      ref={rest.ref}
      href={rest.href}
      download={rest.download}
      {...(rest.newTab ? { target: "_blank", rel: "noreferrer" } : {})}
      aria-label={label}
      title={label}
      className={ACTION_CLASS}
    >
      {content}
    </a>
  );
};
