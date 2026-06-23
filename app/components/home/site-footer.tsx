import { MdOutlineEmail } from "react-icons/md";
import { SiInstagram, SiYoutube } from "react-icons/si";
import { Link } from "react-router";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const contactLinks = [
  {
    href: "mailto:theonehomestaging@gmail.com",
    label: "theonehomestaging@gmail.com",
    Icon: MdOutlineEmail,
    srLabel: "Email",
  },
  {
    href: "https://www.instagram.com/the.one.staging",
    label: "@the.one.staging",
    Icon: SiInstagram,
    srLabel: "Instagram",
  },
  {
    href: "https://www.youtube.com/c/TheOneHomeStagingLtd",
    label: "YouTube channel",
    Icon: SiYoutube,
    srLabel: "YouTube",
  },
];

const serifDisplay =
  'font-["Roboto",ui-sans-serif,system-ui,sans-serif] font-thin tracking-[-0.03em]';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_42%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.45)_50%,transparent_100%)]"
      />

      <div className="relative mx-auto max-w-[90rem] px-6 py-20 max-[560px]:px-5 max-[560px]:py-14">
        <div className="flex justify-center text-center">
          <div className="max-w-[72rem]">
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-white/40">
              Thu Luxury Homes
            </p>
            <h2
              className={`${serifDisplay} mt-6 text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.92] text-white`}
            >
              Spaces that hold attention <br className="max-[560px]:hidden" />
              <span className="text-white/55">before a word is spoken.</span>
            </h2>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-12 border-t border-white/10 pt-12 max-[820px]:grid-cols-1 max-[820px]:gap-10 max-[820px]:pt-10">
          <div>
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.24em] text-white/38">
              Navigate
            </p>
            <ul className="mt-6 grid gap-3 text-[0.98rem] text-white/78">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-2 transition duration-200 hover:text-white"
                  >
                    <span className="h-px w-0 bg-current transition-all duration-300 group-hover:w-4" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.24em] text-white/38">
              Contact
            </p>
            <ul className="mt-6 grid gap-3 text-[0.94rem] text-white/72">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="group inline-flex max-w-full items-center gap-3 break-words transition duration-200 hover:text-white"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] transition duration-200 group-hover:border-white/30 group-hover:bg-white/10">
                      <link.Icon
                        className="h-4 w-4 text-white/64 transition duration-200 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="min-w-0 break-words">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-6 border-t border-white/10 pt-8 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-5">
          <div className="flex items-center gap-5 max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-3">
            <img
              src="/thuluxuryhomes_logo.png"
              alt="Thu Luxury Homes"
              className="h-24 w-auto object-contain opacity-90"
            />
            <div className="hidden h-8 w-px bg-white/12 max-[560px]:hidden min-[561px]:block" />
            <p className="text-[0.74rem] font-medium uppercase tracking-[0.2em] text-white/42">
              {currentYear}
            </p>
          </div>

          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-[0.74rem] font-extrabold uppercase tracking-[0.22em] text-white/52 transition duration-200 hover:text-white"
            aria-label="Back to top"
          >
            Back to top
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 text-white/72 transition duration-300 group-hover:-translate-y-1 group-hover:border-white/40 group-hover:text-white">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 13V3M4 7l4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
