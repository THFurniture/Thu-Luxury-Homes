import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase, Flip } from "gsap/all";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, CustomEase, Flip);

type LayoutPreloaderProps = {
  images: Array<{ src: string; alt: string }>;
  onComplete?: () => void;
};

const panelTransforms = [
  "translate-x-[-16%] translate-y-[12%] rotate-[-9deg] max-[640px]:translate-x-[-7%] max-[640px]:translate-y-[6%]",
  "translate-x-[12%] translate-y-[-10%] rotate-[7deg] max-[640px]:translate-x-[6%] max-[640px]:translate-y-[-5%]",
  "translate-x-[2%] translate-y-0 rotate-[-2deg]",
];

export default function LayoutPreloader({
  images,
  onComplete,
}: LayoutPreloaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const stagedImages =
    images.length > 1 ? [...images.slice(1), images[0]] : images;

  useGSAP(
    () => {
      if (!rootRef.current || stagedImages.length === 0) {
        setIsHidden(true);
        onComplete?.();
        return;
      }

      CustomEase.create("preloaderReveal", "0.16, 1, 0.3, 1");
      CustomEase.create("preloaderHero", "0.6, 0.01, 0.05, 1");
      CustomEase.create("preloaderSoft", "0.38, 0.005, 0.215, 1");

      const q = gsap.utils.selector(rootRef);
      const wrappers = q(".image-wrapper");
      const imagesInDom = q(".image-wrapper img");
      const wordmarkLines = q(".preloader-wordmark .line-inner");
      const captionLine = q(".preloader-caption .line-inner");
      const gridColumns = q(".grid-column");
      const supportingText = q(".preloader-side");
      const finalWrapper = wrappers[wrappers.length - 1];
      const finalImage = finalWrapper?.querySelector("img");
      const heroFrame = document.querySelector<HTMLElement>(".hero-visual-frame");

      if (!finalWrapper || !finalImage || !heroFrame) {
        setIsHidden(true);
        onComplete?.();
        return;
      }

      const stagedWrappers = wrappers.slice(0, -1);

      const tl = gsap.timeline({
        defaults: { ease: "preloaderReveal" },
      });

      tl.set(rootRef.current, { autoAlpha: 1 })
        .set(".image-wrapper", {
          clipPath: "inset(100% 0% 0% 0% round 1.75rem)",
          transformOrigin: "center center",
          willChange: "clip-path, transform, opacity",
        })
        .set(imagesInDom, {
          scale: 1.22,
          transformOrigin: "center center",
          willChange: "transform",
        })
        .set(wordmarkLines, { yPercent: 110, willChange: "transform" })
        .set(captionLine, { yPercent: 120, willChange: "transform" })
        .set(".preloader-copy", { autoAlpha: 0, y: 24, xPercent: -50, yPercent: -50 })
        .set(supportingText, { autoAlpha: 0, y: 32 })
        .set(".preloader-grid", { autoAlpha: 0 })
        .set(gridColumns, {
          scaleY: 0,
          autoAlpha: 0.35,
          transformOrigin: "top center",
          willChange: "transform, opacity",
        })
        .to(
          wrappers,
          {
            clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
            duration: 0.72,
            stagger: 0.15,
          },
          0,
        )
        .to(
          imagesInDom,
          {
            scale: 1.04,
            duration: 1.2,
            stagger: 0.08,
            ease: "preloaderHero",
          },
          0.02,
        )
        .to(
          supportingText,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          0.22,
        )
        .addLabel("expand", ">0.18")
        .to(
          stagedWrappers,
          {
            autoAlpha: 0,
            scale: 0.94,
            duration: 0.42,
            stagger: 0.05,
            ease: "power2.out",
          },
          "expand",
        )
        .to(
          supportingText,
          {
            autoAlpha: 0,
            x: (index) => (index === 0 ? -80 : 80),
            duration: 0.8,
            ease: "preloaderSoft",
          },
          "expand+=0.04",
        )
        .add(() => {
          const heroRect = heroFrame.getBoundingClientRect();
          const state = Flip.getState(finalWrapper);

          gsap.set(".preloader-stage", { overflow: "visible" });
          gsap.set(finalWrapper, {
            position: "fixed",
            top: heroRect.top,
            left: heroRect.left,
            width: heroRect.width,
            height: heroRect.height,
            borderRadius: 0,
            rotate: 0,
            x: 0,
            y: 0,
            zIndex: 12,
          });

          // Set image to absolute so we can animate top/height as CSS properties
          gsap.set(finalImage, {
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            top: "0%",
            height: "100%",
          });

          Flip.from(state, {
            absolute: true,
            duration: 1.15,
            ease: "preloaderHero",
            simple: true,
          });

          // Animate image to exactly match hero image positioning so the
          // parallax has enough vertical bleed and never exposes a gap.
          // so the visible crop is identical when the preloader fades and hero appears
          gsap.to(finalImage, {
            scale: 1,
            top: "-20%",
            height: "140%",
            duration: 1.15,
            ease: "preloaderHero",
          });
        }, "expand")
        .to(
          ".preloader-grid",
          {
            autoAlpha: 1,
            duration: 0.35,
            ease: "preloaderSoft",
          },
          "expand+=0.35",
        )
        .to(
          gridColumns,
          {
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.035,
            ease: "preloaderSoft",
          },
          "expand+=0.38",
        )
        .to(
          ".preloader-copy",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.2,
          },
          "expand+=0.44",
        )
        .to(
          wordmarkLines,
          {
            yPercent: 0,
            duration: 0.92,
            stagger: 0.1,
            ease: "preloaderHero",
          },
          "expand+=0.46",
        )
        .to(
          captionLine,
          {
            yPercent: 0,
            duration: 0.82,
            ease: "preloaderHero",
          },
          "expand+=0.58",
        )
        .addLabel("exit", ">0.18")
        .to(
          ".preloader-copy",
          {
            autoAlpha: 0,
            y: -28,
            duration: 0.35,
            ease: "power2.in",
          },
          "exit",
        )
        .to(
          ".preloader-grid",
          {
            autoAlpha: 0,
            duration: 0.28,
          },
          "exit",
        )
        .call(() => onComplete?.(), undefined, "exit+=0.08")
        .to(
          rootRef.current,
          {
            autoAlpha: 0,
            duration: 0.88,
            ease: "power1.inOut",
            onComplete: () => setIsHidden(true),
          },
          "exit+=0.1",
        );
    },
    { scope: rootRef },
  );

  if (isHidden) return null;

  return (
    <div
      ref={rootRef}
      className="preloader-shell fixed inset-0 z-[100] overflow-hidden bg-[linear-gradient(180deg,#f6f0e8_0%,#ead8c4_100%)]"
      aria-hidden="true"
    >
      <div className="preloader-grid pointer-events-none absolute inset-0">
        <div className="grid-overlay-inner grid h-full grid-cols-12 gap-3 px-5 max-[560px]:gap-2 max-[560px]:px-4">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="grid-column border-x border-white/25"
            />
          ))}
        </div>
      </div>

      <div className="preloader-stage relative flex h-full items-center justify-center overflow-hidden px-5 py-5 max-[560px]:px-4">
        <div className="preloader-side preloader-side-left pointer-events-none absolute left-5 top-1/2 z-[2] hidden -translate-y-1/2 text-[0.8rem] font-extrabold uppercase tracking-[0.34em] text-[rgba(105,91,76,0.9)] min-[900px]:block">
          The One
        </div>

        <div className="preloader-container relative h-[18.75rem] w-[25rem] max-w-[82vw] max-[640px]:h-[15rem] max-[640px]:w-[18rem]">
          {stagedImages.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              className={`image-wrapper absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/40 bg-[#d8c4ae] shadow-[0_24px_80px_rgba(31,23,18,0.18)] ${
                panelTransforms[index] ?? panelTransforms[panelTransforms.length - 1]
              }`}
              style={{ zIndex: index + 1 }}
            >
              <img
                className="h-full w-full object-cover"
                src={image.src}
                alt={image.alt}
              />
            </figure>
          ))}
        </div>

        <div className="preloader-side preloader-side-right pointer-events-none absolute right-5 top-1/2 z-[2] hidden -translate-y-1/2 text-[0.8rem] font-extrabold uppercase tracking-[0.34em] text-[rgba(105,91,76,0.9)] min-[900px]:block">
          Home Staging
        </div>

        <div className="preloader-copy pointer-events-none absolute left-1/2 top-1/2 z-[15] w-[34rem] max-w-[82vw] rounded-[1.6rem] border border-white/45 bg-[rgba(250,243,235,0.18)] p-5 backdrop-blur-[14px]">
          <div className="preloader-wordmark">
            <span className="line-mask block overflow-hidden">
              <span className="line-inner block">
                <img
                  src="/theonehomestaging_logo.png"
                  alt="The One Home Staging"
                  className="h-auto w-full p-12"
                  draggable={false}
                />
              </span>
            </span>
          </div>

          <p className="preloader-caption mt-4 max-w-[20rem] text-center mx-auto text-[0.86rem] font-extrabold uppercase tracking-[0.18em] text-[rgba(105,91,76,0.92)]">
            <span className="line-mask block overflow-hidden">
              <span className="line-inner block">
                Vancouver&apos;s Premier Home Staging Company
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
