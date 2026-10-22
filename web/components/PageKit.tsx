import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { SITE_URL } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

type Crumb = { label: string; href: string };

export function breadcrumbLd(crumb: string, path: string, parent?: Crumb) {
  const trail = [{ label: "Trang chủ", href: "/" }, ...(parent ? [parent] : []), { label: crumb, href: path }];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function Breadcrumb({ crumb, parent, dark = false }: { crumb: string; parent?: Crumb; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="hero-up">
      <ol className={`flex flex-wrap items-center gap-2 text-[13px] ${dark ? "text-white/55" : "text-stone-500"}`}>
        <li>
          <Link href="/" className="hover:text-[#e3146f]">
            Trang chủ
          </Link>
        </li>
        {parent ? (
          <>
            <li aria-hidden>/</li>
            <li>
              <Link href={parent.href} className="hover:text-[#e3146f]">
                {parent.label}
              </Link>
            </li>
          </>
        ) : null}
        <li aria-hidden>/</li>
        <li className={`line-clamp-1 ${dark ? "text-white/85" : "text-[#1a2744]"}`} aria-current="page">
          {crumb}
        </li>
      </ol>
    </nav>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
}) {
  const styles = {
    primary: "bg-[#e3146f] text-white shadow-[0_12px_26px_rgba(227,20,111,0.3)] hover:bg-[#ff3d7f]",
    ghost: "bg-white text-[#1a2744] ring-1 ring-stone-200 hover:ring-[#e3146f]",
    light: "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15",
  }[variant];
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`btn-lift inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold ${styles}`}
    >
      {children}
    </Link>
  );
}

