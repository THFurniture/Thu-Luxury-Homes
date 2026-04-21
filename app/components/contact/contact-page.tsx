import { m, useReducedMotion } from "motion/react";

import { ContactSection } from "../home/contact-section";

const serifDisplay =
  'font-["Roboto",ui-sans-serif,system-ui,sans-serif] font-thin tracking-[-0.03em]';
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const details = [
  {
    label: "Location",
    value: "Greater Vancouver Area, BC",
  },
  {
    label: "Email",
    value: "theonehomestaging@gmail.com",
    href: "mailto:theonehomestaging@gmail.com",
  },
  {
    label: "Instagram",
    value: "@the.one.staging",
    href: "https://www.instagram.com/the.one.staging",
  },
  {
    label: "YouTube",
    value: "The One Home Staging Ltd",
    href: "https://www.youtube.com/c/TheOneHomeStagingLtd",
  },
  {
    label: "Response",
    value: "Within one business day",
  },
  {
    label: "Service areas",
    value: "Vancouver / West Van / North Van / Burnaby / Richmond / Coquitlam",
  },
];

export function ContactPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main id="top" className="bg-[#080808] text-white">
      <ContactSection />
    </main>
  );
}
