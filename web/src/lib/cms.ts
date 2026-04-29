// Used server-side for build-time fetch (e.g. http://cms:1337 inside Docker network).
const FETCH_URL =
  import.meta.env.CMS_URL ??
  import.meta.env.PUBLIC_CMS_URL ??
  "http://localhost:1337";

// Used to absolutify image URLs in the rendered HTML (must be reachable from the browser).
const PUBLIC_URL = import.meta.env.PUBLIC_CMS_URL ?? FETCH_URL;

export type StrapiImage = {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

export type Article = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  publishedAt: string;
  cover: StrapiImage | null;
};

type StrapiEntity = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  publishedAt: string;
  cover?:
    | {
        url: string;
        alternativeText?: string | null;
        width?: number;
        height?: number;
      }
    | null;
};

type StrapiList<T> = { data: T[] };

const absoluteUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${PUBLIC_URL}${url}`;
};

const toArticle = (e: StrapiEntity): Article => ({
  id: e.id,
  documentId: e.documentId,
  title: e.title,
  slug: e.slug,
  excerpt: e.excerpt,
  content: e.content,
  publishedAt: e.publishedAt,
  cover: e.cover
    ? {
        url: absoluteUrl(e.cover.url) ?? "",
        alternativeText: e.cover.alternativeText ?? null,
        width: e.cover.width,
        height: e.cover.height,
      }
    : null,
});

const fetchJson = async <T>(path: string): Promise<T | null> => {
  try {
    const res = await fetch(`${FETCH_URL}${path}`);
    if (!res.ok) {
      console.warn(`[cms] ${path} → ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[cms] ${path} unreachable:`, (err as Error).message);
    return null;
  }
};

export const getArticles = async (): Promise<Article[]> => {
  const json = await fetchJson<StrapiList<StrapiEntity>>(
    "/api/articles?populate=cover&sort=publishedAt:desc&pagination[pageSize]=100",
  );
  return json?.data?.map(toArticle) ?? [];
};

export const getArticleBySlug = async (
  slug: string,
): Promise<Article | null> => {
  const json = await fetchJson<StrapiList<StrapiEntity>>(
    `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=cover`,
  );
  const entity = json?.data?.[0];
  return entity ? toArticle(entity) : null;
};
