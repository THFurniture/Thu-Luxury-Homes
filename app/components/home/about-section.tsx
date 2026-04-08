import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { loadScrollTrigger } from "~/lib/gsap.client";
import { mutedText, serifDisplay } from "./content";

gsap.registerPlugin(useGSAP);

export function AboutSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      let isCancelled = false;

      void loadScrollTrigger().then(() => {
        if (isCancelled) return;

        gsap.set(".about-main-visual", {
          clipPath: "inset(18% 0% 0% 0% round 2rem)",
        });
        gsap.set(".about-detail-visual", {
          autoAlpha: 0,
          y: 52,
          rotate: -4,
        });
        gsap.set(".about-copy-block, .about-proof-item", {
          autoAlpha: 0,
          y: 34,
        });
        gsap.set(".about-stat-line", {
          scaleY: 0,
          transformOrigin: "top center",
        });
        gsap.set(".about-stat-item", {
          autoAlpha: 0,
          y: 18,
        });

        const introTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 68%",
            once: true,
          },
        });

        introTimeline
          .to(".about-main-visual", {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            duration: 1.05,
            ease: "power4.out",
          })
          .to(
            ".about-detail-visual",
            {
              autoAlpha: 1,
              y: 0,
              rotate: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.72",
          )
          .to(
            ".about-stat-line",
            {
              scaleY: 1,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.6",
          )
          .to(
            ".about-stat-item",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.45",
          )
          .to(
            ".about-copy-block, .about-proof-item",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.6",
          );

        gsap.to(".about-img-wrapper", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });

        gsap.to(".about-stat-rail", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      return () => {
        isCancelled = true;
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      id="about"
      ref={rootRef}
      className="section about-section relative overflow-hidden bg-[linear-gradient(180deg,rgba(245,239,230,0.98)_0%,rgba(245,239,230,0.98)_100%)] px-5 pt-32 pb-24 max-[560px]:px-4 max-[560px]:pb-20"
      data-section
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(214,190,165,0.16),transparent_52%),linear-gradient(180deg,rgba(245,239,230,0.94)_0%,rgba(245,239,230,0.98)_100%)]" />

      <div className="relative mx-auto max-w-[90rem]">
        <h2 className={`${serifDisplay} mb-12 text-[clamp(2.4rem,5vw,4rem)] leading-[0.96]`}>
          Vancouver's premier home staging company
        </h2>

        <div className="mt-12 grid grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] gap-10 max-[1180px]:gap-8 max-[980px]:grid-cols-1">
          <div className="relative min-h-[46rem] max-[980px]:min-h-[36rem] max-[640px]:min-h-[31rem]">
            <div className="about-main-visual absolute inset-y-0 left-0 w-[78%] overflow-hidden rounded-[2rem] shadow-[0_30px_90px_rgba(59,37,20,0.14)] max-[640px]:w-[84%]">
              <div className="about-img-wrapper absolute inset-[-8%] overflow-hidden">
                <img
                  className="h-full w-full scale-[1.08] object-cover"
                  src="/projects-imgs/w_georgia_st_1128/w-georgia-st-1128-4903-vancouver-6.avif"
                  alt="Professionally staged Vancouver living space with layered neutral furniture"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,13,10,0.02)_0%,rgba(18,13,10,0.22)_100%)]" />
            </div>

            <figure className="about-detail-visual absolute bottom-[8%] right-0 z-[2] w-[44%] overflow-hidden rounded-[1.6rem] border border-white/50 bg-[rgba(245,239,230,0.96)] shadow-[0_26px_70px_rgba(59,37,20,0.16)] max-[980px]:bottom-[4%] max-[640px]:w-[48%]">
              <img
                className="aspect-[0.82] w-full object-cover"
                src="/projects-imgs/alberni_st_1568/alberni-st-1568-4001-vancouver-3.avif"
                alt="Styled Vancouver bedroom with warm textures and refined staging"
              />
            </figure>
          </div>

          <div className="grid content-start gap-6 self-center rounded-[2rem] border border-[rgba(31,23,18,0.1)] bg-[rgba(245,239,230,0.76)] p-8 shadow-[0_24px_70px_rgba(59,37,20,0.08)] backdrop-blur-[10px] max-[640px]:p-6">
            <div className="about-copy-block">
              <div className="mb-5 h-px w-16 bg-[rgba(109,71,39,0.22)]" />
              <p
                className={`m-0 max-w-[39rem] text-[1.02rem] leading-[1.9] ${mutedText}`}
              >
                We deliver professional home staging and interior design services across Greater Vancouver. Our approach transforms empty properties and lived-in homes into emotionally compelling spaces that help buyers envision their future and drive faster, higher-value sales.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.4rem] border border-[rgba(31,23,18,0.08)] bg-[rgba(255,250,244,0.52)] p-5">
                <h3 className={`${serifDisplay} text-[1.95rem] leading-[0.96]`}>Mission</h3>
                <p className={`mt-3 max-w-[26rem] text-[0.95rem] leading-[1.82] ${mutedText}`}>
                  We transform spaces into attractive, functional environments that emotionally connect with buyers, increasing property value and speeding up sales.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[rgba(31,23,18,0.08)] bg-[rgba(255,250,244,0.52)] p-5">
                <h3 className={`${serifDisplay} text-[1.95rem] leading-[0.96]`}>Vision</h3>
                <p className={`mt-3 max-w-[26rem] text-[0.95rem] leading-[1.82] ${mutedText}`}>
                  To be a leading home staging company recognized for creativity, quality, and the ability to turn every property into a unique, standout market experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
