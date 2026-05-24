import Image from "next/image";

type AboutMissionProps = {
  title: string;
  text: string;
  image: string;
};

export function AboutMission({ title, text, image }: AboutMissionProps) {
  return (
    <section className="mx-auto w-full max-w-[760px] px-4 pt-10 sm:px-6 lg:px-0">
      <div className="grid min-h-[132px] overflow-hidden rounded-[8px] bg-[#735347] text-[#FFF9F5] shadow-[0_20px_44px_rgba(99,80,74,0.16)] sm:grid-cols-[1fr_210px]">
        <div className="px-7 py-7 sm:px-9">
          <h2 className="text-[clamp(1.35rem,3.4vw,2rem)] font-extrabold uppercase leading-none tracking-[-0.04em]">
            {title}
          </h2>
          <p className="mt-4 max-w-[31rem] whitespace-pre-line text-[0.95rem] font-extralight leading-[1.28] text-[#FFF9F5]/86 sm:text-[1.08rem]">
            <FormattedMissionText text={text} />
          </p>
        </div>
        {image ? (
          <div className="relative min-h-[9rem] sm:min-h-0">
            <Image
              src={image}
              alt=""
              fill
              unoptimized
              className="object-contain object-center px-8 py-4 sm:px-5"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FormattedMissionText({ text }: { text: string }) {
  const firstAccent = "Хочешь покорить мир";
  const secondAccent = "Мы поможем.";

  if (!text.includes(firstAccent) || !text.includes(secondAccent)) {
    return text;
  }

  const [beforeFirst, afterFirstAccent] = text.split(firstAccent);
  const [betweenAccents, afterSecondAccent] = afterFirstAccent.split(secondAccent);

  return (
    <>
      {beforeFirst}
      <span className="font-semibold">{firstAccent}</span>
      {betweenAccents}
      <span className="font-semibold">{secondAccent}</span>
      {afterSecondAccent}
    </>
  );
}
