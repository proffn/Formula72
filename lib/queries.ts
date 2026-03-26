import { getStrapiMediaUrl, strapiFetch } from "@/lib/api";
import { homePageMock } from "@/lib/mock/home";
import type {
  BannerItem,
  BannerTextPosition,
  Formula72SchemeSectionData,
  HomePageData,
  NavItem,
  ProsConsSectionData,
  SiteHeaderContent,
  WholesaleSectionData,
  WorkStageItemData,
  WorkStagesSectionData,
} from "@/types/home";
import type {
  StrapiBanner,
  StrapiCollectionResponse,
  StrapiFormula72SchemeSection,
  StrapiHomePage,
  StrapiProsConsSection,
  StrapiSiteHeader,
  StrapiSingleResponse,
  StrapiTextItem,
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
    image: getStrapiMediaUrl(banner.image?.url) ?? homePageMock.banners[index % homePageMock.banners.length].image,
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
    backgroundImage: getStrapiMediaUrl(homePage.heroBackgroundImage?.url) ?? homePageMock.hero.backgroundImage,
  };
}

function mapSiteHeader(siteHeader: StrapiSiteHeader): {
  siteHeader: SiteHeaderContent;
  navigation: NavItem[];
} {
  return {
    siteHeader: {
      logoImage: getStrapiMediaUrl(siteHeader.logoImage?.url) ?? homePageMock.siteHeader.logoImage,
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
      getStrapiMediaUrl(section.backgroundImage?.url) ?? homePageMock.wholesaleContract.backgroundImage,
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
    image: getStrapiMediaUrl(section.image?.url) ?? homePageMock.formula72Scheme.image,
  };
}

function mapWorkStageItem(stage: StrapiWorkStageItem, index: number): WorkStageItemData {
  const fallbackStage = homePageMock.workStages.stages[index % homePageMock.workStages.stages.length];

  return {
    id: String(stage.id ?? fallbackStage.id ?? index),
    text: stage.text?.trim() || fallbackStage.text,
    image: getStrapiMediaUrl(stage.image?.url) ?? fallbackStage.image,
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

export async function getHomePageData(): Promise<HomePageData> {
  const [
    siteHeaderResult,
    homePageResult,
    bannersResult,
    wholesaleSectionResult,
    prosConsSectionResult,
    formula72SchemeSectionResult,
    workStagesSectionResult,
  ] = await Promise.allSettled([
    getSiteHeader(),
    getHomePage(),
    getBanners(),
    getWholesaleContractSection(),
    getProsConsSection(),
    getFormula72SchemeSection(),
    getWorkStagesSection(),
  ]);

  const siteHeader = siteHeaderResult.status === "fulfilled" ? siteHeaderResult.value : null;
  const homePage = homePageResult.status === "fulfilled" ? homePageResult.value : null;
  const banners = bannersResult.status === "fulfilled" ? bannersResult.value : [];
  const wholesaleSection =
    wholesaleSectionResult.status === "fulfilled" ? wholesaleSectionResult.value : null;
  const prosConsSection = prosConsSectionResult.status === "fulfilled" ? prosConsSectionResult.value : null;
  const formula72SchemeSection =
    formula72SchemeSectionResult.status === "fulfilled" ? formula72SchemeSectionResult.value : null;
  const workStagesSection =
    workStagesSectionResult.status === "fulfilled" ? workStagesSectionResult.value : null;
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
    workStagesSectionResult.status === "rejected"
  ) {
    console.warn("Strapi data partially unavailable, using mock only for failed sections.", {
      siteHeader: siteHeaderResult.status,
      homePage: homePageResult.status,
      banners: bannersResult.status,
      wholesaleSection: wholesaleSectionResult.status,
      prosConsSection: prosConsSectionResult.status,
      formula72SchemeSection: formula72SchemeSectionResult.status,
      workStagesSection: workStagesSectionResult.status,
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
      formula72Scheme: formula72SchemeSection
        ? mapFormula72Scheme(formula72SchemeSection)
        : homePageMock.formula72Scheme,
      workStages: workStagesSection ? mapWorkStages(workStagesSection) : homePageMock.workStages,
    };

    if (process.env.NODE_ENV !== "production") {
      console.info("Resolved Strapi media URLs", {
        heroBackgroundImage: data.hero.backgroundImage ?? null,
        bannerImages: data.banners.map((banner) => ({
          id: banner.id,
          image: banner.image,
        })),
        wholesaleBackgroundImage: data.wholesaleContract.backgroundImage,
        formula72SchemeImage: data.formula72Scheme.image,
        workStageImages: data.workStages.stages.map((stage) => ({
          id: stage.id,
          image: stage.image,
        })),
      });
    }

    return data;
  } catch (error) {
    console.warn("Falling back to mock home page data:", error);
    return homePageMock;
  }
}
