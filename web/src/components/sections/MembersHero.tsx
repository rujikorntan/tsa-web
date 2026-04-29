import Reveal from "../Reveal";
import { members } from "../members-data";

export default function MembersHero() {
  const total = members.length;
  return (
    <section id="top"
      className="relative isolate overflow-hidden grain"
      style={{ background: "var(--color-parchment)" }}
    >
      {/* Big concentric arcs left edge */}
      <svg aria-hidden
        className="pointer-events-none absolute -left-48 -bottom-32 hidden h-160 w-160 text-ink/6 md:block"
        viewBox="0 0 600 600"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i}
            cx="300"
            cy="300"
            r={70 + i * 22}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        ))}
      </svg>

      <div className="mx-auto max-w-350 px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
        <Reveal>
          <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/55">
            <a href="/" className="transition-colors hover:text-crimson">หน้าหลัก</a>
            <span>/</span>
            <span className="text-ink">ทำเนียบสมาชิก</span>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <Reveal delay={120}>
              <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
                <span className="inline-block h-px w-10 bg-ink/40" />
                <span>Member Registry</span>
                <span className="opacity-50">·</span>
                <span>เล่ม 02</span>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <h1 className="font-serif-thai mt-6 text-[56px]! font-semibold leading-[1.04] tracking-[-0.01em] text-ink md:text-[88px] lg:text-[104px]">
                <span className="block">ทำเนียบ</span>
                <span className="block">
                  สมาชิก
                  <span className="text-crimson">.</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={420}>
              <p className="mt-6 max-w-2xl text-[26px] italic leading-[1.45] text-ink/75 md:text-[30px]"
              >
                A registry of independent surveying firms — bound by craft, scattered across seventy-seven provinces.
              </p>
            </Reveal>

            <Reveal delay={580}>
              <p className="font-sans-thai text-balance mt-6 max-w-140 text-[16px] leading-[1.75] text-ink/72">
                บริษัทสมาชิกของสมาคมเซอร์เวย์ประเทศไทย ทุกแห่งได้รับการขึ้นทะเบียนและให้บริการสำรวจภัย
                ภายใต้มาตรฐานวิชาชีพร่วมกัน — ค้นหาบริษัทในจังหวัดของท่าน เพื่อประสานงานในขั้นตอนการเคลม
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-4">
            <Reveal delay={300} className="relative">
              <div className="absolute -inset-6 -z-10 rounded-full opacity-50 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(181,142,63,0.22), transparent 65%)",
                }}
              />
              <div className="relative border border-ink/20 bg-parchment/60 p-7 md:p-8">
                <div className="font-mono-tsa text-[12px] uppercase tracking-[0.3em] text-ink/55">
                  Total registered
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <div className="font-serif-thai text-[112px] leading-none tracking-tight text-ink md:text-[128px]">
                    {String(total).padStart(2, "0")}
                  </div>
                  <div className="font-sans-thai pb-3 text-[15px] text-ink/60">บริษัท</div>
                </div>
                <div className="hairline mt-6 h-px text-ink/40" />
                <div className="mt-4 grid grid-cols-2 gap-4 text-ink/80">
                  <div>
                    <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/55">
                      ครอบคลุม
                    </div>
                    <div className="font-serif-thai mt-1 text-[24px]">77 จังหวัด</div>
                  </div>
                  <div>
                    <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/55">
                      ก่อตั้ง
                    </div>
                    <div className="font-serif-thai mt-1 text-[24px]">2560</div>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-crimson" />
                  <span className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/60">
                    actively growing
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/15">
        <div className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-3 px-6 py-4 md:px-10">
          <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/60">
            ฉบับ 2569 · ปรับปรุง 29 เมษายน
          </div>
          <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/60">
            scroll to search ↓
          </div>
        </div>
      </div>
    </section>
  );
}
