export interface StrapiMediaFormat {
  url: string;
  width?: number;
  height?: number;
}

export interface StrapiMedia {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, StrapiMediaFormat>;
}

export interface StrapiSingleResponse<T> {
  data: T | null;
  meta?: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: Record<string, unknown>;
}

export interface StrapiHomePage {
  id: number;
  documentId?: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroBackgroundImage?: StrapiMedia | null;
  heroMobileBackgroundImage?: StrapiMedia | null;
}

export interface StrapiMobileMenuNavigationItem {
  id?: number;
  label?: string | null;
  href?: string | null;
  enabled?: boolean | null;
  order?: number | null;
  badge?: string | null;
  openInNewTab?: boolean | null;
}

export interface StrapiMobileMenuSocialItem {
  id?: number;
  label?: string | null;
  href?: string | null;
  enabled?: boolean | null;
  icon?: StrapiMedia | null;
  hoverIcon?: StrapiMedia | null;
}
export interface StrapiSiteHeader {
  id: number;
  documentId?: string;
  logoImage?: StrapiMedia | null;
  burgerMenuLogo?: StrapiMedia | null;
  navAboutLabel?: string | null;
  navProductionLabel?: string | null;
  navWholesaleLabel?: string | null;
  navReviewsLabel?: string | null;
  phone?: string | null;
  workSchedule?: string | null;
}

export interface StrapiBanner {
  id: number;
  documentId?: string;
  title?: string | null;
  subtitle?: string | null;
  textPosition?: "left-top" | "right-center" | null;
  image?: StrapiMedia | null;
  mobileImage?: StrapiMedia | null;
  order?: number | null;
  isActive?: boolean | null;
  enabled?: boolean | null;
  contentAlign?: "left" | "center" | "right" | null;
  contentVerticalAlign?: "top" | "center" | "bottom" | null;
  textMaxWidth?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
  textColor?: "dark" | "light" | null;
  description?: string | null;
}

export interface StrapiBannerSlideItem {
  id?: number;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
  mobileImage?: StrapiMedia | null;
  enabled?: boolean | null;
  order?: number | null;
  contentAlign?: "left" | "center" | "right" | null;
  contentVerticalAlign?: "top" | "center" | "bottom" | null;
  textMaxWidth?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
  textColor?: "dark" | "light" | null;
}

export interface StrapiBannerSection {
  id: number;
  documentId?: string;
  enabled?: boolean | null;
  autoplayDelay?: number | null;
  banners?: StrapiBannerSlideItem[] | null;
}

export interface StrapiWholesaleContractSection {
  id: number;
  documentId?: string;
  leftTitle: string;
  leftButtonText: string;
  leftButtonLink: string;
  OptMobileImage?: StrapiMedia | null;
  rightTitle: string;
  rightButtonText: string;
  rightButtonLink: string;
  ContractMobileImage?: StrapiMedia | null;
  backgroundImage?: StrapiMedia | null;
}

export interface StrapiTextItem {
  id?: number;
  text?: string | null;
}

export interface StrapiProsConsSection {
  id: number;
  documentId?: string;
  sectionTitle?: string | null;
  leftTitle?: string | null;
  leftAdvantagesTitle?: string | null;
  leftAdvantages?: StrapiTextItem[] | null;
  leftDisadvantagesTitle?: string | null;
  leftDisadvantages?: StrapiTextItem[] | null;
  rightTitle?: string | null;
  rightAdvantagesTitle?: string | null;
  rightAdvantages?: StrapiTextItem[] | null;
  rightDisadvantagesTitle?: string | null;
  rightDisadvantages?: StrapiTextItem[] | null;
}

export interface StrapiFormula72SchemeItem {
  id?: number;
  title?: string | null;
  description?: string | null;
  mobileImage?: StrapiMedia | null;
}

export interface StrapiFormula72SchemeSection {
  id: number;
  documentId?: string;
  title?: string | null;
  image?: StrapiMedia | null;
  items?: StrapiFormula72SchemeItem[] | null;
}

export interface StrapiMissionK72Section {
  id: number;
  documentId?: string;
  title?: string | null;
  leadText?: string | null;
  leftMainImage?: StrapiMedia | null;
  certificationTitle?: string | null;
  certificationText?: string | null;
  certificationImage?: StrapiMedia | null;
  honestSignTitle?: string | null;
  honestSignText?: string | null;
  honestSignImage?: StrapiMedia | null;
  professionalismTitle?: string | null;
  professionalismText?: string | null;
  professionalismImage?: StrapiMedia | null;
  sideLabel?: string | null;
}

