export function SiteHeader() {
  return (
    <header className="site-header fixed left-5 right-5 top-5 z-40 flex items-center justify-between gap-4 rounded-full border border-white/40 bg-[rgba(250,243,235,0.55)] px-5 py-4 shadow-[0_12px_40px_rgba(66,46,29,0.08)] backdrop-blur-3xl max-[820px]:rounded-[1.4rem] max-[820px]:p-4 max-[560px]:left-[0.85rem] max-[560px]:right-[0.85rem] max-[560px]:top-[0.85rem]">
      <a href="#top" className="inline-flex items-center" aria-label="The One Home Staging">
        <img
          src="/theonehomestaging_logo.png"
          alt="The One Home Staging"
          className="h-[3.25rem] w-[10.5rem] px-6 object-contain max-[560px]:h-[2.6rem] max-[560px]:w-[8.4rem]"
        />
      </a>

      <nav
        className="flex items-center gap-6 text-[0.92rem] text-[rgba(31,23,18,0.76)] max-[820px]:hidden"
        aria-label="Primary"
      >
        <a href="#top">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#portfolio">Portfolio</a>
      </nav>

      <a
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(31,23,18,0.14)] bg-[rgba(255,250,245,0.7)] px-[1.35rem] py-[0.8rem] text-[0.92rem] font-bold text-[#1f1712] transition duration-200 hover:-translate-y-px"
        href="#contact"
      >
        Get a quote
      </a>
    </header>
  );
}
