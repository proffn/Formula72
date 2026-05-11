"use client";

import Image from "next/image";
import type { CoverageMapReviewData, CoverageMapSectionData } from "@/types/home";

type CoverageMapSectionProps = {
  section: CoverageMapSectionData;
};

const defaultAvatar = "/images/home/coverage-map/default-avatar.png";

export function CoverageMapSection({ section }: CoverageMapSectionProps) {
  const activeReviews = section.reviews.filter((review) => review.isActive);
  const desktopSubtitle = section.subtitle.replace(/\s+/g, "\n").trim();

  return (
    <section
      id="coverage-map"
      className="relative z-10 overflow-visible bg-[#F7F2EE] px-5 py-0 text-[#7C6259] sm:px-8 sm:py-0 lg:px-10 lg:py-0"
    >
      <div className="mx-auto max-w-[1140px] overflow-visible">
        <div className="mx-auto max-w-[988px] text-center">
          <p className="text-[0.84rem] font-semibold uppercase tracking-[0.285em] text-[rgba(124,98,89,0.72)] sm:text-[0.9rem]">
            {section.title}
          </p>
          <h2 className="mt-3 text-balance whitespace-pre-line text-[clamp(2rem,3.85vw,3.76rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.05em]">
            {desktopSubtitle}
          </h2>
          <p className="mt-3 text-balance text-[0.88rem] font-medium leading-[1.48] text-[rgba(124,98,89,0.86)] sm:text-[0.98rem]">
            {section.description}
          </p>
        </div>

        <div className="mt-6 hidden lg:block">
          <div className="relative mx-auto aspect-[1485/845] w-full max-w-[936px] overflow-visible xl:max-w-[986px]">
            <Image
              src={section.mapImage}
              alt="Карта охвата Formula72"
              fill
              sizes="(max-width: 1280px) 76vw, 986px"
              loading="eager"
              unoptimized
              className="object-contain"
            />

            <div className="absolute inset-0 z-20 overflow-visible">
              {activeReviews.map((review, index) => (
                <DesktopMarker key={review.id} review={review} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 lg:hidden">
          <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
            {activeReviews.map((review) => (
              <article
                key={review.id}
                className="flex min-h-[19.75rem] min-w-[234px] snap-start rounded-[22px] border border-[rgba(124,98,89,0.1)] bg-[rgba(255,255,255,0.8)] p-4 shadow-[0_15px_38px_rgba(124,98,89,0.1)]"
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
  const isRightSide = review.xPosition > 58;
  const isTopZone = review.yPosition < 24;
  const isBottomZone = review.brandImage ? review.yPosition > 66 : review.yPosition > 74;
  const animationDelay = `${index * 0.18}s`;

  const verticalPositionClass = isTopZone
    ? "top-0"
    : isBottomZone
      ? "bottom-0"
      : "top-1/2 -translate-y-1/2";

  return (
    <div
      className="group absolute z-30 hover:z-50"
      style={{
        left: `${review.xPosition}%`,
        top: `${review.yPosition}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <button
        type="button"
        aria-label={`Показать отзыв: ${review.name}`}
        className="coverage-heart-marker relative z-10 flex h-5 w-5 items-center justify-center border-0 bg-transparent p-0"
        style={{ animationDelay }}
        data-marker-id={review.id}
        data-marker-index={index}
        data-x-position={review.xPosition}
        data-y-position={review.yPosition}
        onClick={(event) => {
          event.currentTarget.blur();
        }}
      >
        <HeartIcon className="h-[15px] w-[15px] fill-[#D86F46] drop-shadow-[0_6px_8px_rgba(216,111,70,0.25)] transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110" />
      </button>

      <div
        className={`pointer-events-none absolute z-[60] w-[268px] opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 ${
          isRightSide ? "right-4.5" : "left-4.5"
        } ${verticalPositionClass}`}
      >
        <div className="max-h-[23.5rem] overflow-y-auto rounded-[20px] border border-[rgba(124,98,89,0.14)] bg-[rgba(255,255,255,0.96)] p-3 shadow-[0_18px_42px_rgba(124,98,89,0.16)] backdrop-blur-sm">
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
      <div className="flex items-start gap-2.5">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#F3E8E0]">
          <Image
            src={avatar}
            alt={review.name}
            fill
            sizes="44px"
            loading="eager"
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[0.96rem] font-bold leading-tight text-[#6F5850]">{review.name}</h3>

          <div className="mt-1.5 flex gap-1 text-[#E59B52]">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={`${review.id}-star-${index}`} filled={index < Math.round(review.rating)} />
            ))}
          </div>
        </div>
      </div>

      <p
        className={`mt-3 text-pretty font-medium leading-[1.48] text-[rgba(111,88,80,0.92)] ${
          compact ? "text-[0.86rem]" : "text-[0.82rem]"
        }`}
      >
        {review.reviewText}
      </p>

      {review.brandImage ? (
        <div className={compact ? "mt-auto pt-3" : "mt-3"}>
          <div className="relative h-[132px] w-full overflow-hidden rounded-[15px] bg-white">
            <Image
              src={review.brandImage}
              alt={`Фото бренда ${review.name}`}
              fill
              sizes={compact ? "210px" : "268px"}
              loading="eager"
              unoptimized
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
      className={`h-[13px] w-[13px] ${filled ? "fill-current" : "fill-[#E7D7CB]"}`}
    >
      <path d="m10 1.7 2.37 4.8 5.3.77-3.84 3.74.91 5.28L10 13.8l-4.74 2.49.9-5.28L2.33 7.27l5.3-.77L10 1.7Z" />
    </svg>
  );
}

