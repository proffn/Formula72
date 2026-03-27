import Image from "next/image";
import { isRemoteAssetUrl } from "@/lib/api";
import type { WhyTrustUsSectionData } from "@/types/home";

type WhyTrustUsSectionProps = {
  section: WhyTrustUsSectionData;
};

export function WhyTrustUsSection({ section }: WhyTrustUsSectionProps) {
  return (
    <section
      id="why-trust-us"
      className="bg-[#F7F2EE] px-5 py-14 text-[#63504A] sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-4xl">
          <h2 className="text-[clamp(2rem,4vw,4.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.04em]">
            {section.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)] lg:items-stretch lg:gap-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {section.galleryItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group relative aspect-[1/1.02] overflow-hidden rounded-[28px] bg-[rgba(255,255,255,0.7)] shadow-[0_18px_46px_rgba(99,80,74,0.12)]"
              >
                <Image
                  src={item.image}
                  alt={`Почему доверяют Formula72 ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 40vw, 25vw"
                  unoptimized={isRemoteAssetUrl(item.image)}
                  className={`object-cover object-center transition duration-500 ${
                    item.hoverImage ? "opacity-100 group-hover:opacity-0" : ""
                  }`}
                />
                {item.hoverImage ? (
                  <Image
                    src={item.hoverImage}
                    alt={`Почему доверяют Formula72 ${index + 1} hover`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 40vw, 25vw"
                    unoptimized={isRemoteAssetUrl(item.hoverImage)}
                    className="object-cover object-center opacity-0 transition duration-500 group-hover:opacity-100"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="rounded-[30px] bg-[rgba(255,255,255,0.56)] px-6 py-6 shadow-[0_20px_60px_rgba(99,80,74,0.08)] sm:px-8 sm:py-8 lg:flex lg:h-full lg:flex-col lg:justify-start">
            <ul className="space-y-5 sm:space-y-6">
              {section.points.map((point, index) => (
                <li key={`${point.id}-${index}`} className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#63504A]"
                  />
                  <span className="text-pretty text-[1.08rem] font-medium leading-[1.6] text-[rgba(99,80,74,0.92)] sm:text-[1.14rem]">
                    {point.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
