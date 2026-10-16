import { CommandPalette } from "./CommandPalette";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { SkipLink } from "./SkipLink";
import { APP_SHELL_ID, MAIN_ID } from "./shell-ids";

/**
 * Page chrome: fixed sidebar on desktop, top bar + overlay on mobile, and the
 * content column offset by the sidebar width. `#app-shell` is what the mobile
 * overlay makes inert while open.
 */
export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <>
    <SkipLink />
    <CommandPalette />
    <Sidebar />
    <MobileNav />
    <div id={APP_SHELL_ID} className="flex min-h-screen flex-col lg:pl-56">
      <main id={MAIN_ID} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  </>
);
