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

export function SectionIntro({
  tag,
  title,
  className = "",
}: SectionIntroProps) {
  return (
    <div
      className={`section-intro grid grid-cols-1 items-start gap-4 ${className}`}
    >
      <p className={`section-tag ${eyebrow}`}>
        <RevealLine>{tag}</RevealLine>
      </p>
      <div
        className={`section-copy ${serifDisplay} text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] max-[560px]:text-[clamp(2rem,12vw,3rem)]`}
      >
        <RevealLine allowDescenders>{title}</RevealLine>
      </div>
    </div>
  );
}
