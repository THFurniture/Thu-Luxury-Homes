import { RevealLine } from "./reveal-line";

const serifDisplay =
  'font-["Cormorant_Garamond",Georgia,serif] font-medium tracking-[-0.03em] text-[#f5f5f5]';

export function HeroSection() {
  return (
    <section className="hero relative min-h-svh overflow-hidden pt-[7rem] text-white max-[820px]:pt-[6.4rem]">
      <div className="hero-visuals absolute inset-0">
        <figure className="hero-visual-frame absolute inset-0 overflow-hidden">
          <img
            className="absolute inset-x-0 top-[-20%] h-[140%] w-full object-cover"
            data-parallax="soft"
            src="/home-imgs/home-hero.avif"
            alt="Luxury staged home interior with soft daylight and refined contemporary furniture"
            loading="eager"
            fetchPriority="high"
          />
        </figure>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.56)_38%,rgba(0,0,0,0.22)_72%,rgba(0,0,0,0.1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.01)_38%,rgba(0,0,0,0.34)_100%)]" />
      </div>

      <div className="hero-grid relative z-[1] mx-auto grid min-h-[calc(100svh-8.25rem)] max-w-[90rem] items-center px-5 max-[560px]:px-4">
        <div className="hero-copy flex max-w-[58rem] flex-col justify-center gap-5 py-8">
          <p
            className="hero-meta m-0 text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(214,214,214,0.92)]"
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
            className="hero-intro max-w-[34rem] text-[0.95rem] leading-[1.55] text-[rgba(237,237,237,0.88)]"
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
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-[1.35rem] py-[0.8rem] text-[0.92rem] font-bold text-black transition duration-200 hover:-translate-y-px"
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
