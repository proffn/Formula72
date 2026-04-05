import { getStrapiMediaUrl, strapiFetch } from "@/lib/api";
import { homePageMock } from "@/lib/mock/home";
import type {
  BannerItem,
  BannerTextPosition,
  CoverageMapReviewData,
  CoverageMapSectionData,
  FaqCategoryData,
  FaqItemData,
  FaqSectionData,
  FinalBrandSectionData,
  Formula72SchemeSectionData,
  HomePageData,
  LeadCtaSectionData,
  MissionK72SectionData,
  NavItem,
  ProsConsSectionData,
  SiteHeaderContent,
  WholesaleSectionData,
  WhyTrustGalleryItemData,
  WhyTrustPointData,
  WhyTrustUsSectionData,
  WhatWeCanMakeItemData,
  WhatWeCanMakeSectionData,
  WhoSuitsItemData,
  WhoSuitsSectionData,
  WorkStageItemData,
  WorkStagesSectionData,
} from "@/types/home";
import type {
  StrapiBanner,
  StrapiCollectionResponse,
  StrapiCoverageMapReview,
  StrapiCoverageMapSection,
  StrapiFaqCategory,
  StrapiFaqItem,
  StrapiFaqSection,
  StrapiFinalBrandSection,
  StrapiFormula72SchemeSection,
  StrapiHomePage,
  StrapiLeadCtaSection,
  StrapiMissionK72Section,
  StrapiProsConsSection,
  StrapiSiteHeader,
  StrapiSingleResponse,
  StrapiTextItem,
  StrapiWhyTrustGalleryItem,
  StrapiWhyTrustPoint,
  StrapiWhyTrustUsSection,
  StrapiWhatWeCanMakeSection,
  StrapiMakeItem,
  StrapiWhoSuitsItem,
  StrapiWhoSuitsSection,
  StrapiWholesaleContractSection,
  StrapiWorkStageItem,
  StrapiWorkStagesSection,
} from "@/types/strapi";

const navigationHrefs = ["#hero", "#hero", "#wholesale-contract", "#banners"] as const;
function splitTitle(value: string, fallback: [string, string]): [string, string] {
  const normalized = value.trim();

  if (!normalized) {
    return fallback;
  }

  if (normalized.includes("\n")) {
    const lines = normalized
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length >= 2) {
      return [lines[0], lines.slice(1).join(" ")];
    }
  }

  const parts = normalized.split(" ").filter(Boolean);

  if (parts.length >= 2) {
    return [parts[0], parts.slice(1).join(" ")];
  }

  return fallback;
}

function normalizeSingle<T>(response: StrapiSingleResponse<T | { attributes?: T }>): T | null {
  const entry = response.data as T | { attributes?: T } | null;

  if (!entry) {
    return null;
  }

  if (typeof entry === "object" && entry !== null && "attributes" in entry && entry.attributes) {
    return entry.attributes as T;
  }

  return entry as T;
}

function normalizeCollection<T>(response: StrapiCollectionResponse<T | { attributes?: T }>): T[] {
  return response.data.map((entry) => {
    if (typeof entry === "object" && entry !== null && "attributes" in entry && entry.attributes) {
      return entry.attributes as T;
    }

    return entry as T;
  });
}

function resolveMediaUrl(
  media:
    | { url?: string | null; data?: { url?: string | null; attributes?: { url?: string | null } | null } | null }
    | null
    | undefined,
) {
  const directUrl = media?.url;

  if (directUrl) {
    return getStrapiMediaUrl(directUrl);
  }

  const nestedUrl = media?.data?.url ?? media?.data?.attributes?.url;
  return getStrapiMediaUrl(nestedUrl);
}

function resolveBannerTextPosition(banner: StrapiBanner, index: number): BannerTextPosition {
  if (banner.textPosition === "left-top" || banner.textPosition === "right-center") {
    return banner.textPosition;
  }

  if (banner.order === 1) {
    return "left-top";
  }

  if (banner.order === 2) {
    return "right-center";
  }

  return index === 0 ? "left-top" : "right-center";
}

function mapBanner(banner: StrapiBanner, index: number): BannerItem {
  const textPosition = resolveBannerTextPosition(banner, index);

  return {
    id: banner.documentId ?? String(banner.id ?? index),
    title: banner.title,
    subtitle: banner.subtitle ?? undefined,
    textPosition,
    image: resolveMediaUrl(banner.image) ?? homePageMock.banners[index % homePageMock.banners.length].image,
    textColor: textPosition === "left-top" ? "dark" : "light",
  };
}

