import { getStrapiBaseUrl, getStrapiMediaUrl, strapiFetch } from "@/lib/api";
import { aboutPageMock } from "@/lib/mock/about";
import { certificatesPageMock } from "@/lib/mock/certificates";
import { homePageMock } from "@/lib/mock/home";
import { termsPageMock } from "@/lib/mock/terms";
import homePageSnapshot from "@/lib/mock/home.snapshot.json";
import type {
  AboutPageData,
  AboutPartnerCardData,
  AboutStoreLinkData,
  AboutValueCardData,
  AboutWhyItemData,
} from "@/types/about";
import type { CertificateItemData, CertificatesPageData } from "@/types/certificates";
import type { TermsPageData, TermsSectionData } from "@/types/terms";
import type {
  BannerSectionData,
  BannerSlideData,
  CoverageMapReviewData,
  CoverageMapSectionData,
  FloatingContactData,
  FloatingContactItemData,
  FooterData,
  FooterLinkData,
  FooterSocialLinkData,
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
  StrapiAboutPage,
  StrapiAboutPartnerCard,
  StrapiAboutStoreLink,
  StrapiAboutValueCard,
  StrapiAboutWhyItem,
  StrapiBanner,
  StrapiCertificateItem,
  StrapiCertificatesPage,
  StrapiCollectionResponse,
  StrapiCoverageMapReview,
  StrapiCoverageMapSection,
  StrapiFloatingContactItem,
  StrapiFloatingContactSection,
  StrapiFooterLink,
  StrapiFooterSection,
  StrapiFooterSocialLink,
  StrapiFaqCategory,
  StrapiFaqItem,
  StrapiFaqSection,
  StrapiFinalBrandSection,
  StrapiFormula72SchemeItem,
  StrapiFormula72SchemeSection,
  StrapiHomePage,
  StrapiLeadCtaSection,
  StrapiMissionK72Section,
  StrapiProsConsSection,
  StrapiProductionVideoPage,
  StrapiSiteHeader,
  StrapiSingleResponse,
  StrapiRichTextNode,
  StrapiTextValue,
  StrapiTextItem,
  StrapiTermsPage,
  StrapiTermsSection,
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

const navigationHrefs = [
  "/about",
  "/production",
  "https://b24-k8i1gh.bitrix24site.ru/crm_form_cw6nx/?utm_source=website_contract72",
  "/#coverage-map",
] as const;
const snapshotResponses = homePageSnapshot.responses ?? {};
const snapshotSourceSymbol: unique symbol = Symbol("snapshotSource");

type SnapshotMarkedValue = {
  [snapshotSourceSymbol]?: true;
};

function markSnapshotValue<T>(value: T): T {
  if (!value || typeof value !== "object") {
    return value;
  }

  const record = value as SnapshotMarkedValue & Record<string, unknown>;

  if (record[snapshotSourceSymbol]) {
    return value;
  }

  Object.defineProperty(record, snapshotSourceSymbol, {
    value: true,
    enumerable: false,
  });

  Object.values(record).forEach(markSnapshotValue);

  return value;
}

function isSnapshotValue(value: unknown): boolean {
  return Boolean(value && typeof value === "object" && (value as SnapshotMarkedValue)[snapshotSourceSymbol]);
}

function normalizeNavigationHref(value: string | null | undefined, fallback: string) {
  const href = value?.trim() || fallback;

  if (fallback === "/about" && (href === "#hero" || href === "/#hero")) {
    return "/about";
  }

  if (href === "#hero") {
    return href;
  }

  if (href.startsWith("#")) {
    return `/${href}`;
  }

  return href;
}

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

function getSnapshotSingle<T>(key: string): T | null {
  const response = snapshotResponses[key as keyof typeof snapshotResponses];

  if (!response) {
    return null;
  }

  return markSnapshotValue(normalizeSingle(response as StrapiSingleResponse<T | { attributes?: T }>));
}

function getSnapshotCollection<T>(key: string): T[] {
  const response = snapshotResponses[key as keyof typeof snapshotResponses] as unknown as
    | StrapiCollectionResponse<T>
    | undefined;

  return markSnapshotValue(response?.data ?? []);
}

function getSnapshotBannerSectionData() {
  const banners = getSnapshotCollection<StrapiBanner>("banners");

  if (banners.length === 0) {
    return null;
  }

  return mapBannerSection(banners);
}

function resolveMediaUrl(
  media:
    | { url?: string | null; data?: { url?: string | null; attributes?: { url?: string | null } | null } | null }
    | null
    | undefined,
  options: { preferLocalUploads?: boolean } = {},
) {
  const preferLocalUploads =
    options.preferLocalUploads ||
    isSnapshotValue(media) ||
    isSnapshotValue(media?.data) ||
    isSnapshotValue(media?.data?.attributes);
  const directUrl = media?.url;

  if (directUrl) {
    if (preferLocalUploads && directUrl.startsWith("/uploads/")) {
      return directUrl;
    }

    return getStrapiMediaUrl(directUrl);
  }

  const nestedUrl = media?.data?.url ?? media?.data?.attributes?.url;
  if (preferLocalUploads && nestedUrl?.startsWith("/uploads/")) {
    return nestedUrl;
  }

  return getStrapiMediaUrl(nestedUrl);
}

function resolveAboutMediaUrl(
  media:
    | { url?: string | null; data?: { url?: string | null; attributes?: { url?: string | null } | null } | null }
    | null
    | undefined,
) {
  const preferLocalUploads =
    isSnapshotValue(media) || isSnapshotValue(media?.data) || isSnapshotValue(media?.data?.attributes);
  const url = media?.url ?? media?.data?.url ?? media?.data?.attributes?.url;

  if (url?.startsWith("/uploads/")) {
    return url;
  }

  return getStrapiMediaUrl(url);
}

function resolveMediaAspectRatio(
  media:
    | {
        width?: number | null;
        height?: number | null;
        data?:
          | {
              width?: number | null;
              height?: number | null;
              attributes?: { width?: number | null; height?: number | null } | null;
            }
          | null;
      }
    | null
    | undefined,
) {
  const width = media?.width ?? media?.data?.width ?? media?.data?.attributes?.width;
  const height = media?.height ?? media?.data?.height ?? media?.data?.attributes?.height;

  if (!width || !height) {
    return null;
  }

  return `${width} / ${height}`;
}

function mapBanner(
  banner: StrapiBanner,
  index: number,
): BannerSlideData {
  const fallback =
    homePageMock.bannerSection.banners.find((item) => item.order === banner.order) ??
    homePageMock.bannerSection.banners[index % homePageMock.bannerSection.banners.length];
  const resolvedDesktopImage = resolveMediaUrl(banner.image) ?? fallback.image ?? "";
  const resolvedMobileImage =
    resolveMediaUrl(banner.mobileImage) ??
    fallback.mobileImage ??
    resolvedDesktopImage ??
    undefined;
  const derivedContentAlign =
    banner.contentAlign ??
    (banner.textPosition === "right-center" ? "right" : fallback.contentAlign);
  const derivedVerticalAlign =
    banner.contentVerticalAlign ??
    (banner.textPosition === "right-center" ? "center" : fallback.contentVerticalAlign);
  const derivedTextColor =
    banner.textColor ??
    (banner.textPosition === "right-center" ? "light" : fallback.textColor);

  return {
    id: String(banner.id ?? fallback.id ?? index),
    title: banner.title?.trim() || fallback.title,
    subtitle: banner.subtitle?.trim() || fallback.subtitle,
    description: banner.description?.trim() || fallback.description,
    image: resolvedDesktopImage,
    mobileImage: resolvedMobileImage,
    mobileAspectRatio:
      resolveMediaAspectRatio(banner.mobileImage) ??
      fallback.mobileAspectRatio ??
      resolveMediaAspectRatio(banner.image) ??
      undefined,
    enabled: banner.isActive ?? banner.enabled ?? fallback.enabled,
    order:
      typeof banner.order === "number" && Number.isFinite(banner.order)
        ? banner.order
        : fallback.order,
    contentAlign: derivedContentAlign,
    contentVerticalAlign: derivedVerticalAlign,
    textMaxWidth: banner.textMaxWidth?.trim() || fallback.textMaxWidth,
    buttonLabel: banner.buttonLabel?.trim() || fallback.buttonLabel,
    buttonHref: banner.buttonHref?.trim() || fallback.buttonHref,
    textColor: derivedTextColor,
  };
}

function mapBannerSection(banners: StrapiBanner[] | null): BannerSectionData {
  const collectionBanners = (banners ?? [])
    .filter((banner) => (banner.isActive ?? banner.enabled ?? true) && Boolean(banner.title?.trim() || banner.image?.url))
    .sort((left, right) => {
      const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return (left.title ?? "").localeCompare(right.title ?? "", "ru");
    })
    .map(mapBanner)
    .sort((left, right) => {
      const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return left.title.localeCompare(right.title, "ru");
    });

  return {
    enabled: homePageMock.bannerSection.enabled,
    autoplayDelay: homePageMock.bannerSection.autoplayDelay,
    banners:
      collectionBanners.length > 0
        ? collectionBanners
        : homePageMock.bannerSection.banners,
  };
}

function mapHero(homePage: StrapiHomePage) {
  return {
    lines: [
      homePage.heroTitleLine1 || homePageMock.hero.lines[0],
      homePage.heroTitleLine2 || homePageMock.hero.lines[1],
      homePage.heroTitleLine3 || homePageMock.hero.lines[2],
    ] as [string, string, string],
    brand: homePage.heroSubtitle || homePageMock.hero.brand,
    backgroundImage: resolveMediaUrl(homePage.heroBackgroundImage) ?? homePageMock.hero.backgroundImage,
    mobileBackgroundImage:
      resolveMediaUrl(homePage.heroMobileBackgroundImage) ??
      homePageMock.hero.mobileBackgroundImage,
  };
}

function mapSiteHeader(siteHeader: StrapiSiteHeader): {
  siteHeader: SiteHeaderContent;
  navigation: NavItem[];
} {
  return {
    siteHeader: {
      logoImage: resolveMediaUrl(siteHeader.logoImage) ?? homePageMock.siteHeader.logoImage,
      burgerMenuLogo: resolveMediaUrl(siteHeader.burgerMenuLogo) ?? homePageMock.siteHeader.burgerMenuLogo,
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
      href: normalizeNavigationHref(
        [
          siteHeader.navAboutHref,
          siteHeader.navProductionHref,
          siteHeader.navWholesaleHref,
          siteHeader.navReviewsHref,
        ][index],
        navigationHrefs[index],
      ),
    })),
  };
}

