import Image from "next/image";
import Link from "next/link";
import type { WhoSuitsSectionData } from "@/types/home";

type WhoSuitsSectionProps = {
  section: WhoSuitsSectionData;
};

function formatItemTitle(title: string) {
  return title.replace(/магазинам косметики и сетям/i, "МАГАЗИНАМ КОСМЕТИКИ\nИ СЕТЯМ");
}

export function WhoSuitsSection({ section }: WhoSuitsSectionProps) {
  return (
    <section id="who-suits" className="bg-[#F7F2EE] px-2.5 py-11 text-[#63504A] sm:px-8 sm:py-13 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-[860px]">
          <h2 className="text-[clamp(2rem,3.2vw,3.36rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.04em]">
            {section.title}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3.5 lg:grid-cols-3 lg:gap-4">
          {section.items.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="group flex min-h-[20.4rem] flex-col rounded-[20px] border border-[rgba(99,80,74,0.08)] bg-[rgba(255,255,255,0.74)] p-3 shadow-[0_16px_40px_rgba(99,80,74,0.12)] backdrop-blur-[2px] transition duration-300 sm:min-h-[17.6rem] sm:rounded-[22px] sm:p-5"
            >
              <div className="flex min-h-[7.2rem] items-center justify-center sm:min-h-[6rem]">
                <div className="relative h-[6.2rem] w-full max-w-[7.1rem] sm:h-[5.8rem] sm:max-w-[8.2rem]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    loading="eager"
                    unoptimized
                    className="object-contain object-center transition duration-300 group-hover:translate-y-[-2px]"
                  />
                </div>
              </div>

              <div className="mt-2.5 flex flex-1 flex-col">
                <h3 className="flex min-h-[3.15rem] items-center justify-center whitespace-pre-line text-center text-[0.72rem] font-extrabold uppercase leading-[1.12] tracking-[-0.025em] sm:min-h-0 sm:text-[0.96rem] sm:leading-[1.05] sm:tracking-[-0.03em]">
                  {formatItemTitle(item.title)}
                </h3>
                <div className="mt-2.5 flex min-h-[5.2rem] items-start justify-center">
                  <p className="text-center text-[0.62rem] font-medium leading-[1.34] text-[rgba(99,80,74,0.88)] sm:text-[0.8rem] sm:leading-[1.38]">
                    {item.text}
                  </p>
                </div>

                {item.buttonText && item.buttonLink ? (
                  <Link
                    href={item.buttonLink}
                    className="mt-auto inline-flex min-h-8 items-center justify-center rounded-full bg-[#63504A] px-2.5 py-2 text-center text-[0.54rem] font-bold uppercase leading-tight tracking-[0.035em] text-[#F7F2EE] shadow-[0_10px_24px_rgba(69,53,47,0.14)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.03] hover:bg-[#52403a] hover:shadow-[0_16px_30px_rgba(69,53,47,0.2)] active:translate-y-0 active:scale-[0.99] focus-visible:bg-[#52403a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/25 sm:min-h-9 sm:px-4 sm:py-2.5 sm:text-[0.68rem] sm:tracking-[0.06em]"
                  >
                    {item.buttonText}
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
