import Image from "next/image";

import type { AboutValueCardData } from "@/types/about";

type AboutValuesProps = {
  title: string;
  values: AboutValueCardData[];
};

export function AboutValues({ title, values }: AboutValuesProps) {
  return (
    <section className="mx-auto w-full max-w-[760px] px-4 pt-9 sm:px-6 lg:px-0">
      <h2 className="text-center text-[clamp(1.25rem,3.2vw,1.85rem)] font-extrabold uppercase leading-none tracking-[-0.035em] text-[#63504A]">
        {title}
      </h2>

      <div className="mt-5 grid justify-items-center gap-3 sm:grid-cols-3 sm:justify-items-stretch sm:gap-4">
        {values.map((value) => (
          <article
            key={value.title}
            className="min-h-[17rem] w-[18rem] max-w-[calc(100vw-3rem)] rounded-[14px] border border-[#7C6259]/8 bg-white px-6 py-6 text-center shadow-[0_18px_38px_rgba(99,80,74,0.13)] sm:w-auto sm:max-w-none"
          >
            {value.icon ? (
              <div className="relative mx-auto h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]">
                <Image src={value.icon} alt="" fill unoptimized className="object-contain" />
              </div>
            ) : null}
            <h3 className="mt-4 text-[1rem] font-extrabold uppercase leading-none tracking-[-0.02em] text-[#63504A]">
              {value.title}
            </h3>
            <p className="mx-auto mt-4 max-w-[13.5rem] whitespace-pre-line text-left text-[0.78rem] font-medium leading-[1.35] text-[#63504A]/82">
              {value.description}
            </p>
            <ValueHighlight value={value} />
          </article>
        ))}
      </div>
    </section>
  );
}

function ValueHighlight({ value }: { value: AboutValueCardData }) {
  if (!value.highlightText) {
    return null;
  }

  const paragraphs = value.highlightText.split(/\n{2,}/).filter(Boolean);

  if (value.title.trim().toLowerCase() === "доступность") {
    return (
      <ul className="mx-auto mt-5 max-w-[13.5rem] space-y-4 text-left text-[0.76rem] leading-[1.35] text-[#63504A]">
        {paragraphs.map((paragraph) => (
          <li key={paragraph} className="grid grid-cols-[0.5rem_1fr] gap-2">
            <span className="mt-[0.46em] h-1 w-1 rounded-full bg-[#63504A]" aria-hidden="true" />
            <span className="whitespace-pre-line font-medium">
              <FormattedAvailabilityText text={paragraph} />
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (value.title.trim().toLowerCase() === "скорость") {
    return (
      <p className="mx-auto mt-5 max-w-[13.5rem] whitespace-pre-line text-left text-[0.76rem] font-medium leading-[1.35] text-[#63504A]">
        <FormattedSpeedText text={value.highlightText} />
      </p>
    );
  }

  if (value.title.trim().toLowerCase() === "профессионализм") {
    return (
      <p className="mx-auto mt-5 max-w-[13.5rem] whitespace-pre-line text-left text-[0.76rem] font-medium leading-[1.35] text-[#63504A]">
        {value.highlightText}
      </p>
    );
  }

  return (
    <p className="mx-auto mt-5 max-w-[13.5rem] whitespace-pre-line text-left text-[0.76rem] font-bold leading-[1.35] text-[#63504A]">
      {value.highlightText}
    </p>
  );
}

function FormattedAvailabilityText({ text }: { text: string }) {
  const marketingText = "К Вашим услугам экспертиза\nотдела маркетинга";

  if (text.includes(marketingText)) {
    const [before, afterMarketing] = text.split(marketingText);
    const [beforeFree, afterFree] = afterMarketing.split("БЕСПЛАТНО.");

    return (
      <>
        {before}
        <span className="font-bold">{marketingText}</span>
        {beforeFree}
        <span className="font-bold">БЕСПЛАТНО.</span>
        {afterFree}
      </>
    );
  }

  return text;
}

function FormattedSpeedText({ text }: { text: string }) {
  const accent = "30\nрабочих дней.";

  if (!text.includes(accent)) {
    return text;
  }

  const [before, after] = text.split(accent);

  return (
    <>
      {before}
      <span className="font-bold">{accent}</span>
      {after}
    </>
  );
}
