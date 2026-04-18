import { MdOutlineEmail } from "react-icons/md";
import { SiInstagram, SiYoutube } from "react-icons/si";
import { Link } from "react-router";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];
const serviceAreas = [
  "Vancouver",
  "West Van",
  "North Van",
  "Burnaby",
  "Richmond",
  "Coquitlam",
];
const contactLinks = [
  {
    href: "mailto:theonehomestaging@gmail.com",
    label: "theonehomestaging@gmail.com",
    Icon: MdOutlineEmail,
  },
  {
    href: "https://www.instagram.com/the.one.staging",
    label: "Instagram",
    Icon: SiInstagram,
  },
  {
    href: "https://www.youtube.com/c/TheOneHomeStagingLtd",
    label: "YouTube",
    Icon: SiYoutube,
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,#050505_0%,#0a0a0a_42%,#050505_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_26%),linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.02)_100%)]" />

      <div className="relative flex min-h-[28rem] flex-col justify-between px-5 py-16 max-[560px]:min-h-[24rem] max-[560px]:px-4 max-[560px]:py-12">
        <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div className="max-w-[44rem]">
            <p className="text-[0.74rem] font-extrabold uppercase tracking-[0.24em] text-white/42">
              The One Home Staging
            </p>
            <h2 className='mt-5 font-["Cormorant_Garamond",Georgia,serif] text-[clamp(3.2rem,7vw,6.6rem)] leading-[0.88] tracking-[-0.04em] text-white'>
              Spaces that hold attention before a word is spoken.
            </h2>
            <p className="mt-6 max-w-[32rem] text-[1rem] leading-[1.85] text-white/64">
              Premium home staging and interior design across Greater
              Vancouver, shaped to create stronger first impressions and more
              compelling market presence.
            </p>
          </div>

          <div className="grid content-start gap-8">
            <div>
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-white/40">
                Navigate
              </p>
              <div className="mt-4 grid gap-3 text-[1rem] text-white/76">
                {footerLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="w-fit">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-white/40">
                Service Areas
              </p>
              <p className="mt-4 max-w-[18rem] text-[0.98rem] leading-[1.9] text-white/62">
                {serviceAreas.join(" / ")}
              </p>
            </div>

            <div>
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-white/40">
                Contact
              </p>
              <div className="mt-4 grid gap-3 text-[0.98rem] text-white/62">
                {contactLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex w-fit max-w-full items-center gap-2 break-words underline-offset-4 hover:text-white/82 hover:underline"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <link.Icon className="h-4 w-4 shrink-0 text-white/44" aria-hidden="true" />
                    <span className="min-w-0 break-words">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-end justify-between gap-8 border-t border-white/10 pt-6 max-[700px]:flex-col max-[700px]:items-start">
          <img
            src="/theonehomestaging_logo.png"
            alt="The One Home Staging"
            className="h-[3.2rem] w-[11rem] object-contain brightness-0 invert"
          />
          <p className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white/38">
            Vancouver, BC
          </p>
        </div>
      </div>
    </footer>
  );
}