function mapHero(homePage: StrapiHomePage) {
  return {
    lines: [
      homePage.heroTitleLine1 || homePageMock.hero.lines[0],
      homePage.heroTitleLine2 || homePageMock.hero.lines[1],
    ] as [string, string],
    brand: homePage.heroSubtitle || homePageMock.hero.brand,
    backgroundImage: resolveMediaUrl(homePage.heroBackgroundImage) ?? homePageMock.hero.backgroundImage,
  };
}

function mapSiteHeader(siteHeader: StrapiSiteHeader): {
  siteHeader: SiteHeaderContent;
  navigation: NavItem[];
} {
  return {
    siteHeader: {
      logoImage: resolveMediaUrl(siteHeader.logoImage) ?? homePageMock.siteHeader.logoImage,
      phone: siteHeader.phone?.trim() || homePageMock.siteHeader.phone,
      workSchedule: siteHeader.workSchedule?.trim() || homePageMock.siteHeader.workSchedule,
    },
    navigation: [
      siteHeader.navAboutLabel?.trim() || homePageMock.navigation[0].label,
      siteHeader.navProductionLabel?.trim() || homePageMock.navigation[1].label,
      siteHeader.navWholesaleLabel?.trim() || homePageMock.navigation[2].label,
      siteHeader.navReviewsLabel?.trim() || homePageMock.navigation[3].label,
    ].map((label, index) => ({
      label,
      href: navigationHrefs[index],
    })),
  };
}

function mapWholesale(section: StrapiWholesaleContractSection): WholesaleSectionData {
  return {
    backgroundImage:
      resolveMediaUrl(section.backgroundImage) ?? homePageMock.wholesaleContract.backgroundImage,
    left: {
      lines: splitTitle(section.leftTitle, homePageMock.wholesaleContract.left.lines),
      action: {
        label: section.leftButtonText,
        href: section.leftButtonLink,
      },
    },
    right: {
      lines: splitTitle(section.rightTitle, homePageMock.wholesaleContract.right.lines),
      action: {
        label: section.rightButtonText,
        href: section.rightButtonLink,
      },
    },
  };
}

function normalizeTextItems(items: StrapiTextItem[] | null | undefined, fallback: string[]) {
  const normalized = (items ?? [])
    .map((item) => item.text?.trim())
    .filter((item): item is string => Boolean(item));

  return normalized.length > 0 ? normalized : fallback;
}

function mapProsCons(section: StrapiProsConsSection): ProsConsSectionData {
  return {
    sectionTitle: section.sectionTitle?.trim() || homePageMock.prosCons.sectionTitle,
    leftColumn: {
      title: section.leftTitle?.trim() || homePageMock.prosCons.leftColumn.title,
      advantagesTitle:
        section.leftAdvantagesTitle?.trim() || homePageMock.prosCons.leftColumn.advantagesTitle,
      advantages: normalizeTextItems(section.leftAdvantages, homePageMock.prosCons.leftColumn.advantages),
      disadvantagesTitle:
        section.leftDisadvantagesTitle?.trim() || homePageMock.prosCons.leftColumn.disadvantagesTitle,
      disadvantages: normalizeTextItems(
        section.leftDisadvantages,
        homePageMock.prosCons.leftColumn.disadvantages,
      ),
    },
    rightColumn: {
      title: section.rightTitle?.trim() || homePageMock.prosCons.rightColumn.title,
      advantagesTitle:
        section.rightAdvantagesTitle?.trim() || homePageMock.prosCons.rightColumn.advantagesTitle,
      advantages: normalizeTextItems(section.rightAdvantages, homePageMock.prosCons.rightColumn.advantages),
      disadvantagesTitle:
        section.rightDisadvantagesTitle?.trim() || homePageMock.prosCons.rightColumn.disadvantagesTitle,
      disadvantages: normalizeTextItems(
        section.rightDisadvantages,
        homePageMock.prosCons.rightColumn.disadvantages,
      ),
    },
  };
}

function mapFormula72Scheme(section: StrapiFormula72SchemeSection): Formula72SchemeSectionData {
  return {
    title: section.title?.trim() || homePageMock.formula72Scheme.title,
    image: resolveMediaUrl(section.image) ?? homePageMock.formula72Scheme.image,
  };
}

