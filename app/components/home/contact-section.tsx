import { m, useReducedMotion } from "motion/react";
import { MdOutlineEmail } from "react-icons/md";
import { SiInstagram, SiYoutube } from "react-icons/si";
import { useFetcher } from "react-router";

import type { ContactFormActionData } from "../../lib/contact-form.server";
import { SectionIntro } from "./section-intro";

const inputClassName =
  "w-full border-0 border-b border-[rgba(17,17,17,0.18)] bg-transparent px-0 py-3 text-[#111111] outline-none transition placeholder:text-[rgba(82,82,82,0.45)] focus:border-[rgba(17,17,17,0.72)] focus:shadow-none";
const labelClassName =
  "text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[rgba(38,38,38,0.8)]";
const mutedText = "text-[rgba(229,229,229,0.78)]";
const serifDisplay =
  'font-["Roboto",ui-sans-serif,system-ui,sans-serif] font-thin tracking-[-0.03em] text-[#f5f5f5]';
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
    label: "Email",
    href: "mailto:theonehomestaging@gmail.com",
    text: "theonehomestaging@gmail.com",
    Icon: MdOutlineEmail,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/the.one.staging",
    text: "@the.one.staging",
    Icon: SiInstagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/c/TheOneHomeStagingLtd",
    text: "The One Home Staging Ltd",
    Icon: SiYoutube,
  },
];

