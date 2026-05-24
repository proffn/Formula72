import Image from "next/image";
import type { TermsSectionData } from "@/types/terms";

type TermsSectionCardProps = {
  section: TermsSectionData;
};

function isStrongLine(line: string) {
  return (
    line.startsWith("Минимальная партия") ||
    line.startsWith("Минимальной суммы") ||
    line.startsWith("ВАЖНО!") ||
    line.startsWith("Мы запускаем") ||
    line.startsWith("Доставка До терминалов")
  );
}

function renderContent(content: string) {
  return content.split("\n").map((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      return <div key={`space-${index}`} className="h-3" />;
    }

    const isBullet = trimmedLine.startsWith("•");
    const text = isBullet ? trimmedLine.replace(/^•\s*/, "") : trimmedLine;

    return (
      <p
        key={`${trimmedLine}-${index}`}
        className={`text-[0.92rem] leading-[1.48] text-[#63504A]/88 sm:text-[1rem] ${
          isStrongLine(trimmedLine) ? "font-bold text-[#5A4741]" : "font-medium"
        } ${trimmedLine.startsWith("*") ? "italic text-[#735F58]/86" : ""}`}
      >
        {isBullet ? <span className="mr-2 text-[#A2705F]">•</span> : null}
        {text}
      </p>
    );
  });
}

export function TermsSectionCard({ section }: TermsSectionCardProps) {
  const isExternalLink = section.buttonHref.startsWith("http");

  return (
    <article className="grid overflow-hidden rounded-[8px] border border-[#8F756C]/18 bg-white/74 shadow-[0_24px_64px_rgba(99,80,74,0.12)] backdrop-blur-sm md:grid-cols-[minmax(260px,0.86fr)_minmax(0,1.14fr)]">
      <div className="relative min-h-[240px] bg-[#F4ECE7] sm:min-h-[320px] md:min-h-full">
        <Image
          src={section.image}
          alt={section.title}
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          unoptimized
          className="object-contain p-6 sm:p-8"
        />
      </div>

      <div className="flex flex-col px-5 py-7 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <h2 className="max-w-[620px] text-[clamp(1.7rem,3.4vw,3rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em] text-[#63504A]">
          {section.title}
        </h2>

        <div className="mt-5 space-y-1.5">{renderContent(section.content)}</div>

        <a
          href={section.buttonHref}
          target={isExternalLink ? "_blank" : undefined}
          rel={isExternalLink ? "noreferrer" : undefined}
          className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-[8px] bg-[#63504A] px-6 py-3 text-center text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-[#F7F2EE] shadow-[0_16px_32px_rgba(99,80,74,0.2)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.015] hover:bg-[#52413B] hover:shadow-[0_20px_38px_rgba(99,80,74,0.25)] active:translate-y-0 active:scale-[0.99] sm:w-auto sm:min-w-[16rem]"
        >
          {section.buttonLabel}
        </a>
      </div>
    </article>
  );
}
