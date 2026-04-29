import type { Article } from "../lib/cms";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

type Props = { articles: Article[] };

export default function Articles({ articles }: Props) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <header className="mb-12 md:mb-16">
        <p className="font-mono-tsa text-xs uppercase tracking-[0.25em] text-ink-soft/70">
          ข่าวสาร · บทความ
        </p>
        <h1 className="mt-3 font-serif-thai text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          บทความล่าสุด
        </h1>
      </header>

      {articles.length === 0 ? (
        <div className="rounded-xl border border-ink/10 bg-white/60 p-10 text-center">
          <p className="text-ink-soft">
            ยังไม่มีบทความเผยแพร่ — เพิ่มบทความได้ที่ Strapi admin ที่{" "}
            <code className="font-mono-tsa">/admin</code> ของ CMS
          </p>
        </div>
      ) : (
        <ul className="grid gap-8 md:grid-cols-2">
          {articles.map((a) => (
            <li
              key={a.id}
              className="group overflow-hidden rounded-xl border border-ink/10 bg-white/70 transition hover:border-ink/30 hover:shadow-md"
            >
              <a href={`/articles/${a.slug}`} className="block">
                {a.cover?.url ? (
                  <div className="aspect-[16/9] overflow-hidden bg-parchment-deep">
                    <img
                      src={a.cover.url}
                      alt={a.cover.alternativeText ?? a.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <p className="font-mono-tsa text-xs uppercase tracking-[0.2em] text-ink-soft/70">
                    {formatDate(a.publishedAt)}
                  </p>
                  <h2 className="mt-2 font-serif-thai text-xl font-semibold leading-snug text-ink">
                    {a.title}
                  </h2>
                  {a.excerpt ? (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                      {a.excerpt}
                    </p>
                  ) : null}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
