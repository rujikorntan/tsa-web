import { useEffect, useRef, useState } from "react";
import { nav } from "../content";
import Logo from "../Logo";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY.current;
        const threshold = 80;

        setScrolled(y > 8);

        if (y < threshold) {
          setHidden(false);
        } else if (Math.abs(dy) > 4) {
          if (dy > 0) setHidden(true);
          else if (dy < 0) setHidden(false);
        }

        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out will-change-transform ${hidden ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      <div
        className={`transition-colors duration-300 ${scrolled
          ? "border-b border-ink/10 bg-parchment/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
          }`}
      >
        <div className="mx-auto flex max-w-350 items-center justify-between px-6 py-3 md:px-10">
          <a
            href="/"
            className="group flex items-center gap-3 text-ink"
            aria-label="หน้าหลัก · สมาคมเซอร์เวย์ประเทศไทย"
          >
            <span className="hidden flex-col leading-tight md:flex">
              <span className="font-serif-thai text-[15px] tracking-tight text-ink">
                สมาคมเซอร์เวย์ประเทศไทย
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-sans-thai text-[13px] font-medium tracking-wide text-ink/75 transition-colors hover:text-crimson"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="font-mono-tsa group inline-flex items-center gap-2 border border-ink/25 bg-transparent px-4 py-2 text-[12px] uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-parchment"
          >
            <span>ติดต่อสมาคม</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
