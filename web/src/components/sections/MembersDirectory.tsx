import { useMemo, useState } from "react";
import { members, splitProvinces, allProvinces } from "../members-data";
import { ALL_REGIONS, REGIONS, type Region } from "../regions";
import MemberCard from "../MemberCard";

type SortKey = "no" | "name" | "province";

export default function MembersDirectory() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "ทั้งหมด">("ทั้งหมด");
  const [province, setProvince] = useState<string>("ทั้งหมด");
  const [sort, setSort] = useState<SortKey>("no");

  const provinceOptions = useMemo(() => {
    if (region === "ทั้งหมด") return allProvinces;
    const set = new Set<string>(REGIONS[region] as readonly string[]);
    return allProvinces.filter((p) => set.has(p));
  }, [region]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = members.filter((m) => {
      if (province !== "ทั้งหมด") {
        const provs = splitProvinces(m.province);
        if (!provs.includes(province)) return false;
      } else if (region !== "ทั้งหมด") {
        const provs = splitProvinces(m.province);
        const inRegion = provs.some((p) =>
          (REGIONS[region] as readonly string[]).includes(p),
        );
        if (!inRegion) return false;
      }
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.taxId.toLowerCase().includes(q) ||
        m.phoneNumber.toLowerCase().includes(q) ||
        m.province.toLowerCase().includes(q)
      );
    });
    if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, "th"));
    } else if (sort === "province") {
      list = [...list].sort((a, b) => a.province.localeCompare(b.province, "th"));
    }
    return list;
  }, [query, region, province, sort]);

  const hasFilters =
    query.trim() !== "" || region !== "ทั้งหมด" || province !== "ทั้งหมด" || sort !== "no";

  function clearAll() {
    setQuery("");
    setRegion("ทั้งหมด");
    setProvince("ทั้งหมด");
    setSort("no");
  }

  return (
    <section id="directory" className="relative bg-parchment-deep py-20 md:py-28">
      <div className="mx-auto max-w-350 px-6 md:px-10">
        {/* Section label */}
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60">
              <span className="inline-block h-px w-10 bg-ink/40" />
              <span>The Registry · ทำเนียบ</span>
            </div>
            <h2 className="font-serif-thai mt-4 text-[26px]! font-medium leading-[1.1] tracking-tight text-ink md:text-[44px]">
              ค้นหาบริษัทสมาชิก
            </h2>
          </div>
          <div className="font-mono-tsa text-[12px] tracking-wide text-ink/65">
            <span className="text-ink">{filtered.length}</span>
            <span className="mx-2 opacity-50">/</span>
            <span>{members.length} entries</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-8 border border-ink/20 bg-parchment p-4 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end">
            {/* Search */}
            <div className="md:col-span-5">
              <label
                htmlFor="m-search"
                className="font-mono-tsa block text-[12px] uppercase text-ink/55"
              >
                ค้นหา
              </label>
              <div className="relative mt-2">
                <input
                  id="m-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ชื่อบริษัท · จังหวัด · เลขผู้เสียภาษี · เบอร์โทร"
                  className="font-sans-thai w-full border border-ink/30 bg-parchment px-4 py-3 pr-10 text-[14px] text-ink placeholder:text-ink/40 focus:border-crimson focus:outline-none"
                />
                <span className="font-mono-tsa pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[26px] text-ink/45">
                  ⌕
                </span>
              </div>
            </div>

            {/* Region */}
            <div className="md:col-span-3">
              <label
                htmlFor="m-region"
                className="font-mono-tsa block text-[12px] uppercase text-ink/55"
              >
                ภูมิภาค
              </label>
              <select
                id="m-region"
                value={region}
                onChange={(e) => {
                  const v = e.target.value as Region | "ทั้งหมด";
                  setRegion(v);
                  setProvince("ทั้งหมด");
                }}
                className="font-sans-thai mt-2 w-full appearance-none border border-ink/30 bg-parchment px-4 py-3 text-[14px] text-ink focus:border-crimson focus:outline-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%230e1b2e' fill='none' stroke-width='1.5'/></svg>\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: "36px",
                }}
              >
                <option value="ทั้งหมด">ทั้งหมด</option>
                {ALL_REGIONS.map((r) => (
                  <option key={r} value={r}>
                    ภาค{r}
                  </option>
                ))}
              </select>
            </div>

            {/* Province */}
            <div className="md:col-span-2">
              <label
                htmlFor="m-province"
                className="font-mono-tsa block text-[12px] uppercase text-ink/55"
              >
                จังหวัด
              </label>
              <select
                id="m-province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="font-sans-thai mt-2 w-full appearance-none border border-ink/30 bg-parchment px-4 py-3 text-[14px] text-ink focus:border-crimson focus:outline-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%230e1b2e' fill='none' stroke-width='1.5'/></svg>\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: "36px",
                }}
              >
                <option value="ทั้งหมด">ทั้งหมด</option>
                {provinceOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="md:col-span-2">
              <label
                htmlFor="m-sort"
                className="font-mono-tsa block text-[12px] uppercase text-ink/55"
              >
                เรียงลำดับ
              </label>
              <select
                id="m-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="font-sans-thai mt-2 w-full appearance-none border border-ink/30 bg-parchment px-4 py-3 text-[14px] text-ink focus:border-crimson focus:outline-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%230e1b2e' fill='none' stroke-width='1.5'/></svg>\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: "36px",
                }}
              >
                <option value="no">ตามทะเบียน</option>
                <option value="name">ตามชื่อ</option>
                <option value="province">ตามจังหวัด</option>
              </select>
            </div>
          </div>

          {hasFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono-tsa text-[12px] uppercase tracking-[0.28em] text-ink/55">
                Active:
              </span>
              {query.trim() && (
                <button
                  onClick={() => setQuery("")}
                  className="font-sans-thai inline-flex items-center gap-1.5 border border-ink/25 bg-parchment-deep px-2.5 py-1 text-[12px] text-ink transition-colors hover:border-crimson hover:text-crimson"
                >
                  ค้นหา: "{query}" <span className="text-[14px] leading-none">×</span>
                </button>
              )}
              {region !== "ทั้งหมด" && (
                <button
                  onClick={() => setRegion("ทั้งหมด")}
                  className="font-sans-thai inline-flex items-center gap-1.5 border border-ink/25 bg-parchment-deep px-2.5 py-1 text-[12px] text-ink transition-colors hover:border-crimson hover:text-crimson"
                >
                  ภาค{region} <span className="text-[14px] leading-none">×</span>
                </button>
              )}
              {province !== "ทั้งหมด" && (
                <button
                  onClick={() => setProvince("ทั้งหมด")}
                  className="font-sans-thai inline-flex items-center gap-1.5 border border-ink/25 bg-parchment-deep px-2.5 py-1 text-[12px] text-ink transition-colors hover:border-crimson hover:text-crimson"
                >
                  จังหวัด: {province} <span className="text-[14px] leading-none">×</span>
                </button>
              )}
              {sort !== "no" && (
                <button
                  onClick={() => setSort("no")}
                  className="font-sans-thai inline-flex items-center gap-1.5 border border-ink/25 bg-parchment-deep px-2.5 py-1 text-[12px] text-ink transition-colors hover:border-crimson hover:text-crimson"
                >
                  เรียง: {sort === "name" ? "ชื่อ" : "จังหวัด"}{" "}
                  <span className="text-[14px] leading-none">×</span>
                </button>
              )}
              <button
                onClick={clearAll}
                className="font-mono-tsa ml-2 text-[12px] uppercase tracking-[0.28em] text-crimson underline-offset-4 hover:underline"
              >
                clear all
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center border border-dashed border-ink/30 bg-parchment p-16 text-center">
            <div className="font-serif-thai text-[28px] text-ink">ไม่พบบริษัทสมาชิก</div>
            <p className="font-sans-thai mt-3 max-w-md text-[14px] leading-[1.7] text-ink/65">
              ลองเปลี่ยนคำค้นหา หรือเปลี่ยนตัวกรองภูมิภาค/จังหวัด เพื่อค้นหาบริษัทอื่น
            </p>
            <button
              onClick={clearAll}
              className="font-mono-tsa mt-6 border border-ink px-5 py-2.5 text-[12px] uppercase tracking-[0.3em] text-ink transition-colors hover:bg-ink hover:text-parchment"
            >
              clear filters
            </button>
          </div>
        ) : (
          <ol className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {filtered.map((m) => (
              <li key={m.id}>
                <MemberCard member={m} highlight={query.trim()} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
