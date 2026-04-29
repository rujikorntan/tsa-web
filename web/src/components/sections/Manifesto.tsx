import Reveal from "../Reveal";
import { manifesto } from "../content";

export default function Manifesto() {
  return (
    <section id="about"
      className="relative isolate overflow-hidden bg-ink py-28 text-parchment md:py-40"
    >
      {/* Decorative grid */}
      <svg aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full text-parchment/5"
      >
        <defs>
          <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-350 px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-gold-soft">
                <span className="inline-block h-px w-10 bg-gold/60" />
                <span>I.</span>
                <span>Manifesto</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif-thai mt-6 text-[42px] font-medium leading-[1.1] tracking-tight md:text-[56px]">
                {manifesto.heading}
              </h2>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-6 text-[22px] italic text-parchment/65"
              >
                On origin & spirit
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {manifesto.body.map((para, i) => (
              <Reveal key={i} delay={200 + i * 180}>
                <p className="font-sans-thai text-balance mb-7 text-[19px] leading-[1.85] text-parchment/85 md:text-[21px]">
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal delay={760} className="mt-10">
              <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.28em] text-gold-soft">
                <span>โดยการรวมตัวของบริษัทสำรวจภัยทั่วประเทศ</span>
                <span className="inline-block h-px flex-1 bg-gold/30" />
                <span>2560</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