export function PageHero({
  kicker,
  title,
  lead,
  crumb,
  path,
  actions,
  art,
  background,
  dark = false,
}: {
  kicker: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  crumb: string;
  path: string;
  actions?: React.ReactNode;
  art?: React.ReactNode;
  background?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden ${dark ? "bg-[#1a2744] text-white" : "bg-[#fff5f9] text-[#1a2744]"}`}>
      <JsonLd data={breadcrumbLd(crumb, path)} />
      {background ?? (
        <>
          <div
            className={`pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full ${dark ? "bg-white/[0.04]" : "bg-[#ffe0ee]"}`}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute -bottom-48 left-1/3 h-96 w-96 rounded-full ${dark ? "bg-[#e3146f]/10" : "bg-[#fff0e0]"}`}
            aria-hidden
          />
        </>
      )}
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 lg:pb-16 lg:pt-12">
        <Breadcrumb crumb={crumb} dark={dark} />
        <div
          className={`mt-8 grid gap-10 ${
            art
              ? "items-start lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12"
              : ""
          }`}
        >
          <div className={art ? "lg:pt-1" : ""}>
            <p
              className={`hero-up flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.24em] ${dark ? "text-[#ff8fb8]" : "text-[#e3146f]"}`}
              style={{ animationDelay: "80ms" }}
            >
              <span className={`h-px w-8 ${dark ? "bg-[#ff8fb8]" : "bg-[#e3146f]"}`} />
              {kicker}
            </p>
            <h1
              className="hero-up mt-4 text-[2.2rem] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-[2.9rem] lg:text-[3.1rem]"
              style={{ animationDelay: "160ms" }}
            >
              {title}
            </h1>
            <p
              className={`hero-up mt-5 max-w-2xl text-[17px] leading-8 ${dark ? "text-white/75" : "text-stone-600"}`}
              style={{ animationDelay: "240ms" }}
            >
              {lead}
            </p>
            {actions ? (
              <div className="hero-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "320ms" }}>
                {actions}
              </div>
            ) : null}
          </div>
          {art ? (
            <div className="hero-scale w-full" style={{ animationDelay: "200ms" }}>
              {art}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function ArtStage({
  main,
  chips,
}: {
  main: string;
  chips: { img: string; label: string; pos: string }[];
}) {
  const floats = ["float-b", "float-c", "float-d"];
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[420px] sm:h-[360px]" aria-hidden>
      <div className="absolute inset-0 grid place-items-center">
        <span className="orbit-spin h-[17rem] w-[17rem] rounded-full border-2 border-dashed border-[#e3146f]/25 [grid-area:1/1] sm:h-[20rem] sm:w-[20rem]" />
        <span className="h-52 w-52 rounded-full bg-white shadow-[0_30px_60px_rgba(26,39,68,0.12)] [grid-area:1/1] sm:h-60 sm:w-60" />
        <img src={main} alt="" className="float-a h-36 w-36 object-contain [grid-area:1/1] sm:h-44 sm:w-44" />
      </div>
      {chips.map((chip, index) => (
        <div key={chip.label} className={`absolute ${chip.pos}`}>
          <div
            className={`${floats[index % floats.length]} flex items-center gap-2.5 rounded-2xl bg-white py-2 pl-2 pr-4 text-[13.5px] font-semibold text-[#1a2744] shadow-[0_16px_34px_rgba(26,39,68,0.14)] ring-1 ring-stone-100`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff0f6]">
              <img src={chip.img} alt="" className="h-6 w-6 object-contain" />
            </span>
            {chip.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  lead,
  dark = false,
  center = false,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  const line = <span className={`h-px w-8 ${dark ? "bg-[#ff8fb8]" : "bg-[#e3146f]"}`} />;
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.24em] ${center ? "justify-center" : ""} ${dark ? "text-[#ff8fb8]" : "text-[#e3146f]"}`}
      >
        {line}
        {kicker}
        {center ? line : null}
      </p>
      <h2 className={`mt-4 text-[1.9rem] font-extrabold leading-[1.18] tracking-[-0.03em] sm:text-[2.35rem] ${dark ? "text-white" : "text-[#1a2744]"}`}>
        {title}
      </h2>
      {lead ? <p className={`mt-4 text-[16px] leading-7 ${dark ? "text-white/70" : "text-stone-600"}`}>{lead}</p> : null}
    </Reveal>
  );
}

export function StepList({ steps }: { steps: { title: string; body: string; img?: string }[] }) {
  return (
    <ol className="step-list relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))]" style={{ "--steps": steps.length } as React.CSSProperties}>
      {steps.map((step, index) => (
        <Reveal as="li" key={step.title} delay={index * 90} className="relative">
          <div className="step-card relative h-full overflow-hidden rounded-[1.6rem] p-6">
            <span className="step-card-dots" aria-hidden />
            <div className="relative flex items-start justify-between gap-3">
              <span className="step-card-tile flex h-16 w-16 items-center justify-center rounded-[1.1rem]">
                {step.img ? (
                  <img src={step.img} alt="" className="step-card-icon h-11 w-11 object-contain" />
                ) : (
                  <span className="text-[20px] font-extrabold text-[#e3146f]">{index + 1}</span>
                )}
              </span>
              <span className="step-card-step rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]">
                Bước {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="relative mt-5 text-[17px] font-bold tracking-[-0.01em] text-[#1a2744]">{step.title}</h3>
            <p className="relative mt-2 text-[14.5px] leading-6 text-stone-600">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function LegalPage({
  kicker,
  title,
  lead,
  crumb,
  path,
  updated,
  sections,
  art,
}: {
  kicker: string;
  title: string;
  lead: string;
  crumb: string;
  path: string;
  updated: string;
  sections: { id: string; title: string; body: React.ReactNode }[];
  art?: React.ReactNode;
}) {
  return (
    <main>
      <PageHero
        kicker={kicker}
        title={title}
        lead={lead}
        crumb={crumb}
        path={path}
        art={art}
        actions={
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-semibold text-[#1a2744] ring-1 ring-pink-100">
            <span className="h-2 w-2 rounded-full bg-[#e3146f]" />
            Cập nhật {updated}
          </span>
        }
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-20">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-stone-400">Nội dung</p>
            <ol className="mt-4 space-y-1 border-l border-stone-200">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="toc-link -ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[14.5px] text-stone-600"
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
          <div className="space-y-5">
            {sections.map((section, index) => (
              <Reveal as="article" key={section.id}>
                <div id={section.id} className="scroll-mt-24 rounded-[1.4rem] border border-stone-200 bg-white p-6 sm:p-8">
                  <h2 className="flex items-baseline gap-3 text-[20px] font-bold tracking-[-0.015em] text-[#1a2744] sm:text-[22px]">
                    <span className="text-[15px] font-extrabold text-[#e3146f]">{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </h2>
                  <div className="legal-body mt-4 space-y-3 text-[15.5px] leading-7 text-stone-600">{section.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