export type ProductionVideoPageData = {
  title: string;
  description: string;
  videoUrl: string;
  posterImage?: string;
};

export function mapProductionVideoPage(section?: StrapiProductionVideoPage | null): ProductionVideoPageData {
  return {
    title: section?.title?.trim() || "Производство Formula72",
    description:
      section?.description?.trim() ||
      "Посмотрите, как устроено контрактное производство Formula72: лаборатория, разработка, фасовка и подготовка продукции к отгрузке.",
    videoUrl: resolveMediaUrl(section?.videoFile) ?? "/videos/production.mp4",
    posterImage: resolveMediaUrl(section?.posterImage) ?? undefined,
  };
}

function normalizeTextValue(value: StrapiTextValue, fallback = "") {
  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  if (!Array.isArray(value)) {
    return fallback;
  }

  const readNode = (node: StrapiRichTextNode): string => {
    if (typeof node.text === "string") {
      return node.text;
    }

    if (Array.isArray(node.children)) {
      return node.children.map((child) => readNode(child)).join("");
    }

    return "";
  };

  const normalized = value
    .map((node) => readNode(node))
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");

  return normalized || fallback;
}

function sortByOrder<T extends { order?: number; title: string }>(items: T[]) {
  return [...items].sort((firstItem, secondItem) => {
    const firstOrder = typeof firstItem.order === "number" ? firstItem.order : Number.MAX_SAFE_INTEGER;
    const secondOrder = typeof secondItem.order === "number" ? secondItem.order : Number.MAX_SAFE_INTEGER;

    if (firstOrder !== secondOrder) {
      return firstOrder - secondOrder;
    }

    return firstItem.title.localeCompare(secondItem.title, "ru");
  });
}

