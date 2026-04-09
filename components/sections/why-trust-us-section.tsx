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
      className="bg-[#F7F2EE] px-5 py-11 text-[#63504A] sm:px-8 sm:py-13 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-[860px]">
          <h2 className="text-[clamp(2rem,3.2vw,3.36rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.04em]">
            {section.title}
          </h2>
        </div>

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)] lg:items-stretch lg:gap-7">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {section.galleryItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group relative aspect-[1/1.02] overflow-hidden rounded-[22px] bg-[rgba(255,255,255,0.7)] shadow-[0_14px_34px_rgba(99,80,74,0.12)]"
              >
                <Image
                  src={item.image}
                  alt={`РџРѕС‡РµРјСѓ РґРѕРІРµСЂСЏСЋС‚ Formula72 ${index + 1}`}
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
                    alt={`РџРѕС‡РµРјСѓ РґРѕРІРµСЂСЏСЋС‚ Formula72 ${index + 1} hover`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 40vw, 25vw"
                    unoptimized={isRemoteAssetUrl(item.hoverImage)}
                    className="object-cover object-center opacity-0 transition duration-500 group-hover:opacity-100"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="rounded-[24px] bg-[rgba(255,255,255,0.56)] px-5 py-5 shadow-[0_16px_42px_rgba(99,80,74,0.08)] sm:px-6 sm:py-6 lg:flex lg:h-full lg:flex-col lg:justify-start">
            <ul className="space-y-4 sm:space-y-4.5">
              {section.points.map((point, index) => (
                <li key={`${point.id}-${index}`} className="flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className="inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-[#63504A]"
                  />
                  <span className="text-pretty text-[0.9rem] font-medium leading-[1.5] text-[rgba(99,80,74,0.92)] sm:text-[0.96rem]">
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

