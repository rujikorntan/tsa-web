import Reveal from "../Reveal";
import { board, type Person } from "../board-data";

type Accent = "gold" | "ink" | "crimson" | "muted";

const accentBar: Record<Accent, string> = {
  gold: "bg-gold",
  ink: "bg-ink",
  crimson: "bg-crimson",
  muted: "bg-ink/30",
};

const accentRing: Record<Accent, string> = {
  gold: "ring-gold/40 bg-gold/10 text-ink",
  ink: "ring-ink/30 bg-ink/5 text-ink",
  crimson: "ring-crimson/40 bg-crimson/10 text-crimson",
  muted: "ring-ink/20 bg-ink/5 text-ink/70",
};

function initials(name: string): string {
  // Use the first character of each space-separated token, max 2.
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second).slice(0, 2);
}

function PersonCard({
  person,
  accent,
  size = "md",
}: {
  person: Person;
  accent: Accent;
  size?: "sm" | "md" | "lg";
}) {
  const dims = {
    sm: { avatar: "h-10 w-10 text-[12px]", name: "text-[13px]", title: "text-[11px]" },
    md: { avatar: "h-12 w-12 text-[13px]", name: "text-[14px]", title: "text-[12px]" },
    lg: { avatar: "h-16 w-16 text-[16px]", name: "text-[18px]", title: "text-[13px]" },
  }[size];

  return (
    <div className="group relative flex items-center gap-4 border-l-2 border-transparent bg-parchment-deep/60 px-4 py-3 transition-colors hover:bg-parchment-deep">
      <span
        className={`absolute inset-y-0 left-0 w-0.75 ${accentBar[accent]}`}
        aria-hidden
      />
      <div
        className={`flex shrink-0 items-center justify-center rounded-full font-serif-thai font-semibold ring-1 ${dims.avatar} ${accentRing[accent]}`}
        aria-hidden
      >
        {initials(person.name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className={`font-serif-thai font-medium leading-tight text-ink ${dims.name}`}>
          {person.name}
        </div>
        {person.title && (
          <div className={`font-sans-thai mt-1 leading-tight text-ink/60 ${dims.title}`}>
            {person.title}
          </div>
        )}
      </div>
    </div>
  );
}

function TierLabel({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="inline-block h-px w-10 bg-ink/30" />
      <div>
        <div className="font-mono-tsa text-[11px] uppercase tracking-[0.32em] text-crimson">
          {kicker}
        </div>
        <div className="font-serif-thai mt-1 text-[20px] font-semibold text-ink md:text-[22px]">
          {title}
        </div>
      </div>
    </div>
  );
}

export default function BoardChart() {
  return (
    <section
      id="board"
      className="relative isolate bg-parchment"
    >
      <div className="mx-auto max-w-350 px-6 md:px-10">
        {/* Visual org chart — designed reference image */}
        <Reveal>
          <figure className="mb-20 overflow-hidden border border-ink/10 bg-parchment-deep">
            <img
              src="/structure.png"
              alt="โครงสร้างบอร์ดบริหาร สมาคมเซอร์เวย์ประเทศไทย"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            <figcaption className="font-mono-tsa border-t border-ink/10 px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-ink/55 md:px-6">
              ผังโครงสร้างคณะกรรมการบริหารวาระปัจจุบัน
            </figcaption>
          </figure>
        </Reveal>

        {/* President — centered, prominent */}
        <Reveal>
          <TierLabel kicker="President" title="นายกสมาคม" />
        </Reveal>
        <Reveal delay={120}>
          <div className="mx-auto max-w-md">
            <PersonCard person={board.president} accent="gold" size="lg" />
          </div>
        </Reveal>

        {/* Vice Presidents */}
        <div className="mt-16">
          <Reveal>
            <TierLabel kicker="Vice Presidents" title="อุปนายกสมาคม" />
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {board.vicePresidents.map((p) => (
                <PersonCard key={p.name} person={p} accent="ink" size="lg" />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Committee */}
        <div className="mt-16">
          <Reveal>
            <TierLabel kicker="Executive Committee" title="คณะกรรมการบริหาร" />
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {board.committee.map((p) => (
                <PersonCard key={p.name} person={p} accent="ink" />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Sub-committees */}
        <div className="mt-16">
          <Reveal>
            <TierLabel kicker="Sub-committees" title="อนุกรรมการ" />
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {board.subCommittees.map((p) => (
                <PersonCard key={p.name} person={p} accent="crimson" />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Secretaries */}
        <div className="mt-16">
          <Reveal>
            <TierLabel kicker="Secretariat" title="ฝ่ายเลขานุการ" />
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {board.secretaries.map((p) => (
                <PersonCard key={p.name} person={p} accent="muted" size="sm" />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Advisors group */}
        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-ink/15 pt-16 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <TierLabel kicker="Honorary Advisors" title="ที่ปรึกษากิตติมศักดิ์" />
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {board.honoraryAdvisors.map((p) => (
                  <PersonCard key={p.name} person={p} accent="gold" size="sm" />
                ))}
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <TierLabel kicker="Advisors" title="ที่ปรึกษา" />
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {board.advisors.map((p) => (
                  <PersonCard key={p.name} person={p} accent="crimson" size="sm" />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