function mapMissionK72(section: StrapiMissionK72Section): MissionK72SectionData {
  return {
    title: section.title?.trim() || homePageMock.missionK72.title,
    leadText: section.leadText?.trim() || homePageMock.missionK72.leadText,
    leftMainImage: resolveMediaUrl(section.leftMainImage) ?? homePageMock.missionK72.leftMainImage,
    items: [
      {
        title: section.certificationTitle?.trim() || homePageMock.missionK72.items[0].title,
        text: section.certificationText?.trim() || homePageMock.missionK72.items[0].text,
        image: resolveMediaUrl(section.certificationImage) ?? homePageMock.missionK72.items[0].image,
      },
      {
        title: section.honestSignTitle?.trim() || homePageMock.missionK72.items[1].title,
        text: section.honestSignText?.trim() || homePageMock.missionK72.items[1].text,
        image: resolveMediaUrl(section.honestSignImage) ?? homePageMock.missionK72.items[1].image,
      },
      {
        title: section.professionalismTitle?.trim() || homePageMock.missionK72.items[2].title,
        text: section.professionalismText?.trim() || homePageMock.missionK72.items[2].text,
        image: resolveMediaUrl(section.professionalismImage) ?? homePageMock.missionK72.items[2].image,
      },
    ],
    sideLabel: section.sideLabel?.trim() || homePageMock.missionK72.sideLabel,
  };
}

function mapWorkStageItem(stage: StrapiWorkStageItem, index: number): WorkStageItemData {
  const fallbackStage = homePageMock.workStages.stages[index % homePageMock.workStages.stages.length];

  return {
    id: String(stage.id ?? fallbackStage.id ?? index),
    text: stage.text?.trim() || fallbackStage.text,
    image: resolveMediaUrl(stage.image) ?? fallbackStage.image,
  };
}

function mapWorkStages(section: StrapiWorkStagesSection): WorkStagesSectionData {
  const stages = (section.stages ?? [])
    .filter((stage) => Boolean(stage.text?.trim() || stage.image?.url))
    .map(mapWorkStageItem);

  return {
    title: section.title?.trim() || homePageMock.workStages.title,
    stages: stages.length > 0 ? stages : homePageMock.workStages.stages,
  };
}

function mapWhoSuitsItem(item: StrapiWhoSuitsItem, index: number): WhoSuitsItemData {
  const fallbackItem = homePageMock.whoSuits.items[index % homePageMock.whoSuits.items.length];

  return {
    id: String(item.id ?? fallbackItem.id ?? index),
    title: item.title?.trim() || fallbackItem.title,
    text: item.text?.trim() || fallbackItem.text,
    image: resolveMediaUrl(item.image) ?? fallbackItem.image,
    buttonText: item.buttonText?.trim() || fallbackItem.buttonText,
    buttonLink: item.buttonLink?.trim() || fallbackItem.buttonLink,
  };
}

function mapWhoSuits(section: StrapiWhoSuitsSection): WhoSuitsSectionData {
  const items = (section.items ?? [])
    .filter((item) => Boolean(item.title?.trim() || item.text?.trim() || item.image?.url))
    .map(mapWhoSuitsItem);

  return {
    title: section.title?.trim() || homePageMock.whoSuits.title,
    items: items.length > 0 ? items : homePageMock.whoSuits.items,
  };
}

function mapWhyTrustPoint(point: StrapiWhyTrustPoint, index: number): WhyTrustPointData {
  const fallbackPoint = homePageMock.whyTrustUs.points[index % homePageMock.whyTrustUs.points.length];

  return {
    id: String(point.id ?? fallbackPoint.id ?? index),
    text: point.text?.trim() || fallbackPoint.text,
  };
}

function mapWhyTrustGalleryItem(
  item: StrapiWhyTrustGalleryItem,
  index: number,
): WhyTrustGalleryItemData {
  const fallbackItem =
    homePageMock.whyTrustUs.galleryItems[index % homePageMock.whyTrustUs.galleryItems.length];

  return {
    id: String(item.id ?? fallbackItem.id ?? index),
    image: resolveMediaUrl(item.image) ?? fallbackItem.image,
    hoverImage: resolveMediaUrl(item.hoverImage) ?? fallbackItem.hoverImage,
  };
}

