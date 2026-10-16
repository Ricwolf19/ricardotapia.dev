/**
 * The h1 + lede every index page opens with, so the vertical rhythm is the
 * same from /projects to /contact: Breadcrumbs above, content 10 units below.
 */
export const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <header className="mb-10 max-w-2xl">
    <h1 className="text-3xl tracking-tight sm:text-4xl">{title}</h1>
    <p className="text-foreground-muted mt-3 text-lg leading-relaxed">{subtitle}</p>
  </header>
);
