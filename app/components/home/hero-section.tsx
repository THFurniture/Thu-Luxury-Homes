import { heroImages, serifDisplay } from "./content";
import { RevealLine } from "./reveal-line";

export function HeroSection() {
  return (
    <section className="hero relative min-h-svh overflow-hidden pt-[8.25rem] text-[rgba(255,248,241,1)] max-[820px]:pt-[7.25rem]">
      <div className="hero-visuals absolute inset-0">
        <figure className="hero-visual-frame absolute inset-0 overflow-hidden">
          <img
            className="absolute inset-x-0 top-[-20%] h-[140%] w-full object-cover"
            data-parallax="soft"
            src={heroImages[2].src}
            alt={heroImages[2].alt}
          />
        </figure>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,13,9,0.72)_0%,rgba(20,13,9,0.46)_38%,rgba(20,13,9,0.14)_72%,rgba(20,13,9,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,13,9,0.18)_0%,rgba(20,13,9,0.02)_38%,rgba(20,13,9,0.34)_100%)]" />
      </div>

      <div className="hero-grid relative z-[1] mx-auto grid min-h-[calc(100svh-8.25rem)] max-w-[90rem] items-center px-5 max-[560px]:px-4">
        <div className="hero-copy flex max-w-[58rem] flex-col justify-center gap-5 py-8">
          <p
            className="hero-meta m-0 text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(173, 173, 173, 0.92)]"
            style={{ opacity: 0, transform: "translateY(24px)" }}
          >
            Vancouver&apos;s Premier Home Staging Company
          </p>

          <h1
            className={`hero-title ${serifDisplay} max-w-[58rem] text-[clamp(3.2rem,6.6vw,6.2rem)] leading-[0.92] text-white max-[820px]:max-w-[42rem] max-[560px]:max-w-[28rem] max-[560px]:text-[clamp(2.2rem,9vw,3.5rem)]`}
            style={{ opacity: 0 }}
          >
            <RevealLine allowDescenders>We turn spaces into</RevealLine>
            <RevealLine allowDescenders>homes people fall in</RevealLine>
            <RevealLine allowDescenders>love with.</RevealLine>
          </h1>

          <p
            className="hero-intro max-w-[34rem] text-[0.95rem] leading-[1.55] text-[rgba(255,244,235,0.88)]"
            style={{ opacity: 0, transform: "translateY(24px)" }}
          >
            Professional home staging and interior design services across
            Greater Vancouver, BC.
          </p>

          <div
            className="hero-actions flex flex-wrap items-center gap-4"
            style={{ opacity: 0, transform: "translateY(24px)" }}
          >
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[rgba(109,71,39,1)] px-[1.35rem] py-[0.8rem] text-[0.92rem] font-bold text-[rgba(255,248,241,1)] transition duration-200 hover:-translate-y-px"
              href="#contact"
            >
              Get a quote
            </a>
            <a
              className="inline-flex items-center border-b border-current pb-1 text-[0.95rem] font-bold text-white transition duration-200 hover:-translate-y-px"
              href="#portfolio"
            >
              View our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
