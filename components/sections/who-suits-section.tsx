import Image from "next/image";
import Link from "next/link";
import type { WhoSuitsSectionData } from "@/types/home";

type WhoSuitsSectionProps = {
  section: WhoSuitsSectionData;
};

export function WhoSuitsSection({ section }: WhoSuitsSectionProps) {
  return (
    <section id="who-suits" className="bg-[#F7F2EE] px-5 py-11 text-[#63504A] sm:px-8 sm:py-13 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-[860px]">
          <h2 className="text-[clamp(2rem,3.2vw,3.36rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.04em]">
            {section.title}
          </h2>
        </div>

        <div className="mt-6 grid gap-3.5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {section.items.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="group flex min-h-[16.8rem] flex-col rounded-[22px] border border-[rgba(99,80,74,0.08)] bg-[rgba(255,255,255,0.74)] p-4 shadow-[0_16px_40px_rgba(99,80,74,0.12)] backdrop-blur-[2px] transition duration-300 sm:min-h-[17.6rem] sm:p-5"
            >
              <div className="flex min-h-[5.8rem] items-end justify-center sm:min-h-[6rem]">
                <div className="relative h-[5.4rem] w-full max-w-[7.8rem] sm:h-[5.8rem] sm:max-w-[8.2rem]">
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

              <div className="mt-3 flex flex-1 flex-col">
                <h3 className="text-center text-[0.96rem] font-extrabold uppercase leading-[1.05] tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-center text-[0.78rem] font-medium leading-[1.38] text-[rgba(99,80,74,0.88)] sm:text-[0.8rem]">
                  {item.text}
                </p>

                {item.buttonText && item.buttonLink ? (
                  <Link
                    href={item.buttonLink}
                    className="mt-auto inline-flex min-h-9 items-center justify-center rounded-full bg-[#63504A] px-4 py-2.5 text-center text-[0.68rem] font-bold uppercase tracking-[0.06em] text-[#F7F2EE] shadow-[0_10px_24px_rgba(69,53,47,0.14)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.03] hover:bg-[#52403a] hover:shadow-[0_16px_30px_rgba(69,53,47,0.2)] active:translate-y-0 active:scale-[0.99] focus-visible:bg-[#52403a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/25"
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

