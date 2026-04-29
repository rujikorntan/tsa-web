import { useEffect, useRef } from "react";
import Reveal from "../Reveal";
import Seal from "../Seal";
import CountUp from "../CountUp";
import { org } from "../content";
import { members } from "../members-data";

const SPOTLIGHT_SIZE = 600;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightWrapperRef = useRef<HTMLDivElement>(null);
  const spotlightImageRef = useRef<HTMLDivElement>(null);
  // Doubled list so the marquee can loop seamlessly via -50% translate.
  const memberNames = members.map((m) => m.name);
  const tickerCompanies = [...memberNames, ...memberNames];

  // Spotlight cursor tracking — GPU-composited via transforms, not mask-position.
  // The wrapper carries a static radial mask and translates to follow the cursor;
  // the inner image counter-translates so the revealed pixels stay aligned with
  // the section. Both updates are composite-only (no layout/paint per frame).
  useEffect(() => {
    const el = sectionRef.current;
    const wrapper = spotlightWrapperRef.current;
    const image = spotlightImageRef.current;
    if (!el || !wrapper || !image || typeof window === "undefined") return;

    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!supportsHover || reducedMotion) return;

    let rect = el.getBoundingClientRect();
    let pendingX = 0;
    let pendingY = 0;
    let rafId = 0;

    const syncSize = () => {
      rect = el.getBoundingClientRect();
      image.style.width = `${rect.width}px`;
      image.style.height = `${rect.height}px`;
    };
    syncSize();

    const updateRect = () => {
      rect = el.getBoundingClientRect();
    };

    const flush = () => {
      rafId = 0;
      const lx = pendingX - rect.left;
      const ly = pendingY - rect.top;
      wrapper.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
      image.style.transform = `translate3d(${SPOTLIGHT_SIZE / 2 - lx}px, ${SPOTLIGHT_SIZE / 2 - ly}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(flush);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", syncSize, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    return () => {
      el.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", syncSize);
      window.removeEventListener("scroll", updateRect);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} id="top"
      className="relative isolate overflow-hidden grain bg-parchment"
    >
      {/* Abstract photographic backdrop — heavily processed surveyor imagery */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage:
              "url('/hero-backdrop.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            filter: "grayscale(0.85) contrast(1.05) blur(14px)",
            opacity: 0.28,
            mixBlendMode: "luminosity",
          }}
        />
        {/* Duotone tint — bridges the photo into the navy/blue palette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(247,247,244,0.55) 0%, rgba(30,64,175,0.22) 45%, rgba(11,20,34,0.45) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        {/* Spotlight reveal — wrapper carries a static mask and translates via
            transform; the inner image counter-translates to keep the revealed
            pixels locked to the section. Composite-only, no per-frame repaint. */}
        <div
          ref={spotlightWrapperRef}
          className="pointer-events-none absolute overflow-hidden"
          style={{
            width: SPOTLIGHT_SIZE,
            height: SPOTLIGHT_SIZE,
            left: -SPOTLIGHT_SIZE / 2,
            top: -SPOTLIGHT_SIZE / 2,
            transform: "translate3d(-9999px, -9999px, 0)",
            willChange: "transform",
            WebkitMaskImage:
              "radial-gradient(circle 280px at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, transparent 78%)",
            maskImage:
              "radial-gradient(circle 280px at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, transparent 78%)",
          }}
        >
          <div
            ref={spotlightImageRef}
            className="absolute left-0 top-0"
            style={{
              backgroundImage: "url('/hero-backdrop.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.85,
              willChange: "transform",
            }}
          />
        </div>
        {/* Soft vignette so edges fade into parchment */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 50%, transparent 25%, rgba(247,247,244,0.75) 78%)",
          }}
        />
      </div>

      {/* Aurora gradient mesh — modern, slow drift. Smaller blur radii + an
          explicit composite layer so the animated transforms stay GPU-only. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora-a absolute -left-32 -top-32 h-160 w-160 rounded-full opacity-70 blur-[70px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(30,64,175,0.26), transparent 65%)",
          }}
        />
        <div className="animate-aurora-b absolute right-[-12%] top-[-15%] h-170 w-170 rounded-full opacity-70 blur-[80px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(11,20,34,0.22), transparent 65%)",
          }}
        />
        <div className="animate-aurora-c absolute bottom-[-20%] left-[20%] h-130 w-130 rounded-full opacity-80 blur-[60px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(224,169,58,0.30), transparent 65%)",
          }}
        />
      </div>

      {/* Faint topographic-style decorative arcs (kept, lower opacity) */}
      <svg aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 hidden h-170 w-170 text-ink/6 md:block"
        viewBox="0 0 600 600"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <circle key={i}
            cx="300"
            cy="300"
            r={60 + i * 22}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        ))}
      </svg>

      <div className="mx-auto grid max-w-350 grid-cols-1 gap-12 px-6 pb-20 pt-12 md:grid-cols-12 md:gap-8 md:px-10 md:pb-24 md:pt-16">
        {/* Left column — copy */}
        <div className="relative z-20 md:col-span-7">
          <Reveal delay={180}>
            <h1 className="font-serif-thai text-[70px]! font-semibold pt-40 leading-[1.02] tracking-[-0.01em] text-ink md:text-[88px] lg:text-[104px]">
              <span className="block">
                สมาคมเซอร์เวย์
              </span>
              <span className="block text-crimson">ประเทศไทย</span>
            </h1>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <p className="text-[26px] italic text-ink/80"
              >
                {org.nameEn}
              </p>
              <span className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/55">
                — a non-profit trade association
              </span>
            </div>
          </Reveal>

          <Reveal delay={560}>
            <p className="font-sans-thai text-balance mt-10 max-w-140 text-[17px] leading-[1.7] text-ink/75 md:text-[18px]">
              {org.tagline}
            </p>
          </Reveal>

          <Reveal delay={720}>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
              <Stat label="ก่อตั้ง" value={2560} />
              <Stat label="สมาชิก" value={85} suffix="+" />
              <Stat label="คลอบคลุมจังหวัด" value={77} />
            </div>
          </Reveal>

          <Reveal delay={880}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a href="#about"
                className="group inline-flex items-center gap-3 bg-ink px-6 py-4 text-parchment transition-colors hover:bg-crimson"
              >
                <span className="font-sans-thai text-[14px] font-medium">
                  ทำความรู้จักสมาคม
                </span>
                <span className="font-mono-tsa text-[12px] tracking-[0.24em] opacity-70 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a href="/members"
                className="font-sans-thai inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-[14px] text-ink transition-colors hover:text-crimson hover:border-crimson"
              >
                ดูทำเนียบสมาชิก
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right column — Seal */}
        <div className="relative z-20 flex items-center justify-center md:col-span-5">
          <Reveal delay={650} className="relative reveal-center">
            <div className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "conic-gradient(from 120deg at 50% 50%, rgba(30,64,175,0.18), rgba(224,169,58,0.22), rgba(11,20,34,0.10), rgba(30,64,175,0.18))",
              }}
            />
            <Seal className="h-85 w-85 text-ink transition-transform duration-700 hover:scale-[1.02] md:h-105 md:w-105 lg:h-115 lg:w-115" />
          </Reveal>
        </div>
      </div>

      {/* Member-companies ticker marquee */}
      <div className="relative z-10 overflow-hidden border-t border-ink/15 bg-parchment-deep">
        <div className="flex items-center gap-6 py-3">
          <div className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap"
            aria-hidden
          >
            {tickerCompanies.map((p, i) => (
              <span key={i}
                className="font-sans-thai flex items-center gap-8 text-[13px] text-ink/70"
              >
                {p}
                <span className="text-gold">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="border-t border-ink/20 pt-3">
      <div className="flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-crimson" />
        <div className="font-mono-tsa text-[10px] uppercase tracking-[0.28em] text-ink/55">
          {label}
        </div>
      </div>
      <CountUp to={value}
        suffix={suffix}
        className="font-serif-thai tabular-nums mt-2 inline-block text-[26px] font-semibold text-ink md:text-[28px]"
      />
    </div>
  );
}
