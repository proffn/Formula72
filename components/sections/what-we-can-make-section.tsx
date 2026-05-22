import Image from "next/image";
import Link from "next/link";
import type { WhatWeCanMakeItemData, WhatWeCanMakeSectionData } from "@/types/home";

type WhatWeCanMakeSectionProps = {
  section: WhatWeCanMakeSectionData;
};

export function WhatWeCanMakeSection({ section }: WhatWeCanMakeSectionProps) {
  const activeItems = section.items.filter((item) => item.isActive);

  return (
    <section
      id="what-we-can-make"
      className="bg-[#F7F2EE] px-5 py-11 text-[#63504A] sm:px-8 sm:py-12 lg:px-10 lg:py-[4rem]"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-[840px]">
          <h2 className="text-[clamp(2rem,3.2vw,3.4rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.04em]">
            {section.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
          {activeItems.map((item, index) => (
            <WhatWeCanMakeCard key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

type WhatWeCanMakeCardProps = {
  item: WhatWeCanMakeItemData;
};

function WhatWeCanMakeCard({ item }: WhatWeCanMakeCardProps) {
  const hasHoverImage = Boolean(item.hoverImage);
  const hasHoverVideo = Boolean(item.hoverVideo);
  const buttonText = item.buttonText || "Получить прайс";
  const buttonLink =
    item.buttonLink || "https://b24-2uwhq2.bitrix24site.ru/?utm_source=website_contract72";

  return (
    <article className="group overflow-hidden rounded-[22px] border border-[rgba(99,80,74,0.08)] bg-[rgba(255,255,255,0.72)] shadow-[0_14px_36px_rgba(99,80,74,0.1)]">
      <div className="relative aspect-[0.92] overflow-hidden bg-[rgba(255,255,255,0.5)]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="eager"
          unoptimized
          className={`object-cover object-center transition duration-500 ${hasHoverImage || hasHoverVideo ? 'group-hover:scale-[1.02]' : ''} ${hasHoverImage ? 'group-hover:opacity-0' : 'opacity-100'}`}
        />

        {hasHoverImage ? (
          <Image
            src={item.hoverImage!}
            alt={`${item.title} hover`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="eager"
            unoptimized
            className="object-cover object-center opacity-0 transition duration-500 group-hover:opacity-100"
          />
        ) : null}

        {hasHoverVideo ? (
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
          >
            <source src={item.hoverVideo} />
          </video>
        ) : null}
      </div>

      <div className="flex flex-col border-t border-[rgba(99,80,74,0.08)] px-3 py-3 sm:px-4">
        <h3 className="text-center text-[0.84rem] font-bold uppercase leading-[1.16] tracking-[-0.02em] sm:text-[0.88rem]">
          {item.title}
        </h3>

        {buttonText && buttonLink ? (
          <Link
            href={buttonLink}
            className="mt-3 inline-flex min-h-8 items-center justify-center rounded-full bg-[#63504A] px-4 py-2 text-center text-[0.66rem] font-extrabold uppercase tracking-[0.06em] text-[#F7F2EE] shadow-[0_9px_20px_rgba(69,53,47,0.14)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.02] hover:bg-[#52403a] hover:shadow-[0_14px_26px_rgba(69,53,47,0.2)] active:translate-y-0 active:scale-[0.99] focus-visible:bg-[#52403a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63504A]/25"
          >
            {buttonText}
          </Link>
        ) : null}
      </div>
    </article>
  );
}


