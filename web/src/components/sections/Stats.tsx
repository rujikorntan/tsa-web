import type { ReactNode } from "react";
import Reveal from "../Reveal";
import { stats, governance } from "../content";

type StatVariant = {
  bg: string;
  text: string;
  muted: string;
  border: string;
  iconBg: string;
  iconText: string;
};

const variants: StatVariant[] = [
  {
    bg: "bg-gold-soft",
    text: "text-ink",
    muted: "text-ink/65",
    border: "border-ink/10",
    iconBg: "bg-ink",
    iconText: "text-gold-soft",
  },
  {
    bg: "bg-parchment",
    text: "text-ink",
    muted: "text-ink/65",
    border: "border-ink/10",
    iconBg: "bg-crimson",
    iconText: "text-parchment",
  },
  {
    bg: "bg-crimson",
    text: "text-parchment",
    muted: "text-parchment/75",
    border: "border-parchment/15",
    iconBg: "bg-parchment",
    iconText: "text-crimson",
  },
  {
    bg: "bg-ink-soft",
    text: "text-parchment",
    muted: "text-parchment/70",
    border: "border-parchment/15",
    iconBg: "bg-gold",
    iconText: "text-ink",
  },
];

const ICONS: ReactNode[] = [
  // Companies — building cluster
  <svg key="i0" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M3 21V8l5-3 5 3v13M13 21V12h7v9M3 21h18M7 11h2M7 15h2M16 16h1M16 19h1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  // Provinces — map pin
  <svg key="i1" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M12 21s7-7.3 7-12.5A7 7 0 0 0 5 8.5C5 13.7 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  // Board — laurel star
  <svg key="i2" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="m12 3 2.7 5.5 6 .9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.3 9.4l6-.9L12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>,
  // Subcommittees — network nodes
  <svg key="i3" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="19" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="m7 7 3 3M17 7l-3 3M7 17l3-3M17 17l-3-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
];

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative isolate overflow-hidden bg-parchment py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-350 px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[28px] bg-ink p-7 text-parchment shadow-[0_30px_80px_-40px_rgba(11,20,34,0.6)] md:p-12">
          <BannerBlobs />

          <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
            {/* Left — intro */}
            <div className="md:col-span-5">
              <Reveal>
                <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-gold-soft">
                  <span className="inline-block h-px w-10 bg-gold/60" />
                  <span>IV.</span>
                  <span>By the Numbers</span>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <h2 className="font-serif-thai text-balance mt-6 text-[36px] font-medium leading-[1.06] tracking-tight md:text-[48px]">
                  สมาคมเซอร์เวย์ฯ
                  <br />
                  <span className="text-gold-soft">ในตัวเลข</span>
                </h2>
              </Reveal>

              <Reveal delay={260}>
                <p className="font-sans-thai mt-5 max-w-md text-[15px] leading-[1.75] text-parchment/75">
                  สมาคมเซอร์เวย์ประเทศไทยรวมเครือข่ายบริษัทสำรวจภัย กระจายอยู่ทั่วประเทศ
                  ภายใต้คณะกรรมการบริหารและอนุกรรมการประจำภูมิภาคที่มาจากการเลือกตั้งของสมาชิก
                </p>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-parchment/20 bg-parchment/5 px-4 py-2 backdrop-blur">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gold-soft" />
                  <span className="font-mono-tsa text-[11px] uppercase tracking-[0.24em] text-parchment/80">
                    Updated · 2569
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right — 4 colorful stat tiles */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-7">
              {stats.map((s, i) => {
                const v = variants[i % variants.length];
                return (
                  <Reveal key={s.en} delay={180 + i * 110}>
                    <StatTile
                      icon={ICONS[i % ICONS.length]}
                      value={s.value}
                      suffix={s.suffix}
                      label={s.label}
                      en={s.en}
                      variant={v}
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  icon,
  value,
  suffix,
  label,
  en,
  variant,
}: {
  icon: ReactNode;
  value: string;
  suffix: string;
  label: string;
  en: string;
  variant: StatVariant;
}) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border ${variant.border} ${variant.bg} ${variant.text} p-5 transition-transform duration-500 hover:-translate-y-0.5 md:p-6`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${variant.iconBg} ${variant.iconText}`}
        >
          {icon}
        </span>
        <span
          className={`font-mono-tsa text-[10.5px] uppercase tracking-[0.26em] ${variant.muted}`}
        >
          {en}
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span
          className={`font-serif-thai text-[68px] leading-none tracking-tight md:text-[78px] ${variant.text}`}
        >
          {value}
        </span>
        <span className={`font-sans-thai text-[14px] ${variant.muted}`}>
          {suffix}
        </span>
      </div>

      <div className={`font-sans-thai mt-3 text-[14.5px] leading-snug ${variant.muted}`}>
        {label}
      </div>
    </div>
  );
}

function BannerBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      {/* Gold blob, top-right */}
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(241,196,104,0.55), transparent 70%)",
        }}
      />
      {/* Crimson blob, bottom-left */}
      <div
        className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(30,64,175,0.45), transparent 70%)",
        }}
      />
      {/* Subtle gold accent, mid-bottom */}
      <div
        className="absolute bottom-1/4 right-1/3 h-40 w-40 rounded-full opacity-30 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(224,169,58,0.4), transparent 70%)",
        }}
      />

      {/* Tiny accent shapes — playful organic dots */}
      <svg
        className="absolute right-10 top-10 hidden h-24 w-24 text-gold-soft/30 md:block"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="20" cy="20" r="3" />
        <circle cx="60" cy="20" r="2" />
        <circle cx="40" cy="50" r="2.5" />
        <circle cx="80" cy="60" r="2" />
        <circle cx="20" cy="80" r="3" />
      </svg>
    </div>
  );
}
