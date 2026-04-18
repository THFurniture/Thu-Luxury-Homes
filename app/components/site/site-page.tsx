import { useRef, type ReactNode } from "react";

import { SiteFooter } from "../home/site-footer";
import { SiteHeader } from "../home/site-header";
import { useHomeAnimations } from "../home/use-home-animations";

type SitePageProps = {
  children: ReactNode;
};

export function SitePage({ children }: SitePageProps) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useHomeAnimations(pageRef, true);

  return (
    <div ref={pageRef} className="relative overflow-x-clip">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
