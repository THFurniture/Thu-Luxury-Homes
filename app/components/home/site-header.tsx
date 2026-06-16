import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const prefersReducedMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileHeaderHidden, setIsMobileHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    if (!isMenuOpen || typeof window === "undefined") return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileQuery = window.matchMedia("(max-width: 820px)");

    const handleScroll = () => {
      if (!mobileQuery.matches || isMenuOpen) {
        setIsMobileHeaderHidden(false);
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 24) {
        setIsMobileHeaderHidden(false);
      } else if (Math.abs(scrollDelta) >= 8) {
        setIsMobileHeaderHidden(scrollDelta > 0 && currentScrollY > 96);
      }

      lastScrollY.current = currentScrollY;
    };

    const handleViewportChange = () => {
      if (!mobileQuery.matches) {
        setIsMobileHeaderHidden(false);
      }

      lastScrollY.current = window.scrollY;
    };

    lastScrollY.current = window.scrollY;
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    mobileQuery.addEventListener("change", handleViewportChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mobileQuery.removeEventListener("change", handleViewportChange);
    };
  }, [isMenuOpen]);

  return (
    <>
      <m.header
        className="site-header fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 border-b border-white/12 bg-[rgba(10,10,10,0.82)] px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-3xl max-[820px]:p-4"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: isMobileHeaderHidden ? "-110%" : 0 }}
        transition={{ duration: isMobileHeaderHidden ? 0.32 : 0.8, ease: easeOutExpo }}
      >
        <Link
          to="/"
          className="inline-flex items-center"
          aria-label="Thu Luxury Homes"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="/thuluxuryhomes_logo.png"
            alt="Thu Luxury Homes"
            className="h-[5rem] w-[10.5rem] px-2 object-contain max-[560px]:h-[5rem] max-[560px]:w-[8.4rem]"
          />
        </Link>

        <nav
          className="flex items-center gap-6 text-[0.92rem] text-[rgba(255,255,255,0.72)] max-[820px]:hidden"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `transition duration-200 hover:text-white ${
                  isActive ? "text-white" : "text-[rgba(255,255,255,0.72)]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 bg-white px-[1.35rem] py-[0.8rem] text-[0.92rem] font-bold text-[#111111] transition duration-200 hover:-translate-y-px max-[820px]:hidden"
            to="/contact"
          >
            Get a quote
          </Link>

          <button
            type="button"
            className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white transition duration-200 hover:bg-white/16 max-[820px]:inline-flex"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition duration-300 ${
                  isMenuOpen ? "translate-y-[0.45rem] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[0.45rem] h-px w-5 bg-current transition duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-current transition duration-300 ${
                  isMenuOpen ? "-translate-y-[0.45rem] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </m.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <m.div
            className="fixed inset-0 z-50 min-[821px]:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: easeOutExpo }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default bg-black/58 backdrop-blur-[6px]"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            />

            <m.aside
              id="mobile-navigation"
              className="absolute right-0 top-0 flex h-full w-[min(24rem,88vw)] flex-col border-l border-white/12 bg-[#0b0b0b] px-5 py-4 text-white shadow-[-24px_0_70px_rgba(0,0,0,0.42)]"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={prefersReducedMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.42, ease: easeOutExpo }}
            >
              <div className="flex items-center justify-between gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center"
                  aria-label="Thu Luxury Homes"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img
                    src="/thuluxuryhomes_logo.png"
                    alt="Thu Luxury Homes"
                    className="h-[5rem] w-[9.2rem] object-contain"
                  />
                </Link>

                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.5 4.5l9 9M13.5 4.5l-9 9"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.7"
                    />
                  </svg>
                </button>
              </div>

              <nav
                className="mt-14 grid gap-2"
                aria-label="Mobile primary"
              >
                {navLinks.map((link, index) => (
                  <m.div
                    key={link.href}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: 22 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.08 + index * 0.045,
                      ease: easeOutExpo,
                    }}
                  >
                    <NavLink
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block border-b border-white/10 py-4 font-["Roboto",ui-sans-serif,system-ui,sans-serif] text-[2.4rem] font-thin leading-none transition duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-[rgba(255,255,255,0.62)]"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </m.div>
                ))}
              </nav>

              <div className="mt-auto border-t border-white/10 pt-5">
                <p className="max-w-[17rem] text-[0.92rem] leading-[1.65] text-white/58">
                  Home staging and interior styling across Greater Vancouver.
                </p>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-[0.92rem] font-bold text-[#111111] transition duration-200 active:scale-[0.99]"
                >
                  Get a quote
                </Link>
              </div>
            </m.aside>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