function mapWhyTrustUs(section: StrapiWhyTrustUsSection): WhyTrustUsSectionData {
  const points = (section.points ?? [])
    .filter((point) => Boolean(point.text?.trim()))
    .map(mapWhyTrustPoint);
  const galleryItems = (section.galleryItems ?? [])
    .filter((item) => Boolean(item.image?.url || item.hoverImage?.url))
    .map(mapWhyTrustGalleryItem);

  return {
    title: section.title?.trim() || homePageMock.whyTrustUs.title,
    points: points.length > 0 ? points : homePageMock.whyTrustUs.points,
    galleryItems: galleryItems.length > 0 ? galleryItems : homePageMock.whyTrustUs.galleryItems,
  };
}


function mapWhatWeCanMakeItem(item: StrapiMakeItem, index: number): WhatWeCanMakeItemData {
  const fallbackItem = homePageMock.whatWeCanMake.items[index % homePageMock.whatWeCanMake.items.length];

  return {
    id: String(item.id ?? fallbackItem.id ?? index),
    title: item.title?.trim() || fallbackItem.title,
    image: resolveMediaUrl(item.image) ?? fallbackItem.image,
    hoverImage: resolveMediaUrl(item.hoverImage) ?? fallbackItem.hoverImage,
    hoverVideo: resolveMediaUrl(item.hoverVideo) ?? fallbackItem.hoverVideo,
    isActive: item.isActive ?? fallbackItem.isActive,
  };
}

function mapWhatWeCanMake(section: StrapiWhatWeCanMakeSection): WhatWeCanMakeSectionData {
  const items = (section.items ?? [])
    .filter((item) => (item.isActive ?? true) && Boolean(item.title?.trim() || item.image?.url))
    .map(mapWhatWeCanMakeItem);

  return {
    title: section.title?.trim() || homePageMock.whatWeCanMake.title,
    items: items.length > 0 ? items : homePageMock.whatWeCanMake.items,
  };
}
function mapFaqItem(item: StrapiFaqItem, index: number, categoryIndex: number): FaqItemData {
  const fallbackCategory = homePageMock.faq.categories[categoryIndex % homePageMock.faq.categories.length];
  const fallbackItem = fallbackCategory.items[index % fallbackCategory.items.length];

  return {
    id: String(item.id ?? fallbackItem.id ?? `${categoryIndex}-${index}`),
    number: item.number?.trim() || fallbackItem.number,
    question: item.question?.trim() || fallbackItem.question,
    answer: item.answer?.trim() || fallbackItem.answer,
    isActive: item.isActive ?? fallbackItem.isActive,
  };
}

function mapFaqCategory(category: StrapiFaqCategory, index: number): FaqCategoryData {
  const fallbackCategory = homePageMock.faq.categories[index % homePageMock.faq.categories.length];
  const items = (category.items ?? [])
    .filter((item) => (item.isActive ?? true) && Boolean(item.question?.trim()))
    .map((item, itemIndex) => mapFaqItem(item, itemIndex, index));

  return {
    id: String(category.id ?? fallbackCategory.id ?? index),
    title: category.title?.trim() || fallbackCategory.title,
    items: items.length > 0 ? items : fallbackCategory.items,
  };
}

function mapFaqSection(section: StrapiFaqSection): FaqSectionData {
  const categories = (section.categories ?? [])
    .filter((category) => Boolean(category.title?.trim()) || Boolean(category.items?.length))
    .map(mapFaqCategory);

  return {
    bigNumber: section.bigNumber?.trim() || homePageMock.faq.bigNumber,
    title: section.title?.trim() || homePageMock.faq.title,
    description: section.description?.trim() || homePageMock.faq.description,
    categories: categories.length > 0 ? categories : homePageMock.faq.categories,
    ctaTitle: section.ctaTitle?.trim() || homePageMock.faq.ctaTitle,
    ctaText: section.ctaText?.trim() || homePageMock.faq.ctaText,
    ctaButtonText: section.ctaButtonText?.trim() || homePageMock.faq.ctaButtonText,
    ctaButtonLink: section.ctaButtonLink?.trim() || homePageMock.faq.ctaButtonLink,
  };
}
function mapLeadCtaSection(section: StrapiLeadCtaSection): LeadCtaSectionData {
  return {
    title: section.title?.trim() || homePageMock.leadCta.title,
    description: section.description?.trim() || homePageMock.leadCta.description,
    buttonText: section.buttonText?.trim() || homePageMock.leadCta.buttonText,
    buttonLink: section.buttonLink?.trim() || homePageMock.leadCta.buttonLink,
  };
}
function mapFinalBrandSection(section: StrapiFinalBrandSection): FinalBrandSectionData {
  return {
    title: section.title?.trim() || homePageMock.finalBrand.title,
  };
}
function clampPosition(value: number | null | undefined, fallback: number) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  return Math.min(100, Math.max(0, value));
}

