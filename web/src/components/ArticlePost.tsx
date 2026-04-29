import { useEffect, useState } from "react";
import type { Article } from "../lib/cms";
import Markdown from "react-markdown";
import Nav from "./sections/Nav";
import Reveal from "./Reveal";
import Contact from "./sections/Contact";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const readingTime = (text: string | null) => {
  if (!text) return null;
  // Thai script doesn't use word boundaries, so estimate by characters.
  const chars = text.replace(/\s+/g, "").length;
  const minutes = Math.max(1, Math.round(chars / 350));
  return `${minutes} นาที`;
};

type Props = { article: Article };

export default function ArticlePost({ article }: Props) {
  const minutes = readingTime(article.content);

  return (
    <div className="relative">
      <Nav />
      <main>
        <ArticleHero article={article} minutes={minutes} />
        <ArticleBody article={article} />
        <ArticleFooter article={article} />
        <Contact />
      </main>
    </div>
  );
}

function ArticleHero({
  article,
  minutes,
}: {
  article: Article;
  minutes: string | null;
}) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden grain"
      style={{ background: "var(--color-parchment)" }}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-48 -top-32 hidden h-160 w-160 text-ink/6 md:block"
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
            <a
              href="/articles"
              className="transition-colors hover:text-crimson"
            >
              บทความ
            </a>
            <span>/</span>
            <span className="line-clamp-1 text-ink">{article.title}</span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="font-mono-tsa mt-12 flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
            <span className="inline-block h-px w-10 bg-ink/40" />
            <span>Journal · บทความ</span>
            <span className="opacity-50">·</span>
            <span>{formatDate(article.publishedAt)}</span>
            {minutes ? (
              <>
                <span className="opacity-50">·</span>
                <span>อ่าน {minutes}</span>
              </>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={240}>
          <h1 className="font-serif-thai text-balance mt-8 max-w-5xl text-[40px]! font-semibold leading-[1.05] tracking-[-0.01em] text-ink md:text-[72px] lg:text-[88px]">
            {article.title}
            <span className="text-crimson">.</span>
          </h1>
        </Reveal>

        {article.excerpt ? (
          <Reveal delay={420}>
            <p className="text-balance mt-8 max-w-3xl text-[22px] italic leading-normal text-ink/75 md:text-[26px]">
              {article.excerpt}
            </p>
          </Reveal>
        ) : null}
      </div>

      {article.cover?.url ? (
        <Reveal delay={520}>
          <figure className="mx-auto max-w-350 px-6 pb-16 md:px-10 md:pb-24">
            <div className="relative overflow-hidden bg-parchment-deep">
              <img
                src={article.cover.url}
                alt={article.cover.alternativeText ?? article.title}
                className="h-auto w-full object-cover"
                loading="eager"
              />
            </div>
            {article.cover.alternativeText ? (
              <figcaption className="font-mono-tsa mt-3 text-[11px] uppercase tracking-[0.28em] text-ink/55">
                {article.cover.alternativeText}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      ) : (
        <div className="border-t border-ink/15">
          <div className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-3 px-6 py-4 md:px-10">
            <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/60">
              ฉบับ 2569 · เผยแพร่โดยฝ่ายเลขานุการ
            </div>
            <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/60">
              scroll to read ↓
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ArticleBody({ article }: { article: Article }) {
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  if (!article.content) return null;

  return (
    <section className="bg-parchment">
      <div className="mx-auto grid max-w-350 grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:gap-12 md:px-10 md:py-24">
        {/* Margin column with metadata — desktop only */}
        <aside className="hidden md:col-span-3 md:block">
          <div className="sticky top-28 border-t border-ink/20 pt-6">
            <div className="font-mono-tsa text-[11px] uppercase tracking-[0.28em] text-ink/55">
              เผยแพร่
            </div>
            <div className="font-serif-thai mt-2 text-[18px] leading-snug text-ink">
              {formatDate(article.publishedAt)}
            </div>

            <div className="hairline mt-8 h-px text-ink/40" />

            <div className="mt-8">
              <div className="font-mono-tsa text-[11px] uppercase tracking-[0.28em] text-ink/55">
                แชร์บทความ
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <ShareLink
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  label="Facebook"
                />
                <ShareLink
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    article.title,
                  )}&url=${encodeURIComponent(shareUrl)}`}
                  label="Twitter / X"
                />
                <ShareLink
                  href={`mailto:?subject=${encodeURIComponent(
                    article.title,
                  )}&body=${encodeURIComponent(shareUrl)}`}
                  label="ส่งอีเมล"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main reading column */}
        <article className="md:col-span-9 lg:col-span-8">
          <div className="font-serif-thai prose-tsa text-[17px] leading-[1.95] text-ink md:text-[18px]">
            <Markdown
              components={{
                img: (props) => (
                  <img
                    {...props}
                    className="my-8 h-auto w-full object-cover"
                  />
                ),
                p: (props) => (
                  <p {...props} className="mb-6 text-ink/85" />
                ),
                a: (props) => (
                  <a
                    {...props}
                    className="text-crimson underline decoration-crimson/30 underline-offset-4 transition-colors hover:decoration-crimson"
                  />
                ),
                h1: (props) => (
                  <h1
                    {...props}
                    className="font-serif-thai mt-12 mb-5 text-balance text-[34px] font-semibold leading-[1.15] tracking-tight text-ink md:text-[40px]"
                  />
                ),
                h2: (props) => (
                  <h2
                    {...props}
                    className="font-serif-thai mt-12 mb-5 text-balance text-[28px] font-semibold leading-[1.2] tracking-tight text-ink md:text-[32px]"
                  />
                ),
                h3: (props) => (
                  <h3
                    {...props}
                    className="font-serif-thai mt-10 mb-4 text-balance text-[22px] font-semibold leading-snug text-ink md:text-[24px]"
                  />
                ),
                ul: (props) => (
                  <ul
                    {...props}
                    className="mb-6 list-disc space-y-2 pl-6 marker:text-ink/40"
                  />
                ),
                ol: (props) => (
                  <ol
                    {...props}
                    className="mb-6 list-decimal space-y-2 pl-6 marker:text-ink/40"
                  />
                ),
                li: (props) => <li {...props} className="text-ink/85" />,
                blockquote: (props) => (
                  <blockquote
                    {...props}
                    className="font-serif-thai my-8 border-l-2 border-crimson pl-6 text-[22px] italic leading-[1.55] text-ink/85 md:text-[26px]"
                  />
                ),
                hr: () => (
                  <hr className="my-12 border-0 border-t border-ink/15" />
                ),
                strong: (props) => (
                  <strong {...props} className="font-semibold text-ink" />
                ),
                code: (props) => (
                  <code
                    {...props}
                    className="font-mono-tsa rounded bg-ink/5 px-1.5 py-0.5 text-[0.92em]"
                  />
                ),
              }}
            >
              {article.content}
            </Markdown>
          </div>
        </article>
      </div>
    </section>
  );
}

function ShareLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono-tsa group inline-flex items-center justify-between border-b border-ink/15 py-2 text-[12px] uppercase tracking-[0.24em] text-ink/75 transition-colors hover:text-crimson"
    >
      <span>{label}</span>
      <span className="transition-transform group-hover:translate-x-0.5">→</span>
    </a>
  );
}

function ArticleFooter({ article }: { article: Article }) {
  return (
    <section className="border-t border-ink/15 bg-parchment">
      <div className="mx-auto max-w-350 px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/55">
              จบบทความ · End of article
            </div>
            <h2 className="font-serif-thai mt-3 text-balance text-[28px] font-medium leading-[1.15] text-ink md:text-[36px]">
              ขอบคุณที่อ่านจนจบ — เลือกอ่านบทความอื่น หรือดูข้อมูลของสมาคม
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <a
              href="/articles"
              className="font-mono-tsa group inline-flex items-center gap-2 border border-ink/25 bg-transparent px-5 py-3 text-[12px] uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-parchment"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
              <span>บทความทั้งหมด</span>
            </a>
            <a
              href="/#contact"
              className="font-mono-tsa group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-[12px] uppercase tracking-widest text-parchment transition-colors hover:bg-crimson hover:border-crimson"
            >
              <span>ติดต่อสมาคม</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>

        <div className="font-mono-tsa mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-6 text-[11px] uppercase tracking-[0.28em] text-ink/55">
          <span>สมาคมเซอร์เวย์ประเทศไทย · Thai Surveyor Association</span>
          <span>เผยแพร่ {formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </section>
  );
}