export interface StrapiWorkStageItem {
  id?: number;
  text?: string | null;
  image?: StrapiMedia | null;
}

export interface StrapiWorkStagesSection {
  id: number;
  documentId?: string;
  title?: string | null;
  stages?: StrapiWorkStageItem[] | null;
}

export interface StrapiWhoSuitsItem {
  id?: number;
  title?: string | null;
  text?: string | null;
  image?: StrapiMedia | null;
  buttonText?: string | null;
  buttonLink?: string | null;
}

export interface StrapiWhoSuitsSection {
  id: number;
  documentId?: string;
  title?: string | null;
  items?: StrapiWhoSuitsItem[] | null;
}

export interface StrapiWhyTrustPoint {
  id?: number;
  text?: string | null;
}

export interface StrapiWhyTrustGalleryItem {
  id?: number;
  image?: StrapiMedia | null;
  hoverImage?: StrapiMedia | null;
}

export interface StrapiWhyTrustUsSection {
  id: number;
  documentId?: string;
  title?: string | null;
  points?: StrapiWhyTrustPoint[] | null;
  galleryItems?: StrapiWhyTrustGalleryItem[] | null;
}


export interface StrapiMakeItem {
  id?: number;
  title?: string | null;
  image?: StrapiMedia | null;
  hoverImage?: StrapiMedia | null;
  hoverVideo?: StrapiMedia | null;
  isActive?: boolean | null;
}

export interface StrapiWhatWeCanMakeSection {
  id: number;
  documentId?: string;
  title?: string | null;
  items?: StrapiMakeItem[] | null;
}
export interface StrapiFaqItem {
  id?: number;
  number?: string | null;
  question?: string | null;
  answer?: string | null;
  isActive?: boolean | null;
}

export interface StrapiFaqCategory {
  id?: number;
  title?: string | null;
  items?: StrapiFaqItem[] | null;
}

export interface StrapiFaqSection {
  id: number;
  documentId?: string;
  bigNumber?: string | null;
  title?: string | null;
  description?: string | null;
  categories?: StrapiFaqCategory[] | null;
  ctaTitle?: string | null;
  ctaText?: string | null;
  ctaButtonText?: string | null;
  ctaButtonLink?: string | null;
}
export interface StrapiLeadCtaSection {
  id: number;
  documentId?: string;
  title?: string | null;
  description?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
}
export interface StrapiFinalBrandSection {
  id: number;
  documentId?: string;
  title?: string | null;
}
export interface StrapiFooterLink {
  id?: number;
  label?: string | null;
  href?: string | null;
}

export interface StrapiFooterSocialLink {
  id?: number;
  label?: string | null;
  href?: string | null;
  enabled?: boolean | null;
  icon?: StrapiMedia | null;
  hoverIcon?: StrapiMedia | null;
}

export interface StrapiFooterSection {
  id: number;
  documentId?: string;
  contactsColumnTitle?: string | null;
  consultationTitle?: string | null;
  consultationPhone?: string | null;
  consultationEmail?: string | null;
  procurementTitle?: string | null;
  procurementEmail?: string | null;
  marketingTitle?: string | null;
  marketingEmail?: string | null;
  workingHours?: string | null;
  companyColumnTitle?: string | null;
  companyLinks?: StrapiFooterLink[] | null;
  documentsColumnTitle?: string | null;
  documentLinks?: StrapiFooterLink[] | null;
  formColumnTitle?: string | null;
  phonePlaceholder?: string | null;
  consentText?: string | null;
  socialLinks?: StrapiFooterSocialLink[] | null;
}
export interface StrapiFloatingContactItem {
  id?: number;
  label?: string | null;
  href?: string | null;
  enabled?: boolean | null;
  order?: number | null;
  icon?: StrapiMedia | null;
  hoverIcon?: StrapiMedia | null;
}
export interface StrapiCoverageMapReview {
  id?: number;
  name?: string | null;
  reviewText?: string | null;
  rating?: number | null;
  avatar?: StrapiMedia | null;
  brandImage?: StrapiMedia | null;
  xPosition?: number | null;
  yPosition?: number | null;
  isActive?: boolean | null;
}

export interface StrapiFloatingContactSection {
  id: number;
  documentId?: string;
  enabled?: boolean | null;
  buttonLabel?: string | null;
  items?: StrapiFloatingContactItem[] | null;
  showScrollTop?: boolean | null;
}
export interface StrapiCoverageMapSection {
  id: number;
  documentId?: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  mapImage?: StrapiMedia | null;
  reviews?: StrapiCoverageMapReview[] | null;
}





