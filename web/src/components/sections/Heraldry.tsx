import Reveal from "../Reveal";
import { heraldry } from "../content";

const glyphs = [
  // Two hands
  (
    <svg key="hands" viewBox="0 0 100 100" className="h-full w-full" fill="none">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M 22 60 Q 24 40 36 38 L 44 50 L 50 56" />
        <path d="M 78 60 Q 76 40 64 38 L 56 50 L 50 56" />
        <path d="M 32 64 L 40 56" />
        <path d="M 68 64 L 60 56" />
        <circle cx="50" cy="62" r="4" />
        <path d="M 30 70 Q 50 80 70 70" />
      </g>
    </svg>
  ),
  // Wings
  (
    <svg key="wings" viewBox="0 0 100 100" className="h-full w-full" fill="none">
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M 50 50 Q 30 28 8 32" />
        <path d="M 50 54 Q 28 36 12 42" />
        <path d="M 50 58 Q 30 46 18 52" />
        <path d="M 50 50 Q 70 28 92 32" />
        <path d="M 50 54 Q 72 36 88 42" />
        <path d="M 50 58 Q 70 46 82 52" />
        <circle cx="50" cy="56" r="3" />
      </g>
    </svg>
  ),
  // Shield
  (
    <svg key="shield" viewBox="0 0 100 100" className="h-full w-full" fill="none">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M 50 18 L 78 28 L 78 56 Q 78 74 50 86 Q 22 74 22 56 L 22 28 Z" />
        <path d="M 50 28 L 70 36 L 70 56 Q 70 68 50 76 Q 30 68 30 56 L 30 36 Z" opacity="0.6" />
        <path d="M 50 44 L 50 64" />
        <path d="M 40 54 L 60 54" />
      </g>
    </svg>
  ),
  // Tri-colour
  (
    <svg key="flag" viewBox="0 0 100 100" className="h-full w-full" fill="none">
      <g stroke="currentColor" strokeWidth="1.2">
        <rect x="20" y="22" width="60" height="56" />
        <line x1="20" y1="36" x2="80" y2="36" />
        <line x1="20" y1="50" x2="80" y2="50" />
        <line x1="20" y1="64" x2="80" y2="64" />
      </g>
      <g>
        <rect x="20" y="22" width="60" height="14" fill="currentColor" opacity="0.0" />
        <rect x="20" y="36" width="60" height="14" fill="currentColor" opacity="0.0" />
        <rect x="20" y="50" width="60" height="14" fill="currentColor" opacity="0.85" />
        <rect x="20" y="64" width="60" height="14" fill="currentColor" opacity="0.0" />
      </g>
    </svg>
  ),
];

export default function Heraldry() {
  return (
    <section id="heraldry" className="relative bg-parchment-deep py-28 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(14,27,46,0.3), transparent)",
        }}
      />

      <div className="mx-auto max-w-350 px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
                <span className="inline-block h-px w-10 bg-ink/40" />
                <span>III.</span>
                <span>Heraldry · อัตลักษณ์</span>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <h2 className="font-serif-thai mt-6 text-[44px] font-medium leading-[1.05] tracking-tight text-ink md:text-[60px]">
                ความหมาย ของตราสัญลักษณ์
              </h2>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-6 max-w-sm text-[20px] italic leading-[1.55] text-ink/65"
              >
                Every line on the seal carries a meaning — a vow inherited from our founding members.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <div className="font-mono-tsa mt-10 flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-crimson">
                <span className="inline-block h-px w-6 bg-crimson" />
                <span>read clockwise</span>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {heraldry.map((h, i) => (
                <Reveal key={h.en}
                  as="li"
                  delay={150 + i * 140}
                  className="group relative flex gap-5 border-l border-ink/25 bg-parchment/70 p-6 backdrop-blur-sm transition-colors hover:border-crimson"
                >
                  <div className="h-16 w-16 shrink-0 text-ink/85 transition-transform duration-500 group-hover:scale-105 group-hover:text-crimson">
                    {glyphs[i]}
                  </div>
                  <div>
                    <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/55">
                      {h.en}
                    </div>
                    <div className="font-serif-thai mt-2 text-[24px] font-medium leading-tight text-ink">
                      {h.label}
                    </div>
                    <p className="font-sans-thai text-balance mt-3 text-[14px] leading-[1.7] text-ink/72">
                      {h.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
