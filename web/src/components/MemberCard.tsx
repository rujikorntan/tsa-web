import { type Member, splitProvinces, splitPhones } from "./members-data";
import { regionOf } from "./regions";

type Props = {
  member: Member;
  highlight?: string;
};

function highlightText(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-gold/30 text-ink">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export default function MemberCard({ member, highlight = "" }: Props) {
  const provinces = splitProvinces(member.province);
  const phones = splitPhones(member.phoneNumber);
  const primary = provinces[0] ?? "—";
  const region = regionOf(primary);
  const overflowCount = provinces.length - provinces.length;

  return (
    <article className="group relative flex flex-col border border-ink/15 bg-parchment/70 p-6 transition-all duration-300 hover:border-crimson/60 hover:bg-parchment-deep md:p-7">
      {/* Top row */}
      <div className="flex items-baseline justify-between gap-3">
        <div className="font-mono-tsa text-[12px] uppercase tracking-[0.3em] text-ink/55">
          เลขสมาชิก / no.{" "}
          <span className="text-ink">{String(member.no).padStart(3, "0")}</span>
        </div>
        {region && (
          <span className="font-mono-tsa whitespace-nowrap border border-ink/25 px-2 py-1 text-[12px] uppercase text-ink/70 transition-colors group-hover:border-crimson group-hover:text-crimson">
            ภาค{region}
          </span>
        )}
      </div>

      {/* Index numeral */}
      <div className="mt-5 flex items-start gap-5">
        <div className="font-serif-thai shrink-0 text-[40px] leading-none text-gold/85">
          {String(member.no).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <h3 className="font-serif-thai text-balance text-[20px] font-medium leading-[1.25] text-ink md:text-[22px]">
            {highlightText(member.name, highlight)}
          </h3>
        </div>
      </div>

      <div className="hairline mt-6 h-px text-ink/30" />

      {/* Provinces */}
      <div className="mt-5">
        <div className="font-mono-tsa mb-2 text-[12px] uppercase text-ink/55">
          พื้นที่ให้บริการ · {provinces.length} จังหวัด
        </div>
        <div className="flex flex-wrap gap-1.5">
          {provinces.map((p, i) => (
            <span
              key={i}
              className={`font-sans-thai text-[12px] leading-none ${i === 0
                ? "bg-ink px-2.5 py-1.5 text-parchment"
                : "border border-ink/20 px-2.5 py-1.5 text-ink/75"
                }`}
            >
              {highlightText(p, highlight)}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="font-mono-tsa border border-ink/20 px-2.5 py-1.5 text-[12px] tracking-wide text-ink/55">
              +{overflowCount}
            </span>
          )}
        </div>
      </div>

      {/* Contact details */}
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <div className="font-mono-tsa text-[12px] uppercase text-ink/55">
            โทรศัพท์
          </div>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
            {phones.map((ph, i) => (
              <a
                key={i}
                href={`tel:${ph.replace(/[^0-9+]/g, "")}`}
                className="font-mono-tsa text-[13px] text-ink transition-colors hover:text-crimson"
              >
                {ph}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono-tsa text-[12px] uppercase text-ink/55">
            เลขผู้เสียภาษี
          </div>
          <div className="font-mono-tsa mt-1 text-[13px] tracking-wide text-ink/75">
            {highlightText(member.taxId, highlight)}
          </div>
        </div>
      </div>
    </article>
  );
}
