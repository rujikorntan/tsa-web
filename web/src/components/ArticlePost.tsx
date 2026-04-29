import type { Article } from "../lib/cms";
import Markdown from "react-markdown";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

type Props = { article: Article };

export default function ArticlePost({ article }: Props) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <a
        href="/articles"
        className="font-mono-tsa text-xs uppercase tracking-[0.25em] text-ink-soft/70 transition hover:text-ink"
      >
        ← กลับไปยังบทความทั้งหมด
      </a>

      <header className="mt-8">
        <p className="font-mono-tsa text-xs uppercase tracking-[0.25em] text-ink-soft/70">
          {formatDate(article.publishedAt)}
        </p>
        <h1 className="mt-3 font-serif-thai text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          {article.title}
        </h1>
        {article.excerpt ? (
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {article.excerpt}
          </p>
        ) : null}
      </header>

      {article.cover?.url ? (
        <figure className="mt-10 overflow-hidden rounded-xl border border-ink/10">
          <img
            src={article.cover.url}
            alt={article.cover.alternativeText ?? article.title}
            className="h-auto w-full object-cover"
          />
        </figure>
      ) : null}

      {article.content ? (
        <article className="mt-10 whitespace-pre-wrap text-base leading-[1.9] text-ink">
          <Markdown
            components={{
              img: (props) => (
                <img {...props} className="my-6 h-auto w-full rounded-lg object-cover shadow-sm" />
              ),
              p: (props) => <p {...props} className="mb-4" />,
              a: (props) => <a {...props} className="text-blue-600 underline hover:text-blue-800" />,
              h1: (props) => <h1 {...props} className="mb-4 mt-8 text-3xl font-bold" />,
              h2: (props) => <h2 {...props} className="mb-4 mt-8 text-2xl font-bold" />,
              h3: (props) => <h3 {...props} className="mb-4 mt-6 text-xl font-bold" />,
              ul: (props) => <ul {...props} className="mb-4 list-inside list-disc" />,
              ol: (props) => <ol {...props} className="mb-4 list-inside list-decimal" />,
              blockquote: (props) => <blockquote {...props} className="my-4 border-l-4 border-ink/20 pl-4 italic text-ink-soft" />
            }}
          >
            {article.content}
          </Markdown>
        </article>
      ) : null}
    </main>
  );
}
