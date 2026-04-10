import { eyebrow, serifDisplay } from "./content";
import { RevealLine } from "./reveal-line";

type SectionIntroProps = {
  tag: string;
  title: string;
  className?: string;
};

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
