import Reveal from "../Reveal";
import { board } from "../board-data";

export default function StructureHero() {
  const totalMembers =
    1 +
    board.vicePresidents.length +
    board.committee.length +
    board.subCommittees.length +
    board.secretaries.length;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden grain"
      style={{ background: "var(--color-parchment)" }}
    >
      {/* Big concentric arcs left edge */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-48 -bottom-32 hidden h-160 w-160 text-ink/6 md:block"
        viewBox="0 0 600 600"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={i}
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
            <a href="/" className="transition-colors hover:text-crimson">
              หน้าหลัก
            </a>
            <span>/</span>
            <span className="text-ink">โครงสร้างองค์กร</span>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <Reveal delay={120}>
              <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
                <span className="inline-block h-px w-10 bg-ink/40" />
                <span>Board of Directors</span>
                <span className="opacity-50">·</span>
                <span>วาระปัจจุบัน</span>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <h1 className="font-serif-thai mt-6 text-[56px]! font-semibold leading-[1.04] tracking-[-0.01em] text-ink md:text-[88px] lg:text-[104px]">
                <span className="block">โครงสร้าง</span>
                <span className="block text-crimson">บอร์ดบริหาร</span>
              </h1>
            </Reveal>

            <Reveal delay={360}>
              <p className="font-sans-thai mt-8 max-w-160 text-[17px] leading-[1.7] text-ink/75 md:text-[18px]">
                คณะกรรมการบริหารและที่ปรึกษาของสมาคมเซอร์เวย์ประเทศไทย
                ผู้กำกับดูแลทิศทางและมาตรฐานวิชาชีพการสำรวจภัยของประเทศ
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-4">
            <Reveal delay={460}>
              <div className="border-t border-ink/15 pt-8">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
                  <Stat label="คณะกรรมการ" value={totalMembers} />
                  <Stat label="ที่ปรึกษา" value={board.advisors.length + board.honoraryAdvisors.length} />
                  <Stat label="อนุกรรมการ" value={board.subCommittees.length} />
                  <Stat label="เลขานุการ" value={board.secretaries.length} />
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="font-mono-tsa text-[10px] uppercase tracking-[0.3em] text-ink/55">
        {label}
      </dt>
      <dd className="font-serif-thai tabular-nums mt-2 text-[28px] font-semibold text-ink">
        {value}
      </dd>
    </div>
  );
}
