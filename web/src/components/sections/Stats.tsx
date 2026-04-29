import Reveal from "../Reveal";
import { stats, governance } from "../content";

export default function Stats() {
  return (
    <section id="stats" className="relative isolate overflow-hidden bg-ink py-28 text-parchment md:py-40">
      <div aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(181,142,63,0.18), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(161,37,47,0.14), transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-350 px-6 md:px-10">
        <Reveal>
          <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-gold-soft">
            <span className="inline-block h-px w-10 bg-gold/60" />
            <span>IV.</span>
            <span>By the Numbers · สมาคมในตัวเลข</span>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <h2 className="font-serif-thai text-balance mt-6 max-w-[20ch] text-[44px] font-medium leading-[1.05] tracking-tight md:text-[64px]">
            เครือข่ายผู้สำรวจภัย ที่ทอดยาวทั่วประเทศ
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-parchment/15 bg-parchment/15 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.en}
              delay={120 + i * 110}
              className="group relative bg-ink p-8 transition-colors hover:bg-ink-soft md:p-10"
            >
              <div className="font-mono-tsa text-[12px] uppercase tracking-[0.3em] text-parchment/55">
                {String(i + 1).padStart(2, "0")} / {String(stats.length).padStart(2, "0")}
              </div>

              <div className="mt-10 flex items-baseline gap-3">
                <span className="font-serif-thai text-[88px] leading-none tracking-tight text-parchment md:text-[112px]">
                  {s.value}
                </span>
                <span className="font-sans-thai text-[16px] text-parchment/65">
                  {s.suffix}
                </span>
              </div>

              <div className="mt-8 hairline h-px text-parchment/35" />

              <div className="mt-5">
                <div className="font-sans-thai text-[15px] text-parchment/85">
                  {s.label}
                </div>
                <div className="mt-1 text-[15px] italic text-parchment/55"
                >
                  {s.en}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Governance note */}
        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <div className="font-mono-tsa text-[12px] uppercase tracking-[0.32em] text-gold-soft">
                0 governance
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="font-serif-thai mt-4 text-[28px] font-medium leading-tight md:text-[34px]">
                {governance.heading}
              </h3>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={220}>
              <p className="font-sans-thai text-balance text-[17px] leading-[1.85] text-parchment/80 md:text-[19px]">
                {governance.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
