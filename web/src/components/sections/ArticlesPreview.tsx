import Reveal from "../Reveal";
import type { Article } from "../../lib/cms";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const readingMinutes = (text: string | null) => {
  if (!text) return null;
  const chars = text.replace(/\s+/g, "").length;
  return Math.max(1, Math.round(chars / 350));
};

type Props = { articles: Article[] };

export default function ArticlesPreview({ articles }: Props) {
  if (!articles || articles.length === 0) return null;

  const [featured, ...rest] = articles;
  const sideArticles = rest.slice(0, 3);

  return (
    <section
      id="journal"
      className="relative isolate bg-parchment py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ink/10"
      />

      <div className="mx-auto max-w-350 px-6 md:px-10">
        {/* Header row: title + subtitle on the left, "see all" pill on the right */}
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
                <span className="inline-block h-px w-10 bg-ink/40" />
                <span>Journal · บทความ</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif-thai mt-5 text-balance text-[40px] font-medium leading-[1.06] tracking-tight text-ink md:text-[56px]">
                บทความล่าสุด
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="font-sans-thai mt-4 max-w-xl text-[15.5px] leading-[1.7] text-ink/65">
                อัปเดตจากสมาคมเซอร์เวย์ประเทศไทย — บทความ ข่าวสาร และบันทึกจากวิชาชีพสำรวจภัย
                สำรวจเพิ่มเติมเพื่ออ่านบทความทั้งหมด
              </p>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <a
              href="/articles"
              className="font-sans-thai group inline-flex items-center gap-3 rounded-full border border-ink/30 px-6 py-3 text-[14px] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-parchment"
            >
              <span>ดูบทความทั้งหมด</span>
              <span className="font-mono-tsa text-[13px] transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </Reveal>
        </div>

        {/* Editorial split: featured on the left, side list on the right */}
        <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-6" delay={120}>
            <FeaturedCard article={featured} />
          </Reveal>

          <div className="flex flex-col gap-5 md:col-span-6">
            {sideArticles.map((a, i) => (
              <Reveal key={a.id} delay={200 + i * 110}>
                <SideCard article={a} />
              </Reveal>
            ))}

            {sideArticles.length === 0 ? (
              <div className="flex h-full min-h-40 items-center justify-center rounded-2xl border border-dashed border-ink/15 px-6 py-10 text-center">
                <p className="font-sans-thai text-[14px] leading-[1.7] text-ink/55">
                  ยังมีเพียงบทความเดียว — กลับมาอ่านบทความเพิ่มเติมเร็ว ๆ นี้
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ article }: { article: Article }) {
  return (
    <a
      href={`/articles/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/70 transition-shadow hover:shadow-[0_20px_60px_-30px_rgba(11,20,34,0.35)]"
    >
      {article.cover?.url ? (
        <div className="relative aspect-[1.9] overflow-hidden bg-parchment-deep">
          <img
            src={article.cover.url}
            alt={article.cover.alternativeText ?? article.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="relative flex aspect-[1.9] items-center justify-center bg-ink/95 text-parchment">
          <span className="font-serif-thai text-[96px] leading-none opacity-25">
            01
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Pill>Lead story</Pill>
          <span className="font-mono-tsa text-[11px] uppercase tracking-[0.24em] text-ink/55">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h3 className="font-serif-thai mt-4 text-balance text-[22px] font-medium leading-[1.2] tracking-tight text-ink transition-colors group-hover:text-crimson md:text-[24px]">
          {article.title}
        </h3>

        {article.excerpt ? (
          <p className="font-sans-thai mt-3 line-clamp-2 text-[14.5px] leading-[1.65] text-ink/70">
            {article.excerpt}
          </p>
        ) : null}
      </div>
    </a>
  );
}

function SideCard({ article }: { article: Article }) {
  const minutes = readingMinutes(article.content);

  return (
    <a
      href={`/articles/${article.slug}`}
      className="group flex items-start gap-4 rounded-2xl bg-white/70 p-3 pr-5 transition-colors hover:bg-white md:p-4 md:pr-6"
    >
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-parchment-deep md:h-32 md:w-32">
        {article.cover?.url ? (
          <img
            src={article.cover.url}
            alt={article.cover.alternativeText ?? article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink/5">
            <span className="font-serif-thai text-[28px] leading-none text-ink/25">
              ❦
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col py-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <Pill>บทความ</Pill>
          <span className="font-mono-tsa text-[11px] uppercase tracking-[0.22em] text-ink/55 text-right">
            {minutes ? `อ่าน ${minutes} นาที` : formatDate(article.publishedAt)}
          </span>
        </div>

        <h4 className="font-serif-thai mt-2 line-clamp-2 text-balance text-[16px] font-medium leading-[1.3] tracking-tight text-ink transition-colors group-hover:text-crimson md:text-[17px]">
          {article.title}
        </h4>

        {article.excerpt ? (
          <p className="font-sans-thai mt-1.5 line-clamp-2 text-[13px] leading-[1.55] text-ink/65">
            {article.excerpt}
          </p>
        ) : null}
      </div>
    </a>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-sans-thai inline-flex items-center rounded-full bg-ink/6 px-3 py-1 text-[11.5px] font-medium text-ink/75">
      {children}
    </span>
  );
}
