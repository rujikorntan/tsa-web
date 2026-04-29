import Reveal from "../Reveal";
import { pillars } from "../content";

export default function Pillars() {
  return (
    <section id="pillars" className="relative bg-parchment py-28 md:py-40">
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
                <span className="inline-block h-px w-10 bg-ink/40" />
                <span>II.</span>
                <span>Four Pillars · พันธกิจ</span>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <h2 className="font-serif-thai text-balance mt-6 max-w-[18ch] text-[44px] font-medium leading-[1.06] tracking-tight text-ink md:text-[64px]">
                สี่เสาหลัก <br />แห่งวิชาชีพสำรวจภัย
              </h2>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <p className="max-w-sm text-[20px] italic leading-normal text-ink/65"
            >
              The four guiding objectives that shape every action of our association.
            </p>
          </Reveal>
        </div>

        <Reveal delay={420}>
          <div className="mt-14 hairline h-px text-ink/40" />
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-ink/20 bg-ink/20 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.indexEn}
              delay={120 + i * 130}
              as="li"
              className="group relative flex flex-col bg-parchment p-8 transition-colors duration-300 hover:bg-parchment-deep md:p-12"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif-thai text-[64px] leading-none text-gold md:text-[88px]">
                  {p.indexTh}
                </span>
                <span className="font-mono-tsa text-[12px] uppercase tracking-[0.3em] text-ink/55">
                  pillar / {p.indexEn}
                </span>
              </div>

              <div className="mt-10 hairline h-px text-ink/30" />

              <h3 className="font-serif-thai mt-6 text-[26px] font-medium leading-[1.2] tracking-tight text-ink md:text-[30px]">
                {p.title}
              </h3>

              <p className="font-sans-thai text-balance mt-4 max-w-[44ch] text-[16px] leading-[1.75] text-ink/72">
                {p.body}
              </p>

              <div className="mt-auto pt-10">
                <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.28em] text-ink/45 transition-colors group-hover:text-crimson">
                  <span className="inline-block h-px w-6 bg-current" />
                  <span>objective {p.indexEn}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
