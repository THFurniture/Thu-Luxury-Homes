import { m, useReducedMotion } from "motion/react";
import { Link, NavLink } from "react-router";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const prefersReducedMotion = useReducedMotion();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <m.header
      className="site-header fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 border-b border-white/12 bg-[rgba(10,10,10,0.82)] px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-3xl max-[820px]:p-4"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
    >
      <Link to="/" className="inline-flex items-center" aria-label="The One Home Staging">
        <img
          src="/theonehomestaging_logo.png"
          alt="The One Home Staging"
          className="h-[3.25rem] w-[10.5rem] px-2 object-contain brightness-0 invert max-[560px]:h-[2.6rem] max-[560px]:w-[8.4rem]"
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

      <Link
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 bg-white px-[1.35rem] py-[0.8rem] text-[0.92rem] font-bold text-[#111111] transition duration-200 hover:-translate-y-px"
        to="/contact"
      >
        Get a quote
      </Link>
    </m.header>
  );
}