function mapCoverageMapReview(
  review: StrapiCoverageMapReview,
  index: number,
): CoverageMapReviewData {
  return {
    id: String(review.id ?? index),
    name: review.name?.trim() || "",
    reviewText: review.reviewText?.trim() || "",
    rating:
      typeof review.rating === "number" && Number.isFinite(review.rating)
        ? Math.min(5, Math.max(1, Math.round(review.rating)))
        : 5,
    avatar: resolveMediaUrl(review.avatar) ?? homePageMock.coverageMap.reviews[0].avatar,
    brandImage: resolveMediaUrl(review.brandImage) ?? undefined,
    xPosition: clampPosition(review.xPosition, 50),
    yPosition: clampPosition(review.yPosition, 50),
    isActive: review.isActive ?? true,
  };
}

function mapCoverageMapSection(section: StrapiCoverageMapSection): CoverageMapSectionData {
  const reviews = (section.reviews ?? [])
    .filter((review) => Boolean(review.name?.trim()) && Boolean(review.reviewText?.trim()))
    .map(mapCoverageMapReview)
    .filter((review) => review.isActive);

  return {
    title: section.title?.trim() || homePageMock.coverageMap.title,
    subtitle: section.subtitle?.trim() || homePageMock.coverageMap.subtitle,
    description: section.description?.trim() || homePageMock.coverageMap.description,
    mapImage: resolveMediaUrl(section.mapImage) ?? homePageMock.coverageMap.mapImage,
    reviews: section.reviews ? reviews : homePageMock.coverageMap.reviews.filter((review) => review.isActive),
  };
}

export async function getHomePage() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiHomePage>>("/api/home-page", {
    params: {
      populate: "*",
    },
  });

  return normalizeSingle(response);
}

export async function getSiteHeader() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiSiteHeader>>("/api/site-header", {
    params: {
      populate: "*",
    },
  });

  return normalizeSingle(response);
}

export async function getBanners() {
  const response = await strapiFetch<StrapiCollectionResponse<StrapiBanner>>("/api/banners", {
    params: {
      "filters[isActive][$eq]": true,
      sort: "order:asc",
      populate: "*",
    },
  });

  return normalizeCollection(response);
}

export async function getWholesaleContractSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiWholesaleContractSection>>(
    "/api/wholesale-contract-section",
    {
      params: {
        populate: "*",
      },
    },
  );

  return normalizeSingle(response);
}

export async function getProsConsSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiProsConsSection>>(
    "/api/pros-cons-section",
    {
      params: {
        populate: "*",
      },
    },
  );

  return normalizeSingle(response);
}

export async function getFormula72SchemeSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiFormula72SchemeSection>>(
    "/api/formula72-scheme-section",
    {
      params: {
        populate: "*",
      },
    },
  );

  return normalizeSingle(response);
}

export async function getMissionK72Section() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiMissionK72Section>>(
    "/api/mission-k72-section",
    {
      params: {
        populate: "*",
      },
    },
  );

  return normalizeSingle(response);
}

export async function getWorkStagesSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiWorkStagesSection>>(
    "/api/work-stages-section",
    {
      params: {
        populate: "*",
      },
    },
  );

  return normalizeSingle(response);
}

export async function getWhoSuitsSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiWhoSuitsSection>>(
    "/api/who-suits-section",
    {
      params: {
        "populate[items][populate]": "image",
      },
    },
  );

  return normalizeSingle(response);
}

export async function getWhyTrustUsSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiWhyTrustUsSection>>(
    "/api/why-trust-us-section",
    {
      params: {
        "populate[points]": "*",
        "populate[galleryItems][populate]": "*",
      },
    },
  );

  return normalizeSingle(response);
}