export function ContactSection() {
  const fetcher = useFetcher<ContactFormActionData>();
  const isSubmitting = fetcher.state !== "idle";
  const fieldErrors = fetcher.data?.fieldErrors ?? {};
  const isSuccess = fetcher.data?.ok === true;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="section contact-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-32"
      data-section
    >
      <div className="mx-auto max-w-[90rem] px-5 max-[560px]:px-4">
        <SectionIntro
          tag="Get in touch"
          title="Let's talk about your project"
          className="max-w-[42rem] [&_.section-copy]:text-left"
        />
      </div>

      <div className="mx-auto mt-14 max-w-[90rem] px-5 max-[560px]:px-4">
        <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-stretch gap-px border-y border-[rgba(17,17,17,0.13)] bg-[rgba(17,17,17,0.13)] shadow-[0_8px_48px_rgba(0,0,0,0.07),0_18px_40px_rgba(214,214,214,0.18)] max-[1000px]:grid-cols-1">

        <m.aside
          className="reveal-fade flex flex-col justify-between gap-10 bg-[rgba(10,10,10,1)] p-10 max-[560px]:p-7"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid gap-8">
            <div>
              <p className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.46)]">
                Location
              </p>
              <p className="text-[rgba(255,255,255,0.82)] leading-relaxed">
                Greater Vancouver Area, BC
              </p>
            </div>

            <div>
              <p className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.46)]">
                Website
              </p>
              <a
                href="https://theonestaging.com"
                className="text-[rgba(255,255,255,0.82)] underline-offset-4 hover:underline"
              >
                theonestaging.com
              </a>
            </div>

            <div className="grid gap-5">
              {contactLinks.map((link) => (
                <div key={link.label}>
                  <p className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.46)]">
                    {link.label}
                  </p>
                  <a
                    href={link.href}
                    className="inline-flex max-w-full items-center gap-2 break-words text-[rgba(255,255,255,0.82)] underline-offset-4 hover:underline"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <link.Icon className="h-4 w-4 shrink-0 text-[rgba(255,255,255,0.58)]" aria-hidden="true" />
                    <span className="min-w-0 break-words">{link.text}</span>
                  </a>
                </div>
              ))}
            </div>

            <div>
              <p className="mb-3 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.46)]">
                Service areas
              </p>
              <ul className="flex flex-wrap gap-2 p-0">
                {serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-[rgba(255,255,255,0.18)] px-[0.75rem] py-[0.4rem] text-[0.82rem] text-[rgba(255,255,255,0.72)]"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className={`${serifDisplay} text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.05] text-[rgba(255,255,255,0.92)] max-[560px]:text-[clamp(1.7rem,8vw,2.4rem)]`}>
            We turn spaces into homes people fall in love with.
          </p>
        </m.aside>

        <m.div
          className="reveal-fade flex flex-col bg-[rgba(255,255,255,1)] p-10 max-[560px]:p-7"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <p className="mb-8 text-[0.82rem] leading-relaxed text-[rgba(38,38,38,0.75)]">
            Fill out the form and we'll get back to you within one business day.
          </p>

          <fetcher.Form
            method="post"
            key={isSuccess ? "submitted" : "ready"}
            className="grid flex-1 grid-cols-2 gap-x-6 gap-y-7 max-[700px]:grid-cols-1"
          >
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <label className="grid gap-2">
              <span className={labelClassName}>Name</span>
              <input
                className={inputClassName}
                type="text"
                name="name"
                placeholder="Your full name"
                autoComplete="name"
                aria-invalid={fieldErrors.name ? true : undefined}
                aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
              />
              {fieldErrors.name ? (
                <span id="contact-name-error" className="text-[0.78rem] text-[#a10f0f]">
                  {fieldErrors.name}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Email</span>
              <input
                className={inputClassName}
                type="email"
                name="email"
                placeholder="you@email.com"
                autoComplete="email"
                aria-invalid={fieldErrors.email ? true : undefined}
                aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
              />
              {fieldErrors.email ? (
                <span id="contact-email-error" className="text-[0.78rem] text-[#a10f0f]">
                  {fieldErrors.email}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Phone</span>
              <input
                className={inputClassName}
                type="tel"
                name="phone"
                placeholder="(604) 555-0123"
                autoComplete="tel"
                aria-invalid={fieldErrors.phone ? true : undefined}
                aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
              />
              {fieldErrors.phone ? (
                <span id="contact-phone-error" className="text-[0.78rem] text-[#a10f0f]">
                  {fieldErrors.phone}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Property address</span>
              <input
                className={inputClassName}
                type="text"
                name="propertyAddress"
                placeholder="Project location"
                aria-invalid={fieldErrors.propertyAddress ? true : undefined}
                aria-describedby={
                  fieldErrors.propertyAddress ? "contact-property-address-error" : undefined
                }
              />
              {fieldErrors.propertyAddress ? (
                <span
                  id="contact-property-address-error"
                  className="text-[0.78rem] text-[#a10f0f]"
                >
                  {fieldErrors.propertyAddress}
                </span>
              ) : null}
            </label>

            <label className="col-span-full grid gap-2 max-[700px]:col-auto">
              <span className={labelClassName}>Message</span>
              <textarea
                className={`${inputClassName} resize-none`}
                name="message"
                rows={4}
                placeholder="Tell us about the property, timeline, and goals."
                aria-invalid={fieldErrors.message ? true : undefined}
                aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
              />
              {fieldErrors.message ? (
                <span id="contact-message-error" className="text-[0.78rem] text-[#a10f0f]">
                  {fieldErrors.message}
                </span>
              ) : null}
            </label>

            <div className="col-span-full flex items-center justify-between gap-4 max-[700px]:col-auto max-[480px]:flex-col max-[480px]:items-start">
              <p
                className={`text-[0.75rem] leading-relaxed ${
                  fetcher.data?.ok ? "text-[#1f5f38]" : mutedText
                } opacity-70`}
                aria-live="polite"
              >
                {fetcher.data?.message ?? "We respond within 1 business day."}
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-[rgba(17,17,17,1)] px-6 py-[0.75rem] text-[0.9rem] font-bold text-white transition duration-200 hover:-translate-y-px hover:bg-[rgba(38,38,38,1)] active:translate-y-0"
              >
                {isSubmitting ? "Sending..." : "Submit inquiry"}
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
          </fetcher.Form>
        </m.div>
        </div>
      </div>
    </section>
  );
}