function mapAboutValueCard(item: StrapiAboutValueCard, fallback: AboutValueCardData): AboutValueCardData {
  return {
    title: item.title?.trim() ?? "",
    description: normalizeTextValue(item.description),
    highlightText: item.highlightText?.trim() || undefined,
    icon: resolveAboutMediaUrl(item.icon) ?? "",
    order: typeof item.order === "number" ? item.order : fallback.order,
    enabled: item.enabled ?? true,
  };
}

function mapAboutWhyItem(item: StrapiAboutWhyItem, fallback: AboutWhyItemData): AboutWhyItemData {
  return {
    title: item.title?.trim() ?? "",
    label: item.label?.trim() || undefined,
    value: item.value?.trim() ?? "",
    description: normalizeTextValue(item.description),
    linkLabel: item.linkLabel?.trim() || undefined,
    linkHref: item.linkHref?.trim() || undefined,
    order: typeof item.order === "number" ? item.order : fallback.order,
    enabled: item.enabled ?? true,
  };
}

function mapAboutStoreLink(item: StrapiAboutStoreLink, fallback: AboutStoreLinkData): AboutStoreLinkData {
  return {
    title: item.title?.trim() ?? "",
    logo: resolveAboutMediaUrl(item.logo) ?? "",
    href: item.href?.trim() ?? "",
    order: typeof item.order === "number" ? item.order : fallback.order,
    enabled: item.enabled ?? true,
  };
}

function mapAboutPartnerCard(item: StrapiAboutPartnerCard, fallback: AboutPartnerCardData): AboutPartnerCardData {
  const fallbackStores = fallback.stores.length > 0 ? fallback.stores : aboutPageMock.partners[0].stores;
  const stores =
    Array.isArray(item.stores)
      ? item.stores.map((store, index) => mapAboutStoreLink(store, fallbackStores[index % fallbackStores.length]))
      : [];

  return {
    title: item.title?.trim() ?? "",
    logo: resolveAboutMediaUrl(item.logo) ?? "",
    stores: sortByOrder(stores.filter((store) => store.enabled && Boolean(store.title.trim()))),
    order: typeof item.order === "number" ? item.order : fallback.order,
    enabled: item.enabled ?? true,
  };
}

function hasAboutPageContent(section: StrapiAboutPage) {
  return Boolean(
    section.title?.trim() ||
      section.subtitle?.trim() ||
      section.logo ||
      section.mobileLogo ||
      section.valuesTitle?.trim() ||
      (Array.isArray(section.values) && section.values.length > 0) ||
      section.missionTitle?.trim() ||
      normalizeTextValue(section.missionText) ||
      section.whyTitle?.trim() ||
      (Array.isArray(section.whyItems) && section.whyItems.length > 0) ||
      (Array.isArray(section.partners) && section.partners.length > 0),
  );
}

export function mapAboutPage(section?: StrapiAboutPage | null): AboutPageData {
  if (!section || !hasAboutPageContent(section)) {
    return aboutPageMock;
  }

  const values =
    Array.isArray(section.values)
      ? section.values.map((item, index) =>
          mapAboutValueCard(item, aboutPageMock.values[index % aboutPageMock.values.length]),
        )
      : [];
  const whyItems =
    Array.isArray(section.whyItems)
      ? section.whyItems.map((item, index) =>
          mapAboutWhyItem(item, aboutPageMock.whyItems[index % aboutPageMock.whyItems.length]),
        )
      : [];
  const partners =
    Array.isArray(section.partners)
      ? section.partners.map((item, index) =>
          mapAboutPartnerCard(item, aboutPageMock.partners[index % aboutPageMock.partners.length]),
        )
      : [];

  return {
    enabled: section.enabled ?? true,
    title: section.title?.trim() ?? "",
    subtitle: section.subtitle?.trim() ?? "",
    logo: resolveAboutMediaUrl(section.logo) ?? aboutPageMock.logo,
    mobileLogo: resolveAboutMediaUrl(section.mobileLogo) ?? resolveAboutMediaUrl(section.logo) ?? aboutPageMock.mobileLogo,
    backButtonLabel: section.backButtonLabel?.trim() ?? "",
    backButtonHref: section.backButtonHref?.trim() ?? "",
    valuesTitle: section.valuesTitle?.trim() ?? "",
    values: sortByOrder(values.filter((item) => item.enabled && Boolean(item.title.trim()))),
    missionTitle: section.missionTitle?.trim() ?? "",
    missionText: normalizeTextValue(section.missionText),
    missionImage: resolveAboutMediaUrl(section.missionImage) ?? "",
    whyTitle: section.whyTitle?.trim() ?? "",
    whyItems: sortByOrder(whyItems.filter((item) => item.enabled && Boolean(item.title.trim()))),
    partners: sortByOrder(partners.filter((item) => item.enabled && Boolean(item.title.trim()))),
  };
}

