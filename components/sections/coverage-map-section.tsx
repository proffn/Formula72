"use client";

import Image from "next/image";
import { isRemoteAssetUrl } from "@/lib/api";
import type { CoverageMapReviewData, CoverageMapSectionData } from "@/types/home";

type CoverageMapSectionProps = {
  section: CoverageMapSectionData;
};

const defaultAvatar = "/images/home/coverage-map/default-avatar.png";

export function CoverageMapSection({ section }: CoverageMapSectionProps) {
  const activeReviews = section.reviews.filter((review) => review.isActive);

  return (
    <section
      id="coverage-map"
      className="relative overflow-hidden bg-[#F7F2EE] px-5 py-12 text-[#7C6259] sm:px-8 sm:py-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[rgba(124,98,89,0.72)] sm:text-base">
            {section.title}
          </p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4.6vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.05em]">
            {section.subtitle}
          </h2>
          <p className="mt-4 text-balance text-[1.05rem] font-medium leading-[1.55] text-[rgba(124,98,89,0.86)] sm:text-[1.18rem]">
            {section.description}
          </p>
        </div>

        <div className="mt-8 hidden lg:block">
          <div className="relative mx-auto aspect-[1485/845] w-full max-w-[1120px] xl:max-w-[1180px]">
            <Image
              src={section.mapImage}
              alt="РљР°СЂС‚Р° РѕС…РІР°С‚Р° Formula72"
              fill
              sizes="(max-width: 1280px) 86vw, 1180px"
              unoptimized={isRemoteAssetUrl(section.mapImage)}
              className="object-contain"
            />

            <div className="absolute inset-0 z-10">
              {activeReviews.map((review, index) => (
                <DesktopMarker key={review.id} review={review} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2">
            {activeReviews.map((review) => (
              <article
                key={review.id}
                className="flex min-h-[23.5rem] min-w-[280px] snap-start rounded-[28px] border border-[rgba(124,98,89,0.1)] bg-[rgba(255,255,255,0.8)] p-5 shadow-[0_18px_48px_rgba(124,98,89,0.1)]"
              >
                <ReviewCard review={review} compact />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type DesktopMarkerProps = {
  review: CoverageMapReviewData;
  index: number;
};

function DesktopMarker({ review, index }: DesktopMarkerProps) {
  const isRightSide = review.xPosition > 66;
  const isBottomSide = review.yPosition > 58;
  const animationDelay = `${index * 0.18}s`;

  return (
    <div
      className="group absolute hover:z-30"
      style={{
        left: `${review.xPosition}%`,
        top: `${review.yPosition}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <button
        type="button"
        aria-label={`РџРѕРєР°Р·Р°С‚СЊ РѕС‚Р·С‹РІ: ${review.name}`}
        className="coverage-heart-marker relative z-10 flex h-7 w-7 items-center justify-center border-0 bg-transparent p-0"
        style={{ animationDelay }}
        data-marker-id={review.id}
        data-marker-index={index}
        data-x-position={review.xPosition}
        data-y-position={review.yPosition}
        onClick={(event) => {
          event.currentTarget.blur();
        }}
      >
        <HeartIcon className="h-5 w-5 fill-[#D86F46] drop-shadow-[0_8px_12px_rgba(216,111,70,0.25)] transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110" />
      </button>

      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.92)] px-1.5 py-0.5 text-[10px] font-bold leading-none text-[#7C6259] shadow-[0_6px_18px_rgba(124,98,89,0.14)]">
        {index + 1}
      </span>

      <div
        className={`pointer-events-none absolute z-20 w-[320px] opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 ${
          isRightSide ? "right-5" : "left-5"
        } ${isBottomSide ? "bottom-7" : "top-7"}`}
      >
        <div className="rounded-[26px] border border-[rgba(124,98,89,0.14)] bg-[rgba(255,255,255,0.96)] p-4 shadow-[0_24px_60px_rgba(124,98,89,0.16)] backdrop-blur-sm">
          <ReviewCard review={review} />
        </div>
      </div>
    </div>
  );
}

type ReviewCardProps = {
  review: CoverageMapReviewData;
  compact?: boolean;
};

function ReviewCard({ review, compact = false }: ReviewCardProps) {
  const avatar = review.avatar || defaultAvatar;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#F3E8E0]">
          <Image
            src={avatar}
            alt={review.name}
            fill
            sizes="56px"
            unoptimized={isRemoteAssetUrl(avatar)}
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[1.1rem] font-bold leading-tight text-[#6F5850]">{review.name}</h3>

          <div className="mt-2 flex gap-1 text-[#E59B52]">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={`${review.id}-star-${index}`} filled={index < Math.round(review.rating)} />
            ))}
          </div>
        </div>
      </div>

      <p
        className={`mt-4 text-pretty font-medium leading-[1.55] text-[rgba(111,88,80,0.92)] ${
          compact ? "text-[0.98rem]" : "text-[0.95rem]"
        }`}
      >
        {review.reviewText}
      </p>

      {review.brandImage ? (
        <div className={compact ? "mt-auto pt-4" : "mt-4"}>
          <div className="relative h-40 w-full overflow-hidden rounded-[18px] bg-white">
            <Image
              src={review.brandImage}
              alt={`Р¤РѕС‚Рѕ Р±СЂРµРЅРґР° ${review.name}`}
              fill
              sizes={compact ? "240px" : "320px"}
              unoptimized={isRemoteAssetUrl(review.brandImage)}
              className="object-cover"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 21.35 10.55 20C5.4 15.24 2 12.09 2 8.22 2 5.07 4.42 2.65 7.57 2.65c1.78 0 3.48.83 4.43 2.15.95-1.32 2.65-2.15 4.43-2.15C19.58 2.65 22 5.07 22 8.22c0 3.87-3.4 7.02-8.55 11.79L12 21.35Z" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`h-4 w-4 ${filled ? "fill-current" : "fill-[#E7D7CB]"}`}
    >
      <path d="m10 1.7 2.37 4.8 5.3.77-3.84 3.74.91 5.28L10 13.8l-4.74 2.49.9-5.28L2.33 7.27l5.3-.77L10 1.7Z" />
    </svg>
  );
}




