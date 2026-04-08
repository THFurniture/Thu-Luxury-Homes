import gsap from "gsap";

let scrollTriggerPromise: Promise<typeof import("gsap/ScrollTrigger.js").ScrollTrigger> | null =
  null;

export function loadScrollTrigger() {
  if (!scrollTriggerPromise) {
    const scrollTriggerModulePath = "gsap/ScrollTrigger.js";

    scrollTriggerPromise = import(scrollTriggerModulePath).then((module) => {
      gsap.registerPlugin(module.ScrollTrigger);
      return module.ScrollTrigger;
    });
  }

  return scrollTriggerPromise;
}