function mapTermsSection(
  section: StrapiTermsSection,
  fallback: TermsSectionData,
  index: number,
): TermsSectionData {
  return {
    id: String(section.id ?? fallback.id ?? index),
    title: section.title?.trim() || fallback.title,
    content: normalizeTextValue(section.content, fallback.content),
    image: resolveMediaUrl(section.image) ?? fallback.image,
    buttonLabel: section.buttonLabel?.trim() || fallback.buttonLabel,
    buttonHref: section.buttonHref?.trim() || fallback.buttonHref,
    order:
      typeof section.order === "number" && Number.isFinite(section.order)
        ? section.order
        : fallback.order,
    enabled: section.enabled ?? fallback.enabled,
  };
}

export function mapTermsPage(page?: StrapiTermsPage | null): TermsPageData {
  if (!page) {
    return termsPageMock;
  }

  const sections =
    page.sections && page.sections.length > 0
      ? page.sections.map((section, index) =>
          mapTermsSection(section, termsPageMock.sections[index % termsPageMock.sections.length], index),
        )
      : termsPageMock.sections;

  return {
    enabled: page.enabled ?? termsPageMock.enabled,
    title: page.title?.trim() || termsPageMock.title,
    sections: sortByOrder(sections.filter((section) => section.enabled && Boolean(section.title.trim()))),
  };
}

function mapCertificateItem(
  item: StrapiCertificateItem,
  fallback: CertificateItemData,
  index: number,
): CertificateItemData {
  const title = item.title?.trim() || fallback.title;

  return {
    id: String(item.id ?? fallback.id ?? index),
    title,
    alt: item.alt?.trim() || title || fallback.alt,
    image: resolveMediaUrl(item.image) ?? fallback.image,
    order:
      typeof item.order === "number" && Number.isFinite(item.order)
        ? item.order
        : fallback.order,
    enabled: item.enabled ?? fallback.enabled,
  };
}

export function mapCertificatesPage(page?: StrapiCertificatesPage | null): CertificatesPageData {
  if (!page) {
    return certificatesPageMock;
  }

  const certificates =
    page.certificates && page.certificates.length > 0
      ? page.certificates.map((item, index) =>
          mapCertificateItem(
            item,
            certificatesPageMock.certificates[index % certificatesPageMock.certificates.length],
            index,
          ),
        )
      : certificatesPageMock.certificates;

  return {
    enabled: page.enabled ?? certificatesPageMock.enabled,
    title: page.title?.trim() || certificatesPageMock.title,
    description: normalizeTextValue(page.description, certificatesPageMock.description),
    buttonLabel: page.buttonLabel?.trim() || certificatesPageMock.buttonLabel,
    buttonHref: page.buttonHref?.trim() || certificatesPageMock.buttonHref,
    certificates: sortByOrder(
      certificates.filter((item) => item.enabled && Boolean(item.image.trim())),
    ),
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
      MobileImage:
        resolveMediaUrl(section.OptMobileImage) ??
        homePageMock.wholesaleContract.left.MobileImage,
    },
    right: {
      lines: splitTitle(section.rightTitle, homePageMock.wholesaleContract.right.lines),
      action: {
        label: section.rightButtonText,
        href: section.rightButtonLink,
      },
      MobileImage:
        resolveMediaUrl(section.ContractMobileImage) ??
        homePageMock.wholesaleContract.right.MobileImage,
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
      buttonText: section.leftButtonText?.trim() || homePageMock.prosCons.leftColumn.buttonText,
      buttonLink: section.leftButtonLink?.trim() || homePageMock.prosCons.leftColumn.buttonLink,
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
      buttonText: section.rightButtonText?.trim() || homePageMock.prosCons.rightColumn.buttonText,
      buttonLink: section.rightButtonLink?.trim() || homePageMock.prosCons.rightColumn.buttonLink,
    },
  };
}

function mapFormula72SchemeItem(
  item: StrapiFormula72SchemeItem,
  index: number,
  options: { preferLocalUploads?: boolean } = {},
): Formula72SchemeSectionData["items"][number] {
  const fallback = homePageMock.formula72Scheme.items[index % homePageMock.formula72Scheme.items.length];

  return {
    title: item.title?.trim() || fallback.title,
    description: item.description?.trim() || fallback.description,
    mobileImage: resolveMediaUrl(item.mobileImage, options) ?? fallback.mobileImage,
  };
}

