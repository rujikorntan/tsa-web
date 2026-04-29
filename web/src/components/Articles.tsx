import type { Article } from "../lib/cms";
import Nav from "./sections/Nav";
import Reveal from "./Reveal";
import Contact from "./sections/Contact";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const formatIssueNo = (n: number) => String(n).padStart(2, "0");

type Props = { articles: Article[] };

export default function Articles({ articles }: Props) {
  const total = articles.length;
  const [featured, ...rest] = articles;

  return (
    <div className="relative">
      <Nav />
      <main>
        <ArticlesHero total={total} latest={featured} />
        {total === 0 ? (
          <EmptyState />
        ) : (
          <ArticleGrid featured={featured} rest={rest} />
        )}
        <Contact />
      </main>
    </div>
  );
}

function ArticlesHero({ total, latest }: { total: number; latest?: Article }) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden grain"
      style={{ background: "var(--color-parchment)" }}
    >
      {/* Concentric arcs — right edge to mirror MembersHero on the left */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-48 -top-32 hidden h-160 w-160 text-ink/6 md:block"
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
            <span className="text-ink">บทความและข่าวสาร</span>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <Reveal delay={120}>
              <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
                <span className="inline-block h-px w-10 bg-ink/40" />
                <span>Journal</span>
                <span className="opacity-50">·</span>
                <span>เล่ม 03</span>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <h1 className="font-serif-thai mt-6 text-[56px]! font-semibold leading-[1.04] tracking-[-0.01em] text-ink md:text-[88px] lg:text-[104px]">
                <span className="block">บทความ</span>
                <span className="block">
                  ข่าวสาร
                  <span className="text-crimson">.</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={420}>
              <p className="mt-6 max-w-2xl text-[26px] italic leading-[1.45] text-ink/75 md:text-[30px]">
                Field notes, dispatches and reflections from the surveying
                profession — published by the secretariat.
              </p>
            </Reveal>

            <Reveal delay={580}>
              <p className="font-sans-thai text-balance mt-6 max-w-140 text-[16px] leading-[1.75] text-ink/72">
                บทความและข่าวสารจากสมาคมเซอร์เวย์ประเทศไทย ครอบคลุมประเด็นวิชาชีพสำรวจภัย
                ประกันภัย และพัฒนาการของอุตสาหกรรม — เผยแพร่เป็นระยะโดยฝ่ายเลขานุการ
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-4">
            <Reveal delay={300} className="relative">
              <div
                className="absolute -inset-6 -z-10 rounded-full opacity-50 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(181,142,63,0.22), transparent 65%)",
                }}
              />
              <div className="relative border border-ink/20 bg-parchment/60 p-7 md:p-8">
                <div className="font-mono-tsa text-[12px] uppercase tracking-[0.3em] text-ink/55">
                  Total published
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <div className="font-serif-thai text-[112px] leading-none tracking-tight text-ink md:text-[128px]">
                    {formatIssueNo(total)}
                  </div>
                  <div className="font-sans-thai pb-3 text-[15px] text-ink/60">
                    บทความ
                  </div>
                </div>
                <div className="hairline mt-6 h-px text-ink/40" />
                <div className="mt-4 grid grid-cols-2 gap-4 text-ink/80">
                  <div>
                    <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/55">
                      ฉบับล่าสุด
                    </div>
                    <div className="font-serif-thai mt-1 text-[18px] leading-snug">
                      {latest ? formatDate(latest.publishedAt) : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-350 px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl border border-ink/15 bg-white/60 p-10 text-center md:p-14">
            <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/55">
              No issues yet
            </div>
            <h2 className="font-serif-thai mt-4 text-[28px] font-medium leading-snug text-ink md:text-[34px]">
              ยังไม่มีบทความเผยแพร่
            </h2>
            <p className="font-sans-thai mt-4 text-[15px] leading-[1.75] text-ink/70">
              เพิ่มบทความได้ที่ Strapi admin ที่{" "}
              <code className="font-mono-tsa text-ink">/admin</code> ของระบบ CMS
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArticleGrid({
  featured,
  rest,
}: {
  featured: Article;
  rest: Article[];
}) {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-350 px-6 pb-20 md:px-10 md:pb-28">
        <Reveal>
          <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
            <span className="inline-block h-px w-10 bg-ink/40" />
            <span>I.</span>
            <span>Featured · บทความเด่น</span>
          </div>
        </Reveal>

        {/* Featured — compact editorial hero */}
        <Reveal delay={120}>
          <a
            href={`/articles/${featured.slug}`}
            className="group mt-8 grid grid-cols-1 gap-6 border-y border-ink/15 py-8 md:grid-cols-12 md:gap-8 md:py-10"
          >
            <div className="md:col-span-6">
              {featured.cover?.url ? (
                <div className="relative aspect-16/10 overflow-hidden bg-parchment-deep">
                  <img
                    src={featured.cover.url}
                    alt={featured.cover.alternativeText ?? featured.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="eager"
                  />
                  <span className="font-mono-tsa absolute left-3 top-3 bg-ink px-2.5 py-1 text-[10.5px] uppercase tracking-[0.26em] text-parchment">
                    Issue {formatIssueNo(1)} · ฉบับล่าสุด
                  </span>
                </div>
              ) : (
                <div className="relative flex aspect-16/10 items-center justify-center bg-ink/95 text-parchment">
                  <span className="font-serif-thai text-[96px] leading-none opacity-25">
                    01
                  </span>
                  <span className="font-mono-tsa absolute left-3 top-3 bg-parchment px-2.5 py-1 text-[10.5px] uppercase tracking-[0.26em] text-ink">
                    Issue {formatIssueNo(1)} · ฉบับล่าสุด
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center md:col-span-6">
              <div className="font-mono-tsa flex items-center gap-3 text-[11.5px] uppercase tracking-[0.26em] text-ink/55">
                <span>{formatDate(featured.publishedAt)}</span>
                <span className="opacity-50">·</span>
                <span>Lead story</span>
              </div>
              <h2 className="font-serif-thai mt-4 text-balance text-[26px] font-medium leading-[1.18] tracking-tight text-ink transition-colors group-hover:text-crimson md:text-[34px]">
                {featured.title}
              </h2>
              {featured.excerpt ? (
                <p className="font-sans-thai text-balance mt-4 max-w-xl text-[15px] leading-[1.7] text-ink/70">
                  {featured.excerpt}
                </p>
              ) : null}
              <span className="font-mono-tsa mt-6 inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.26em] text-ink transition-colors group-hover:text-crimson">
                <span>อ่านบทความ</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </a>
        </Reveal>

        {/* Remaining articles */}
        {rest.length > 0 ? (
          <>
            <Reveal>
              <div className="font-mono-tsa mt-20 flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
                <span className="inline-block h-px w-10 bg-ink/40" />
                <span>II.</span>
                <span>Archive · บทความก่อนหน้า</span>
              </div>
            </Reveal>

            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a, i) => (
                <Reveal as="li" key={a.id} delay={120 + i * 80}>
                  <ArticleCard article={a} index={i + 2} />
                </Reveal>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </section>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <a
      href={`/articles/${article.slug}`}
      className="group flex h-full flex-col border-t border-ink/20 pt-6"
    >
      <div className="font-mono-tsa flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-ink/55">
        <span>№ {formatIssueNo(index)}</span>
        <span>{formatDate(article.publishedAt)}</span>
      </div>

      {article.cover?.url ? (
        <div className="mt-5 aspect-[4/3] overflow-hidden bg-parchment-deep">
          <img
            src={article.cover.url}
            alt={article.cover.alternativeText ?? article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="mt-5 flex aspect-[4/3] items-center justify-center bg-ink/5">
          <span className="font-serif-thai text-[80px] leading-none text-ink/20">
            {formatIssueNo(index)}
          </span>
        </div>
      )}

      <h3 className="font-serif-thai mt-5 text-balance text-[22px] font-medium leading-[1.2] tracking-tight text-ink transition-colors group-hover:text-crimson md:text-[24px]">
        {article.title}
      </h3>

      {article.excerpt ? (
        <p className="font-sans-thai mt-3 line-clamp-3 text-[14.5px] leading-[1.7] text-ink/70">
          {article.excerpt}
        </p>
      ) : null}

      <span className="font-mono-tsa mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ink/70 transition-colors group-hover:text-crimson">
        <span>อ่าน</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </a>
  );
}
