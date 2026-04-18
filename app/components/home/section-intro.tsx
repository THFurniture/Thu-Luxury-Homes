import { stagger } from "motion";
import { m, useReducedMotion } from "motion/react";

import { RevealLine } from "./reveal-line";

type SectionIntroProps = {
  tag: string;
  title: string;
  className?: string;
};

const eyebrow =
  "m-0 text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.62)]";
const serifDisplay =
  'font-["Cormorant_Garamond",Georgia,serif] font-medium tracking-[-0.03em] text-[#f5f5f5]';
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function SectionIntro({
  tag,
  title,
  className = "",
}: SectionIntroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      className={`section-intro grid grid-cols-1 items-start gap-4 ${className}`}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: stagger(0.08),
          },
        },
      }}
    >
      <p className={`section-tag ${eyebrow}`}>
        <RevealLine
          lineProps={{
            variants: {
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: { duration: 0.9, ease: easeOutExpo },
              },
            },
          }}
        >
          {tag}
        </RevealLine>
      </p>
      <div
        className={`section-copy ${serifDisplay} text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] max-[560px]:text-[clamp(2rem,12vw,3rem)]`}
      >
        <RevealLine
          allowDescenders
          lineProps={{
            variants: {
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: { duration: 0.9, ease: easeOutExpo },
              },
            },
          }}
        >
          {title}
        </RevealLine>
      </div>
    </m.div>
  );
}
