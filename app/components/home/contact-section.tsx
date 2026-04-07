import {
  mutedText,
  serifDisplay,
  serviceAreas,
} from "./content";
import { SectionIntro } from "./section-intro";

const inputClassName =
  "w-full border-0 border-b border-[rgba(31,23,18,0.18)] bg-transparent px-0 py-3 text-[#1f1712] outline-none transition placeholder:text-[rgba(105,91,76,0.45)] focus:border-[rgba(109,71,39,0.7)] focus:shadow-none";
const labelClassName =
  "text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[rgba(109,71,39,0.8)]";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section contact-section overflow-hidden px-5 pb-28 pt-32 max-[560px]:px-4"
      data-section
    >
      <SectionIntro tag="Get in touch" title="Let's talk about your project" />

      <div className="mt-14 grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-stretch gap-px rounded-[2rem] border border-[rgba(31,23,18,0.13)] bg-[rgba(31,23,18,0.13)] shadow-[0_8px_48px_rgba(31,23,18,0.07)] max-[1000px]:grid-cols-1">

        {/* Left — identity panel */}
        <aside className="reveal-fade flex flex-col justify-between gap-10 rounded-l-[2rem] bg-[rgba(42,28,18,1)] p-10 max-[1000px]:rounded-b-none max-[1000px]:rounded-t-[2rem] max-[560px]:p-7">
          <div className="grid gap-8">
            <div>
              <p className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(255,228,195,0.5)]">
                Location
              </p>
              <p className="text-[rgba(255,240,220,0.85)] leading-relaxed">
                Greater Vancouver Area, BC
              </p>
            </div>

            <div>
              <p className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(255,228,195,0.5)]">
                Website
              </p>
              <a
                href="https://theonestaging.com"
                className="text-[rgba(255,240,220,0.85)] underline-offset-4 hover:underline"
              >
                theonestaging.com
              </a>
            </div>

            <div>
              <p className="mb-3 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(255,228,195,0.5)]">
                Service areas
              </p>
              <ul className="flex flex-wrap gap-2 p-0">
                {serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-[rgba(255,228,195,0.18)] px-[0.75rem] py-[0.4rem] text-[0.82rem] text-[rgba(255,228,195,0.75)]"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className={`${serifDisplay} text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.05] text-[rgba(255,240,220,0.92)] max-[560px]:text-[clamp(1.7rem,8vw,2.4rem)]`}>
            We turn spaces into homes people fall in love with.
          </p>
        </aside>

        {/* Right — form panel */}
        <div className="reveal-fade flex flex-col rounded-r-[2rem] bg-[rgba(255,252,247,1)] p-10 max-[1000px]:rounded-b-[2rem] max-[1000px]:rounded-t-none max-[560px]:p-7">
          <p className="mb-8 text-[0.82rem] leading-relaxed text-[rgba(105,91,76,0.75)]">
            Fill out the form and we'll get back to you within one business day.
          </p>

          <form className="grid flex-1 grid-cols-2 gap-x-6 gap-y-7 max-[700px]:grid-cols-1">
            <label className="grid gap-2">
              <span className={labelClassName}>Name</span>
              <input
                className={inputClassName}
                type="text"
                name="name"
                placeholder="Your full name"
                autoComplete="name"
              />
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Email</span>
              <input
                className={inputClassName}
                type="email"
                name="email"
                placeholder="you@email.com"
                autoComplete="email"
              />
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Phone</span>
              <input
                className={inputClassName}
                type="tel"
                name="phone"
                placeholder="(604) 555-0123"
                autoComplete="tel"
              />
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Property address</span>
              <input
                className={inputClassName}
                type="text"
                name="property-address"
                placeholder="Project location"
              />
            </label>

            <label className="col-span-full grid gap-2 max-[700px]:col-auto">
              <span className={labelClassName}>Message</span>
              <textarea
                className={`${inputClassName} resize-none`}
                name="message"
                rows={4}
                placeholder="Tell us about the property, timeline, and goals."
              />
            </label>

            <div className="col-span-full flex items-center justify-between gap-4 max-[700px]:col-auto max-[480px]:flex-col max-[480px]:items-start">
              <p className={`text-[0.75rem] leading-relaxed ${mutedText} opacity-70`}>
                We respond within 1 business day.
              </p>
              <button
                type="button"
                className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-[rgba(109,71,39,1)] px-6 py-[0.75rem] text-[0.9rem] font-bold text-[rgba(255,248,241,1)] transition duration-200 hover:-translate-y-px hover:bg-[rgba(90,58,31,1)] active:translate-y-0"
              >
                Submit inquiry
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
