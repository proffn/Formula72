import Image from "next/image";
import { isRemoteAssetUrl } from "@/lib/api";
import type { WhatWeCanMakeItemData, WhatWeCanMakeSectionData } from "@/types/home";

type WhatWeCanMakeSectionProps = {
  section: WhatWeCanMakeSectionData;
};

export function WhatWeCanMakeSection({ section }: WhatWeCanMakeSectionProps) {
  const activeItems = section.items.filter((item) => item.isActive);

  return (
    <section
      id="what-we-can-make"
      className="bg-[#F7F2EE] px-5 py-14 text-[#63504A] sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-4xl">
          <h2 className="text-[clamp(2rem,4vw,4.2rem)] font-extrabold leading-[0.94] tracking-[-0.04em]">
            {section.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
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

  return (
    <article className="group overflow-hidden rounded-[28px] border border-[rgba(99,80,74,0.08)] bg-[rgba(255,255,255,0.72)] shadow-[0_20px_52px_rgba(99,80,74,0.1)] transition duration-300 hover:translate-y-[-2px] hover:shadow-[0_26px_60px_rgba(99,80,74,0.14)]">
      <div className="relative aspect-[0.92] overflow-hidden bg-[rgba(255,255,255,0.5)]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized={isRemoteAssetUrl(item.image)}
          className={`object-cover object-center transition duration-500 ${hasHoverImage || hasHoverVideo ? 'group-hover:scale-[1.02]' : ''} ${hasHoverImage ? 'group-hover:opacity-0' : 'opacity-100'}`}
        />

        {hasHoverImage ? (
          <Image
            src={item.hoverImage!}
            alt={`${item.title} hover`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized={isRemoteAssetUrl(item.hoverImage)}
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

      <div className="border-t border-[rgba(99,80,74,0.08)] px-4 py-4 sm:px-5">
        <h3 className="text-center text-[1rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[1.05rem]">
          {item.title}
        </h3>
      </div>
    </article>
  );
}
