import Reveal from "../Reveal";
import { contact, org } from "../content";

export default function Contact() {
  return (
    <section id="contact"
      className="relative isolate overflow-hidden bg-parchment"
    >
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <Reveal>
          <div className="font-mono-tsa flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-ink/60 mt-20">
            <span className="inline-block h-px w-10 bg-ink/40" />
            <span>VI.</span>
            <span>Correspondence · ติดต่อสมาคม</span>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal delay={120}>
              <h2 className="font-serif-thai text-balance text-[44px]! font-medium leading-[1.04] tracking-tight text-ink md:text-[72px]">
                ยินดีต้อนรับ ทุกการติดต่อ และความร่วมมือ
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-6 max-w-2xl text-[22px] italic leading-normal text-ink/65"
              >
                For inquiries on membership, collaboration, or surveying-profession matters — reach out to the secretariat.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={220}>
              <ul className="divide-y divide-ink/15 border-y border-ink/15">
                <li className="flex items-start gap-6 py-5">
                  <span className="font-mono-tsa min-w-20 text-[12px] uppercase tracking-[0.28em] text-ink/55">
                    Address
                  </span>
                  <span className="font-sans-thai text-balance flex-1 text-[15px] leading-[1.7] text-ink/85">
                    {contact.addressTh}
                  </span>
                </li>
                <li className="flex items-start gap-6 py-5">
                  <span className="font-mono-tsa min-w-20 text-[12px] uppercase tracking-[0.28em] text-ink/55">
                    Phone
                  </span>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="font-mono-tsa flex-1 text-[15px] tracking-wide text-ink transition-colors hover:text-crimson"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li className="flex items-start gap-6 py-5">
                  <span className="font-mono-tsa min-w-20 text-[12px] uppercase tracking-[0.28em] text-ink/55">
                    Email
                  </span>
                  <a href={`mailto:${contact.email}`}
                    className="font-mono-tsa flex-1 text-[15px] text-ink transition-colors hover:text-crimson"
                  >
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-6 py-5">
                  <span className="font-mono-tsa min-w-20 text-[12px] uppercase tracking-[0.28em] text-ink/55">
                    Facebook
                  </span>
                  <a href={contact.facebookHref}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans-thai flex-1 text-[15px] text-ink transition-colors hover:text-crimson"
                  >
                    {contact.facebook} ↗
                  </a>
                </li>
                <li className="flex items-start gap-6 py-5">
                  <span className="font-mono-tsa min-w-20 text-[12px] uppercase tracking-[0.28em] text-ink/55">
                    Source
                  </span>
                  <a href={contact.source}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono-tsa flex-1 text-[15px] text-ink/80 transition-colors hover:text-crimson"
                  >
                    {contact.source.replace(/^https?:\/\//, "")} ↗
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Google Maps embed — secretariat location */}
        <Reveal delay={380}>
          <div className="mt-20">
            <div className="font-mono-tsa mb-4 flex items-center gap-3 text-[12px] uppercase tracking-[0.28em] text-ink/55">
              <span className="inline-block h-px w-10 bg-ink/40" />
              <span>Map · แผนที่สำนักงาน</span>
            </div>
            <div className="relative aspect-16/10 overflow-hidden border border-ink/20 bg-parchment-deep md:aspect-21/9">
              <iframe
                title="ที่ตั้งสำนักงานสมาคมเซอร์เวย์ประเทศไทย"
                src={`https://www.google.com/maps?q=${encodeURIComponent(contact.addressTh)}&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.addressTh)}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono-tsa group mt-4 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.28em] text-ink/65 transition-colors hover:text-crimson"
            >
              <span>เปิดใน Google Maps</span>
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-24 flex flex-col text-[12px] items-start justify-between gap-6 border-t border-ink/15 pt-8 md:flex-row md:items-center">
            <div className="text-ink/70 tracking-widest">
              {org.nameTh}
            </div>
            <div className="font-mono-tsa uppercase tracking-widest text-ink/55">
              © {new Date().getFullYear()} · all rights reserved · Suratthani · Thailand
            </div>
            <a href="#top"
              className="font-mono-tsa group inline-flex items-center gap-2 uppercase tracking-widest text-ink/70 transition-colors hover:text-crimson"
            >
              <span>กลับขึ้นด้านบน</span>
              <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Decorative crimson line at very bottom */}
      <div className="mt-12 grid h-2 grid-cols-3">
        <div className="bg-crimson" />
        <div className="bg-parchment" />
        <div className="bg-ink" />
      </div>
    </section>
  );
}
