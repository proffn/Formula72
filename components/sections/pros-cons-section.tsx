import type { ComparisonColumnData, ProsConsSectionData } from "@/types/home";

type ProsConsSectionProps = {
  section: ProsConsSectionData;
};

export function ProsConsSection({ section }: ProsConsSectionProps) {
  return (
    <section
      id="pros-cons"
      className="relative bg-[#F7F2EE] px-5 py-10 text-[#63504A] sm:px-8 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-4xl">
          <h2 className="text-balance text-[clamp(2rem,3.5vw,4rem)] font-extrabold leading-[0.94] tracking-[-0.04em]">
            {section.sectionTitle}
          </h2>
        </div>

        <div className="mt-7 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5 lg:gap-6">
          <ComparisonCard column={section.leftColumn} tone="warm" />
          <ComparisonCard column={section.rightColumn} tone="light" />
        </div>
      </div>
    </section>
  );
}

type ComparisonCardProps = {
  column: ComparisonColumnData;
  tone: "warm" | "light";
};

function ComparisonCard({ column, tone }: ComparisonCardProps) {
  const cardTone =
    tone === "warm"
      ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.44)_0%,rgba(255,255,255,0.22)_100%)]"
      : "bg-[linear-gradient(180deg,rgba(255,255,255,0.66)_0%,rgba(255,255,255,0.34)_100%)]";

  return (
    <article
      className={`rounded-[28px] border border-[rgba(99,80,74,0.1)] ${cardTone} p-5 shadow-[0_20px_60px_rgba(99,80,74,0.08)] backdrop-blur-[2px] sm:p-6 lg:p-7`}
    >
      <h3 className="text-[clamp(1.6rem,2vw,2.35rem)] font-extrabold uppercase tracking-[-0.03em]">
        {column.title}
      </h3>

      <div className="mt-6 border-t border-[rgba(99,80,74,0.12)] pt-5">
        <SectionList title={column.advantagesTitle} items={column.advantages} marker="+" accent="positive" />
      </div>

      <div className="mt-6 border-t border-[rgba(99,80,74,0.12)] pt-5">
        <SectionList
          title={column.disadvantagesTitle}
          items={column.disadvantages}
          marker="-"
          accent="negative"
        />
      </div>
    </article>
  );
}

type SectionListProps = {
  title: string;
  items: string[];
  marker: "+" | "-";
  accent: "positive" | "negative";
};

function SectionList({ title, items, marker, accent }: SectionListProps) {
  const markerClass =
    accent === "positive"
      ? "bg-[rgba(99,80,74,0.08)] text-[#63504A]"
      : "bg-[rgba(99,80,74,0.06)] text-[#8B766D]";

  return (
    <div>
      <h4 className="text-[1.1rem] font-bold leading-none tracking-[-0.02em] sm:text-[1.2rem]">{title}</h4>
      <ul className="mt-4 space-y-3 sm:space-y-3.5">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[32px,1fr] items-start gap-3 sm:grid-cols-[36px,1fr] sm:gap-3.5">
            <span
              aria-hidden="true"
              className={`inline-flex h-[28px] w-[28px] items-center justify-center rounded-full text-[0.95rem] font-semibold leading-none ${markerClass} sm:h-[32px] sm:w-[32px]`}
            >
              {marker}
            </span>
            <span className="text-pretty text-[0.96rem] font-medium leading-[1.45] text-[#63504A] sm:text-[1rem] lg:text-[1.03rem]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