export async function getWhatWeCanMakeSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiWhatWeCanMakeSection>>(
    "/api/what-we-can-make-section",
    {
      params: {
        "populate[items][populate]": "*",
      },
    },
  );

  return normalizeSingle(response);
}
export async function getFaqSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiFaqSection>>('/api/faq-section', {
    params: {
      'populate[categories][populate][items]': '*',
    },
  });

  return normalizeSingle(response);
}
export async function getLeadCtaSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiLeadCtaSection>>(
    "/api/lead-cta-section",
    {
      params: {
        populate: "*",
      },
    },
  );

  return normalizeSingle(response);
}
export async function getFinalBrandSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiFinalBrandSection>>(
    "/api/final-brand-section",
    {
      params: {
        populate: "*",
      },
    },
  );

  return normalizeSingle(response);
}
export async function getCoverageMapSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiCoverageMapSection>>(
    "/api/coverage-map-section",
    {
      params: {
        populate: "*",
      },
    },
  );

  return normalizeSingle(response);
}

export async function getHomePageData(): Promise<HomePageData> {
  const [
    siteHeaderResult,
    homePageResult,
    bannersResult,
    wholesaleSectionResult,
    prosConsSectionResult,
    formula72SchemeSectionResult,
    missionK72SectionResult,
    workStagesSectionResult,
    whoSuitsSectionResult,
    whyTrustUsSectionResult,
    whatWeCanMakeSectionResult,
    coverageMapSectionResult,
    faqSectionResult,
    leadCtaSectionResult,
    finalBrandSectionResult,
  ] = await Promise.allSettled([
    getSiteHeader(),
    getHomePage(),
    getBanners(),
    getWholesaleContractSection(),
    getProsConsSection(),
    getFormula72SchemeSection(),
    getMissionK72Section(),
    getWorkStagesSection(),
    getWhoSuitsSection(),
    getWhyTrustUsSection(),
    getWhatWeCanMakeSection(),
    getCoverageMapSection(),
    getFaqSection(),
    getLeadCtaSection(),
    getFinalBrandSection(),
  ]);

  const siteHeader = siteHeaderResult.status === "fulfilled" ? siteHeaderResult.value : null;
  const homePage = homePageResult.status === "fulfilled" ? homePageResult.value : null;
  const banners = bannersResult.status === "fulfilled" ? bannersResult.value : [];
  const wholesaleSection =
    wholesaleSectionResult.status === "fulfilled" ? wholesaleSectionResult.value : null;
  const prosConsSection = prosConsSectionResult.status === "fulfilled" ? prosConsSectionResult.value : null;
  const formula72SchemeSection =
    formula72SchemeSectionResult.status === "fulfilled" ? formula72SchemeSectionResult.value : null;
  const missionK72Section =
    missionK72SectionResult.status === "fulfilled" ? missionK72SectionResult.value : null;
  const workStagesSection =
    workStagesSectionResult.status === "fulfilled" ? workStagesSectionResult.value : null;
  const whoSuitsSection =
    whoSuitsSectionResult.status === "fulfilled" ? whoSuitsSectionResult.value : null;
  const whyTrustUsSection =
    whyTrustUsSectionResult.status === "fulfilled" ? whyTrustUsSectionResult.value : null;
  const whatWeCanMakeSection =
    whatWeCanMakeSectionResult.status === "fulfilled" ? whatWeCanMakeSectionResult.value : null;
  const coverageMapSection =
    coverageMapSectionResult.status === "fulfilled" ? coverageMapSectionResult.value : null;
  const faqSection = faqSectionResult.status === "fulfilled" ? faqSectionResult.value : null;
  const leadCtaSection = leadCtaSectionResult.status === "fulfilled" ? leadCtaSectionResult.value : null;
  const finalBrandSection =
    finalBrandSectionResult.status === "fulfilled" ? finalBrandSectionResult.value : null;
  const headerData = siteHeader
    ? mapSiteHeader(siteHeader)
    : {
        siteHeader: homePageMock.siteHeader,
        navigation: homePageMock.navigation.slice(0, 4),
      };

  if (
    siteHeaderResult.status === "rejected" ||
    homePageResult.status === "rejected" ||
    bannersResult.status === "rejected" ||
    wholesaleSectionResult.status === "rejected" ||
    prosConsSectionResult.status === "rejected" ||
    formula72SchemeSectionResult.status === "rejected" ||
    missionK72SectionResult.status === "rejected" ||
    workStagesSectionResult.status === "rejected" ||
    whoSuitsSectionResult.status === "rejected" ||
    whyTrustUsSectionResult.status === "rejected" ||
    whatWeCanMakeSectionResult.status === "rejected" ||
    coverageMapSectionResult.status === "rejected" ||
    faqSectionResult.status === "rejected" ||
    leadCtaSectionResult.status === "rejected" ||
    finalBrandSectionResult.status === "rejected"
  ) {
    console.warn("Strapi data partially unavailable, using mock only for failed sections.", {
      siteHeader: siteHeaderResult.status,
      homePage: homePageResult.status,
      banners: bannersResult.status,
      wholesaleSection: wholesaleSectionResult.status,
      prosConsSection: prosConsSectionResult.status,
      formula72SchemeSection: formula72SchemeSectionResult.status,
      missionK72Section: missionK72SectionResult.status,
      workStagesSection: workStagesSectionResult.status,
      whoSuitsSection: whoSuitsSectionResult.status,
      whyTrustUsSection: whyTrustUsSectionResult.status,
      whatWeCanMakeSection: whatWeCanMakeSectionResult.status,
      coverageMapSection: coverageMapSectionResult.status,
      faqSection: faqSectionResult.status,
      leadCtaSection: leadCtaSectionResult.status,
      finalBrandSection: finalBrandSectionResult.status,
    });
  }

  try {
    const data = {
      siteHeader: headerData.siteHeader,
      navigation: headerData.navigation,
      hero: homePage ? mapHero(homePage) : homePageMock.hero,
      banners: banners.length > 0 ? banners.map(mapBanner) : homePageMock.banners,
      wholesaleContract: wholesaleSection ? mapWholesale(wholesaleSection) : homePageMock.wholesaleContract,
      prosCons: prosConsSection ? mapProsCons(prosConsSection) : homePageMock.prosCons,
      missionK72: missionK72Section ? mapMissionK72(missionK72Section) : homePageMock.missionK72,
      formula72Scheme: formula72SchemeSection
        ? mapFormula72Scheme(formula72SchemeSection)
        : homePageMock.formula72Scheme,
      workStages: workStagesSection ? mapWorkStages(workStagesSection) : homePageMock.workStages,
      whoSuits: whoSuitsSection ? mapWhoSuits(whoSuitsSection) : homePageMock.whoSuits,
      whyTrustUs: whyTrustUsSection ? mapWhyTrustUs(whyTrustUsSection) : homePageMock.whyTrustUs,
      whatWeCanMake: whatWeCanMakeSection ? mapWhatWeCanMake(whatWeCanMakeSection) : homePageMock.whatWeCanMake,
      coverageMap: coverageMapSection
        ? mapCoverageMapSection(coverageMapSection)
        : homePageMock.coverageMap,
      faq: faqSection ? mapFaqSection(faqSection) : homePageMock.faq,
      leadCta: leadCtaSection ? mapLeadCtaSection(leadCtaSection) : homePageMock.leadCta,
      finalBrand: finalBrandSection
        ? mapFinalBrandSection(finalBrandSection)
        : homePageMock.finalBrand,
    };

    if (process.env.NODE_ENV !== "production") {
      console.info("Resolved Strapi media URLs", {
        heroBackgroundImage: data.hero.backgroundImage ?? null,
        bannerImages: data.banners.map((banner) => ({
          id: banner.id,
          image: banner.image,
        })),
        wholesaleBackgroundImage: data.wholesaleContract.backgroundImage,
        missionK72Images: {
          leftMainImage: data.missionK72.leftMainImage,
          items: data.missionK72.items.map((item) => ({
            title: item.title,
            image: item.image,
          })),
        },
        formula72SchemeImage: data.formula72Scheme.image,
        workStageImages: data.workStages.stages.map((stage) => ({
          id: stage.id,
          image: stage.image,
        })),
        whoSuitsImages: data.whoSuits.items.map((item) => ({
          id: item.id,
          image: item.image,
        })),
        whyTrustUsImages: data.whyTrustUs.galleryItems.map((item) => ({
          id: item.id,
          image: item.image,
          hoverImage: item.hoverImage ?? null,
        })),
        whatWeCanMakeImages: data.whatWeCanMake.items.map((item) => ({
          id: item.id,
          image: item.image,
          hoverImage: item.hoverImage ?? null,
          hoverVideo: item.hoverVideo ?? null,
        })),
        coverageMap: {
          mapImage: data.coverageMap.mapImage,
          reviews: data.coverageMap.reviews.map((review) => ({
            id: review.id,
            avatar: review.avatar,
            brandImage: review.brandImage ?? null,
          })),
        },
      });
    }

    return data;
  } catch (error) {
    console.warn("Falling back to mock home page data:", error);
    return homePageMock;
  }
}


