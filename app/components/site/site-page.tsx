import type { ReactNode } from "react";

import { SiteFooter } from "../home/site-footer";
import { SiteHeader } from "../home/site-header";

type SitePageProps = {
  children: ReactNode;
};

export function SitePage({ children }: SitePageProps) {
  return (
    <div className="relative overflow-x-clip">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