function mapFormula72SchemeItems(
  items: StrapiFormula72SchemeItem[] | null | undefined,
  options: { preferLocalUploads?: boolean } = {},
): Formula72SchemeSectionData["items"] {
  const mappedItems = (items ?? [])
    .filter((item) => Boolean(item.title?.trim() || item.description?.trim() || item.mobileImage?.url))
    .slice(0, 3)
    .map((item, index) => mapFormula72SchemeItem(item, index, options));

  return homePageMock.formula72Scheme.items.map(
    (fallback, index) => mappedItems[index] ?? fallback,
  ) as Formula72SchemeSectionData["items"];
}

function mapFormula72Scheme(
  section: StrapiFormula72SchemeSection,
  options: { preferLocalUploads?: boolean } = {},
): Formula72SchemeSectionData {
  return {
    title: section.title?.trim() || homePageMock.formula72Scheme.title,
    image: resolveMediaUrl(section.image, options) ?? homePageMock.formula72Scheme.image,
    items: mapFormula72SchemeItems(section.items, options),
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
  const stageNumber =
    typeof stage.number === "number" ? String(stage.number) : stage.number?.trim();

  return {
    id: String(stage.id ?? fallbackStage.id ?? index),
    number: stageNumber || fallbackStage.number || String(index + 1),
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
  const brandLinks = (section.brandLinks ?? [])
    .filter((link) => Boolean(link.label?.trim()) && Boolean(link.href?.trim()))
    .map((link, index) =>
      mapFooterLink(
        link,
        homePageMock.whyTrustUs.brandLinks[index % homePageMock.whyTrustUs.brandLinks.length],
      ),
    );

  return {
    title: section.title?.trim() || homePageMock.whyTrustUs.title,
    speedTitle: section.speedTitle?.trim() || homePageMock.whyTrustUs.speedTitle,
    speedFormulaLabel:
      section.speedFormulaLabel?.trim() || homePageMock.whyTrustUs.speedFormulaLabel,
    speedText: section.speedText?.trim() || homePageMock.whyTrustUs.speedText,
    speedFulfillmentText:
      section.speedFulfillmentText?.trim() || homePageMock.whyTrustUs.speedFulfillmentText,
    availabilityTitle:
      section.availabilityTitle?.trim() || homePageMock.whyTrustUs.availabilityTitle,
    availabilityText: section.availabilityText?.trim() || homePageMock.whyTrustUs.availabilityText,
    availabilityNote: section.availabilityNote?.trim() || homePageMock.whyTrustUs.availabilityNote,
    professionalismTitle:
      section.professionalismTitle?.trim() || homePageMock.whyTrustUs.professionalismTitle,
    professionalismText:
      section.professionalismText?.trim() || homePageMock.whyTrustUs.professionalismText,
    brandLinks: brandLinks.length > 0 ? brandLinks : homePageMock.whyTrustUs.brandLinks,
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
    buttonText: item.buttonText?.trim() || fallbackItem.buttonText || "Получить прайс",
    buttonLink:
      item.buttonLink?.trim() ||
      fallbackItem.buttonLink ||
      "https://b24-2uwhq2.bitrix24site.ru/?utm_source=website_contract72",
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

function mapFloatingContactItem(
  item: StrapiFloatingContactItem,
  index: number,
): FloatingContactItemData {
  const fallback =
    homePageMock.floatingContact.items[index % homePageMock.floatingContact.items.length];

  return {
    label: item.label?.trim() || fallback.label,
    href: item.href?.trim() || fallback.href,
    enabled: item.enabled ?? fallback.enabled,
    order:
      typeof item.order === "number" && Number.isFinite(item.order)
        ? item.order
        : fallback.order,
    icon: resolveMediaUrl(item.icon) ?? fallback.icon,
    hoverIcon:
      resolveMediaUrl(item.hoverIcon) ??
      resolveMediaUrl(item.icon) ??
      fallback.hoverIcon ??
      fallback.icon,
  };
}

function mapFloatingContactSection(section: StrapiFloatingContactSection): FloatingContactData {
  const items = (section.items ?? [])
    .filter((item) => Boolean(item.label?.trim()))
    .map(mapFloatingContactItem)
    .sort((left, right) => {
      const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return left.label.localeCompare(right.label, "ru");
    });

  return {
    enabled: section.enabled ?? homePageMock.floatingContact.enabled,
    buttonLabel: section.buttonLabel?.trim() || homePageMock.floatingContact.buttonLabel,
    items: items.length > 0 ? items : homePageMock.floatingContact.items,
    showScrollTop: section.showScrollTop ?? homePageMock.floatingContact.showScrollTop,
  };
}
function clampPosition(value: number | null | undefined, fallback: number) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  return Math.min(100, Math.max(0, value));
}

function mapFooterLink(link: StrapiFooterLink, fallback: FooterLinkData): FooterLinkData {
  const label = link.label?.trim() || fallback.label;
  const href =
    label === "Условия"
      ? "/terms"
      : label === "Сертификаты"
        ? "/certificates"
        : link.href?.trim() || fallback.href;

  return {
    label,
    href,
  };
}

function mapFooterSocialLink(
  link: StrapiFooterSocialLink,
  fallback: FooterSocialLinkData,
): FooterSocialLinkData {
  return {
    label: link.label?.trim() || fallback.label,
    href: link.href?.trim() || fallback.href,
    enabled: link.enabled ?? fallback.enabled,
    icon: resolveMediaUrl(link.icon) ?? fallback.icon,
    hoverIcon: resolveMediaUrl(link.hoverIcon) ?? resolveMediaUrl(link.icon) ?? fallback.hoverIcon ?? fallback.icon,
  };
}

function mapFooterSection(section: StrapiFooterSection): FooterData {
  const companyLinks = (section.companyLinks ?? [])
    .filter((link) => Boolean(link.label?.trim()) && Boolean(link.href?.trim()))
    .map((link, index) =>
      mapFooterLink(link, homePageMock.footer.companyLinks[index % homePageMock.footer.companyLinks.length]),
    );

  const documentLinks = (section.documentLinks ?? [])
    .filter((link) => Boolean(link.label?.trim()) && Boolean(link.href?.trim()))
    .map((link, index) =>
      mapFooterLink(link, homePageMock.footer.documentLinks[index % homePageMock.footer.documentLinks.length]),
    );

  const socialLinks = (section.socialLinks ?? [])
    .filter((link) => Boolean(link.label?.trim() || link.icon?.url || link.href?.trim()) && (link.enabled ?? true))
    .map((link, index) =>
      mapFooterSocialLink(link, homePageMock.footer.socialLinks[index % homePageMock.footer.socialLinks.length]),
    );

  return {
    contactsColumnTitle: section.contactsColumnTitle?.trim() || homePageMock.footer.contactsColumnTitle,
    consultationTitle: section.consultationTitle?.trim() || homePageMock.footer.consultationTitle,
    consultationPhone: section.consultationPhone?.trim() || homePageMock.footer.consultationPhone,
    consultationEmail: section.consultationEmail?.trim() || homePageMock.footer.consultationEmail,
    procurementTitle: section.procurementTitle?.trim() || homePageMock.footer.procurementTitle,
    procurementEmail: section.procurementEmail?.trim() || homePageMock.footer.procurementEmail,
    marketingTitle: section.marketingTitle?.trim() || homePageMock.footer.marketingTitle,
    marketingEmail: section.marketingEmail?.trim() || homePageMock.footer.marketingEmail,
    workingHours: section.workingHours?.trim() || homePageMock.footer.workingHours,
    companyColumnTitle: section.companyColumnTitle?.trim() || homePageMock.footer.companyColumnTitle,
    companyLinks: companyLinks.length > 0 ? companyLinks : homePageMock.footer.companyLinks,
    documentsColumnTitle: section.documentsColumnTitle?.trim() || homePageMock.footer.documentsColumnTitle,
    documentLinks: documentLinks.length > 0 ? documentLinks : homePageMock.footer.documentLinks,
    formButtonText: section.formButtonText?.trim() || homePageMock.footer.formButtonText,
    formButtonLink: section.formButtonLink?.trim() || homePageMock.footer.formButtonLink,
    socialLinks: section.socialLinks ? socialLinks : homePageMock.footer.socialLinks,
  };
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

export async function getProductionVideoPage() {
  try {
    const response = await strapiFetch<StrapiSingleResponse<StrapiProductionVideoPage>>(
      "/api/production-video-page",
      {
        params: {
          populate: "*",
        },
      },
    );

    return normalizeSingle(response) ?? getSnapshotSingle<StrapiProductionVideoPage>("productionVideo");
  } catch {
    return getSnapshotSingle<StrapiProductionVideoPage>("productionVideo");
  }
}

const aboutPagePopulateParams = {
  "populate[logo]": true,
  "populate[mobileLogo]": true,
  "populate[values][populate]": "icon",
  "populate[missionImage]": true,
  "populate[whyItems]": true,
  "populate[partners][populate][logo]": true,
  "populate[partners][populate][stores][populate]": "logo",
} as const;

function getAboutPageRequestUrl() {
  const baseUrl = getStrapiBaseUrl();
  const params = new URLSearchParams();

  Object.entries(aboutPagePopulateParams).forEach(([key, value]) => {
    params.append(key, String(value));
  });

  return `${baseUrl ?? ""}/api/about-page?${params.toString()}`;
}

function logAboutPageResolution(
  source: "strapi" | "snapshot" | "empty",
  section: StrapiAboutPage | null,
  reason?: unknown,
) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.info("[about-page] CMS resolution", {
    url: getAboutPageRequestUrl(),
    source,
    reason: reason instanceof Error ? reason.message : reason ?? null,
    hasData: Boolean(section),
    enabled: section?.enabled ?? null,
    title: section?.title ?? null,
    counts: {
      values: section?.values?.length ?? 0,
      whyItems: section?.whyItems?.length ?? 0,
      partners: section?.partners?.length ?? 0,
      stores:
        section?.partners?.reduce(
          (total, partner) => total + (Array.isArray(partner.stores) ? partner.stores.length : 0),
          0,
        ) ?? 0,
    },
    imageUrls: {
      logo: resolveAboutMediaUrl(section?.logo) ?? null,
      mobileLogo: resolveAboutMediaUrl(section?.mobileLogo) ?? null,
      valueIcons: section?.values?.map((value) => resolveAboutMediaUrl(value.icon) ?? null) ?? [],
      missionImage: resolveAboutMediaUrl(section?.missionImage) ?? null,
      partnerLogos: section?.partners?.map((partner) => resolveAboutMediaUrl(partner.logo) ?? null) ?? [],
      storeLogos:
        section?.partners?.flatMap((partner) =>
          partner.stores?.map((store) => resolveAboutMediaUrl(store.logo) ?? null) ?? [],
        ) ?? [],
    },
  });
}

export async function getAboutPage() {
  try {
    const response = await strapiFetch<StrapiSingleResponse<StrapiAboutPage>>("/api/about-page", {
      params: aboutPagePopulateParams,
    });
    const section = normalizeSingle(response);
    const fallback = getSnapshotSingle<StrapiAboutPage>("aboutPage");

    logAboutPageResolution(section ? "strapi" : fallback ? "snapshot" : "empty", section ?? fallback);

    return section ?? fallback;
  } catch (error) {
    const fallback = getSnapshotSingle<StrapiAboutPage>("aboutPage");

    logAboutPageResolution(fallback ? "snapshot" : "empty", fallback, error);

    return fallback;
  }
}

export async function getTermsPage() {
  try {
    const response = await strapiFetch<StrapiSingleResponse<StrapiTermsPage>>("/api/terms-page", {
      params: {
        "populate[sections][populate]": "image",
      },
    });

    return normalizeSingle(response) ?? getSnapshotSingle<StrapiTermsPage>("termsPage");
  } catch {
    return getSnapshotSingle<StrapiTermsPage>("termsPage");
  }
}

export async function getCertificatesPage() {
  try {
    const response = await strapiFetch<StrapiSingleResponse<StrapiCertificatesPage>>(
      "/api/certificates-page",
      {
        params: {
          "populate[certificates][populate]": "image",
        },
      },
    );

    return normalizeSingle(response) ?? getSnapshotSingle<StrapiCertificatesPage>("certificatesPage");
  } catch {
    return getSnapshotSingle<StrapiCertificatesPage>("certificatesPage");
  }
}

export async function getBannerSection() {
  const response = await strapiFetch<StrapiCollectionResponse<StrapiBanner>>(
    "/api/banners",
    {
      params: {
        populate: "*",
      },
    },
  );
  const banners = response.data ?? [];

  if (banners.length === 0) {
    return null;
  }

  return mapBannerSection(banners);
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
        "populate[image]": true,
        "populate[items][populate]": "mobileImage",
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
        "populate[stages][populate]": "image",
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
        "populate[brandLinks]": "*",
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
  const response = await strapiFetch<StrapiSingleResponse<StrapiFaqSection>>("/api/faq-section", {
    params: {
      "populate[categories][populate]": "items",
    },
  });

  return normalizeSingle(response);
}
export async function getLeadCtaSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiLeadCtaSection>>(
    "/api/lead-cta-section",
    {
      params: {
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
      },
    },
  );

  return normalizeSingle(response);
}
export async function getFooterSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiFooterSection>>(
    "/api/footer-section",
    {
      params: {
        "populate[companyLinks]": "*",
        "populate[documentLinks]": "*",
        "populate[socialLinks][populate]": "*",
      },
    },
  );

  return normalizeSingle(response);
}
export async function getFloatingContactSection() {
  const response = await strapiFetch<StrapiSingleResponse<StrapiFloatingContactSection>>(
    "/api/floating-contact-section",
    {
      params: {
        "populate[items][populate]": "*",
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
    bannerSectionResult,
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
    footerSectionResult,
    floatingContactSectionResult,
  ] = await Promise.allSettled([
    getSiteHeader(),
    getHomePage(),
    getBannerSection(),
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
    getFooterSection(),
    getFloatingContactSection(),
  ]);

  const snapshotSiteHeader = getSnapshotSingle<StrapiSiteHeader>("siteHeader");
  const snapshotHomePage = getSnapshotSingle<StrapiHomePage>("homePage");
  const snapshotBannerSection = getSnapshotBannerSectionData();
  const snapshotWholesaleSection = getSnapshotSingle<StrapiWholesaleContractSection>("wholesaleContract");
  const snapshotProsConsSection = getSnapshotSingle<StrapiProsConsSection>("prosCons");
  const snapshotFormula72SchemeSection =
    getSnapshotSingle<StrapiFormula72SchemeSection>("formula72Scheme");
  const snapshotMissionK72Section = getSnapshotSingle<StrapiMissionK72Section>("missionK72");
  const snapshotWorkStagesSection = getSnapshotSingle<StrapiWorkStagesSection>("workStages");
  const snapshotWhoSuitsSection = getSnapshotSingle<StrapiWhoSuitsSection>("whoSuits");
  const snapshotWhyTrustUsSection = getSnapshotSingle<StrapiWhyTrustUsSection>("whyTrustUs");
  const snapshotWhatWeCanMakeSection =
    getSnapshotSingle<StrapiWhatWeCanMakeSection>("whatWeCanMake");
  const snapshotCoverageMapSection = getSnapshotSingle<StrapiCoverageMapSection>("coverageMap");
  const snapshotFaqSection = getSnapshotSingle<StrapiFaqSection>("faq");
  const snapshotLeadCtaSection = getSnapshotSingle<StrapiLeadCtaSection>("leadCta");
  const snapshotFinalBrandSection = getSnapshotSingle<StrapiFinalBrandSection>("finalBrand");
  const snapshotFooterSection = getSnapshotSingle<StrapiFooterSection>("footer");
  const snapshotFloatingContactSection =
    getSnapshotSingle<StrapiFloatingContactSection>("floatingContact");

  const siteHeader = siteHeaderResult.status === "fulfilled" ? siteHeaderResult.value ?? snapshotSiteHeader : snapshotSiteHeader;
  const homePage = homePageResult.status === "fulfilled" ? homePageResult.value ?? snapshotHomePage : snapshotHomePage;
  const bannerSection =
    bannerSectionResult.status === "fulfilled" ? bannerSectionResult.value ?? snapshotBannerSection : snapshotBannerSection;
  const wholesaleSection =
    wholesaleSectionResult.status === "fulfilled" ? wholesaleSectionResult.value ?? snapshotWholesaleSection : snapshotWholesaleSection;
  const prosConsSection =
    prosConsSectionResult.status === "fulfilled" ? prosConsSectionResult.value ?? snapshotProsConsSection : snapshotProsConsSection;
  const formula72SchemeSection =
    formula72SchemeSectionResult.status === "fulfilled"
      ? formula72SchemeSectionResult.value ?? snapshotFormula72SchemeSection
      : snapshotFormula72SchemeSection;
  const isFormula72SchemeSnapshot =
    formula72SchemeSectionResult.status === "fulfilled"
      ? !formula72SchemeSectionResult.value && Boolean(snapshotFormula72SchemeSection)
      : Boolean(snapshotFormula72SchemeSection);
  const missionK72Section =
    missionK72SectionResult.status === "fulfilled" ? missionK72SectionResult.value ?? snapshotMissionK72Section : snapshotMissionK72Section;
  const workStagesSection =
    workStagesSectionResult.status === "fulfilled" ? workStagesSectionResult.value ?? snapshotWorkStagesSection : snapshotWorkStagesSection;
  const whoSuitsSection =
    whoSuitsSectionResult.status === "fulfilled" ? whoSuitsSectionResult.value ?? snapshotWhoSuitsSection : snapshotWhoSuitsSection;
  const whyTrustUsSection =
    whyTrustUsSectionResult.status === "fulfilled" ? whyTrustUsSectionResult.value ?? snapshotWhyTrustUsSection : snapshotWhyTrustUsSection;
  const whatWeCanMakeSection =
    whatWeCanMakeSectionResult.status === "fulfilled"
      ? whatWeCanMakeSectionResult.value ?? snapshotWhatWeCanMakeSection
      : snapshotWhatWeCanMakeSection;
  const coverageMapSection =
    coverageMapSectionResult.status === "fulfilled" ? coverageMapSectionResult.value ?? snapshotCoverageMapSection : snapshotCoverageMapSection;
  const faqSection =
    faqSectionResult.status === "fulfilled" ? faqSectionResult.value ?? snapshotFaqSection : snapshotFaqSection;
  const leadCtaSection =
    leadCtaSectionResult.status === "fulfilled" ? leadCtaSectionResult.value ?? snapshotLeadCtaSection : snapshotLeadCtaSection;
  const finalBrandSection =
    finalBrandSectionResult.status === "fulfilled"
      ? finalBrandSectionResult.value ?? snapshotFinalBrandSection
      : snapshotFinalBrandSection;
  const footerSection =
    footerSectionResult.status === "fulfilled" ? footerSectionResult.value ?? snapshotFooterSection : snapshotFooterSection;
  const floatingContactSection =
    floatingContactSectionResult.status === "fulfilled"
      ? floatingContactSectionResult.value ?? snapshotFloatingContactSection
      : snapshotFloatingContactSection;
  const headerData = siteHeader
    ? mapSiteHeader(siteHeader)
    : {
        siteHeader: homePageMock.siteHeader,
        navigation: homePageMock.navigation.slice(0, 4),
      };

  if (
    siteHeaderResult.status === "rejected" ||
    homePageResult.status === "rejected" ||
    bannerSectionResult.status === "rejected" ||
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
    finalBrandSectionResult.status === "rejected" ||
    footerSectionResult.status === "rejected" ||
    floatingContactSectionResult.status === "rejected"
  ) {
    console.warn("Strapi data partially unavailable, using mock only for failed sections.", {
      siteHeader: siteHeaderResult.status,
      homePage: homePageResult.status,
      bannerSection: bannerSectionResult.status,
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
      footerSection: footerSectionResult.status,
      floatingContactSection: floatingContactSectionResult.status,
    });
  }

  try {
    const data = {
      siteHeader: headerData.siteHeader,
      navigation: headerData.navigation,
      hero: homePage ? mapHero(homePage) : homePageMock.hero,
      bannerSection: bannerSection ?? homePageMock.bannerSection,
      wholesaleContract: wholesaleSection ? mapWholesale(wholesaleSection) : homePageMock.wholesaleContract,
      prosCons: prosConsSection ? mapProsCons(prosConsSection) : homePageMock.prosCons,
      missionK72: missionK72Section ? mapMissionK72(missionK72Section) : homePageMock.missionK72,
      formula72Scheme: formula72SchemeSection
        ? mapFormula72Scheme(formula72SchemeSection, {
            preferLocalUploads: isFormula72SchemeSnapshot,
          })
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
      footer: footerSection ? mapFooterSection(footerSection) : homePageMock.footer,
      floatingContact: floatingContactSection
        ? mapFloatingContactSection(floatingContactSection)
        : homePageMock.floatingContact,
    };

    if (process.env.NODE_ENV !== "production") {
      console.info("Resolved Strapi media URLs", {
        heroBackgroundImage: data.hero.backgroundImage ?? null,
        bannerImages: data.bannerSection.banners.map((banner) => ({
          id: banner.id,
          image: banner.image,
          mobileImage: banner.mobileImage ?? null,
        })),
        wholesaleBackgroundImage: data.wholesaleContract.backgroundImage,
        missionK72Images: {
          leftMainImage: data.missionK72.leftMainImage,
          items: data.missionK72.items.map((item) => ({
            title: item.title,
            image: item.image,
          })),
        },
        formula72Scheme: {
          image: data.formula72Scheme.image,
          items: data.formula72Scheme.items.map((item) => ({
            title: item.title,
            mobileImage: item.mobileImage,
          })),
        },
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




























