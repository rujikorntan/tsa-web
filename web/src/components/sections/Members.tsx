import Reveal from "../Reveal";
import { members } from "../members-data";

export default function Members() {
  const preview = members.slice(0, 9);

  return (
    <section
      id="members"
      className="relative isolate bg-parchment-deep py-28 md:py-40"
    >
      <MembersBackdrop />

      <div className="relative z-10 mx-auto max-w-350 px-6 md:px-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
                <span className="inline-block h-px w-10 bg-ink/40" />
                <span>V.</span>
                <span>Members · ทำเนียบสมาชิก</span>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <h2 className="font-serif-thai text-balance mt-6 max-w-[20ch] text-[44px] font-medium leading-[1.06] tracking-tight text-ink md:text-[64px]">
                เครือข่ายสำรวจภัย ครอบคลุมทั่วประเทศ
              </h2>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <p className="max-w-sm text-[20px] italic leading-normal text-ink/65">
              A federation of {members.length}+ surveying firms working across all 77 provinces.
            </p>
          </Reveal>
        </div>

        <Reveal delay={420}>
          <div className="mt-14 hairline h-px text-ink/40" />
        </Reveal>

        <div className="relative mt-14">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((m, i) => (
              <Reveal
                key={m.id}
                delay={120 + i * 70}
                className="group flex items-center bg-parchment p-6 transition-colors duration-300 hover:bg-parchment-deep md:p-7"
              >
                <h3 className="font-serif-thai text-balance text-[18px] font-medium leading-[1.3] text-ink transition-colors group-hover:text-crimson md:text-[20px]">
                  {m.name}
                </h3>
              </Reveal>
            ))}
          </div>

          {/* White fade — last row dissolves into the section background, hinting more exists */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(236,236,234,0) 0%, rgba(236,236,234,0.7) 55%, rgba(236,236,234,1) 100%)",
            }}
          />
        </div>

        <div className="-mt-6 flex flex-col items-center gap-4">
          <Reveal>
            <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/55">
              อีก {members.length - preview.length}+ บริษัทสำรวจภัย ทั่วประเทศ
            </div>
          </Reveal>
          <Reveal delay={120}>
            <a
              href="/members"
              className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-parchment transition-colors hover:bg-crimson"
            >
              <span className="font-sans-thai text-[14px] font-medium">
                ดูทำเนียบสมาชิกทั้งหมด
              </span>
              <span className="font-mono-tsa text-[12px] tracking-[0.24em] opacity-70 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MembersBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-ink/15" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0b1422 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="font-serif-thai pointer-events-none absolute -right-4 bottom-10 select-none text-[260px] font-semibold leading-none text-ink/4 md:text-[360px]">
        V
      </div>
    </div>
  );
}
