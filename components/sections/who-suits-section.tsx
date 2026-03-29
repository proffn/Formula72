import Image from "next/image";
import Link from "next/link";
import { isRemoteAssetUrl } from "@/lib/api";
import type { WhoSuitsSectionData } from "@/types/home";

type WhoSuitsSectionProps = {
  section: WhoSuitsSectionData;
};

export function WhoSuitsSection({ section }: WhoSuitsSectionProps) {
  return (
    <section id="who-suits" className="bg-[#F7F2EE] px-5 py-14 text-[#63504A] sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2rem,4vw,4.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.04em]">
            {section.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {section.items.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="flex min-h-[21rem] flex-col rounded-[28px] border border-[rgba(99,80,74,0.08)] bg-[rgba(255,255,255,0.74)] p-5 shadow-[0_22px_56px_rgba(99,80,74,0.12)] backdrop-blur-[2px] sm:min-h-[22rem] sm:p-6"
            >
              <div className="flex min-h-[7.25rem] items-end justify-center sm:min-h-[7.5rem]">
                <div className="relative h-[6.75rem] w-full max-w-[9.75rem] sm:h-[7.25rem] sm:max-w-[10.25rem]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    unoptimized={isRemoteAssetUrl(item.image)}
                    className="object-contain object-center"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-1 flex-col">
                <h3 className="text-center text-[1.2rem] font-extrabold leading-[1.05] tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-center text-[0.96rem] font-medium leading-[1.45] text-[rgba(99,80,74,0.88)] sm:text-[0.98rem]">
                  {item.text}
                </p>

                {item.buttonText && item.buttonLink ? (
                  <Link
                    href={item.buttonLink}
                    className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-[#63504A] px-5 py-3 text-center text-[0.78rem] font-bold uppercase tracking-[0.06em] text-[#F7F2EE] transition duration-300 hover:bg-[#52403a] focus-visible:bg-[#52403a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/25"
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

