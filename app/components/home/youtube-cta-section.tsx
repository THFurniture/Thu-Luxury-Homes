import { m, useReducedMotion } from "motion/react";
import { SiYoutube } from "react-icons/si";

import { SectionIntro } from "./section-intro";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function YoutubeCtaSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="youtube"
      className="section youtube-cta-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#080808] px-5 pt-32 pb-32 max-[560px]:px-4 max-[560px]:pt-20 max-[560px]:pb-24"
      data-section
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />

      <div className="relative mx-auto max-w-[72rem]">
        <SectionIntro
          tag="On YouTube"
          title="Step inside our recent transformations"
          className="mx-auto max-w-[46rem] text-center [&_.section-copy]:text-center [&_.section-tag]:text-center"
        />

        <m.div
          className="relative mx-auto mt-12 max-w-[56rem]"
          initial={
            prefersReducedMotion ? false : { opacity: 0, y: 56, scale: 0.97 }
          }
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.05, ease: easeOutExpo, delay: 0.1 }}
        >
          <div className="pointer-events-none absolute inset-[-1px] bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.02)_40%,rgba(255,255,255,0.18))] opacity-80" />
          <div className="relative border border-white/10 bg-[rgba(12,12,12,0.92)] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-[8px] max-[560px]:p-2">
            <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/4aKKJQkO2Pk?rel=0&modestbranding=1"
                title="The One Home Staging on YouTube"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </m.div>

        <m.div
          className="mt-12 flex flex-col items-center justify-center gap-4 text-center max-[560px]:mt-10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
        >
          <a
            href="https://www.youtube.com/c/TheOneHomeStagingLtd"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-[0.85rem] text-[0.9rem] font-bold uppercase tracking-[0.14em] text-[#111111] transition duration-300 hover:-translate-y-px hover:bg-[rgba(255,255,255,0.92)] active:translate-y-0"
          >
            <SiYoutube className="h-5 w-5 text-[#FF0000]" aria-hidden="true" />
            Visit our YouTube channel
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.5)]">
            New videos every month
          </p>
        </m.div>
      </div>
    </section>
  );
}
