import gsap from "gsap";

type ScrollTriggerType = any;
type CustomEaseType = any;
type FlipType = any;

let scrollTriggerPromise: Promise<ScrollTriggerType> | undefined;
let preloaderPluginsPromise:
  | Promise<{ CustomEase: CustomEaseType; Flip: FlipType }>
  | undefined;

export function loadScrollTrigger() {
  scrollTriggerPromise ??= import("gsap/ScrollTrigger.js").then(
    ({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      return ScrollTrigger;
    },
  );

  return scrollTriggerPromise!;
}

export function loadPreloaderPlugins() {
  preloaderPluginsPromise ??= Promise.all([
    import("gsap/CustomEase.js"),
    // @ts-ignore GSAP ships inconsistent Flip type casing; runtime import is valid.
    import("gsap/Flip.js"),
  ]).then(([{ CustomEase }, { Flip }]) => {
    gsap.registerPlugin(CustomEase, Flip);
    return { CustomEase, Flip };
  });

  return preloaderPluginsPromise!;
}
