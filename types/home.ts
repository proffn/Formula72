export interface NavItem {
  label: string;
  href: string;
}

export interface SiteHeaderContent {
  logoImage: string;
  phone: string;
  workSchedule: string;
}

export interface HeroContent {
  lines: [string, string];
  brand: string;
  backgroundImage?: string;
}

export type BannerTextPosition = "left-top" | "right-center";

export interface BannerItem {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  textPosition: BannerTextPosition;
  textColor?: "dark" | "light";
}

export interface SplitBlockAction {
  label: string;
  href: string;
}

export interface SplitBlockSide {
  lines: [string, string];
  action: SplitBlockAction;
}

export interface WholesaleSectionData {
  backgroundImage: string;
  left: SplitBlockSide;
  right: SplitBlockSide;
}

export interface ComparisonColumnData {
  title: string;
  advantagesTitle: string;
  advantages: string[];
  disadvantagesTitle: string;
  disadvantages: string[];
}

export interface ProsConsSectionData {
  sectionTitle: string;
  leftColumn: ComparisonColumnData;
  rightColumn: ComparisonColumnData;
}

export interface Formula72SchemeSectionData {
  title: string;
  image: string;
}

export interface MissionK72ItemData {
  title: string;
  text: string;
  image: string;
}

export interface MissionK72SectionData {
  title: string;
  leadText: string;
  leftMainImage: string;
  items: [MissionK72ItemData, MissionK72ItemData, MissionK72ItemData];
  sideLabel?: string;
}

export interface WorkStageItemData {
  id: string;
  text: string;
  image: string;
}

export interface WorkStagesSectionData {
  title: string;
  stages: WorkStageItemData[];
}

export interface WhoSuitsItemData {
  id: string;
  title: string;
  text: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface WhoSuitsSectionData {
  title: string;
  items: WhoSuitsItemData[];
}

export interface WhyTrustPointData {
  id: string;
  text: string;
}

export interface WhyTrustGalleryItemData {
  id: string;
  image: string;
  hoverImage?: string;
}

export interface WhyTrustUsSectionData {
  title: string;
  points: WhyTrustPointData[];
  galleryItems: WhyTrustGalleryItemData[];
}


export interface WhatWeCanMakeItemData {
  id: string;
  title: string;
  image: string;
  hoverImage?: string;
  hoverVideo?: string;
  isActive: boolean;
}

export interface WhatWeCanMakeSectionData {
  title: string;
  items: WhatWeCanMakeItemData[];
}
export interface FaqItemData {
  id: string;
  number: string;
  question: string;
  answer: string;
  isActive: boolean;
}

export interface FaqCategoryData {
  id: string;
  title: string;
  items: FaqItemData[];
}

export interface FaqSectionData {
  bigNumber: string;
  title: string;
  description: string;
  categories: FaqCategoryData[];
  ctaTitle: string;
  ctaText: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}
export interface LeadCtaSectionData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}
export interface FinalBrandSectionData {
  title: string;
}
export interface CoverageMapReviewData {
  id: string;
  name: string;
  reviewText: string;
  rating: number;
  avatar: string;
  brandImage?: string;
  xPosition: number;
  yPosition: number;
  isActive: boolean;
}

export interface CoverageMapSectionData {
  title: string;
  subtitle: string;
  description: string;
  mapImage: string;
  reviews: CoverageMapReviewData[];
}

export interface HomePageData {
  siteHeader: SiteHeaderContent;
  navigation: NavItem[];
  hero: HeroContent;
  banners: BannerItem[];
  wholesaleContract: WholesaleSectionData;
  prosCons: ProsConsSectionData;
  missionK72: MissionK72SectionData;
  formula72Scheme: Formula72SchemeSectionData;
  workStages: WorkStagesSectionData;
  whoSuits: WhoSuitsSectionData;
  whyTrustUs: WhyTrustUsSectionData;
  whatWeCanMake: WhatWeCanMakeSectionData;
  leadCta: LeadCtaSectionData;
  finalBrand: FinalBrandSectionData;
  coverageMap: CoverageMapSectionData;
  faq: FaqSectionData;
}




