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
}

export interface StrapiSiteHeader {
  id: number;
  documentId?: string;
  logoImage?: StrapiMedia | null;
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
  title: string;
  subtitle?: string | null;
  textPosition?: "left-top" | "right-center" | null;
  image?: StrapiMedia | null;
  order?: number | null;
  isActive?: boolean | null;
}

export interface StrapiWholesaleContractSection {
  id: number;
  documentId?: string;
  leftTitle: string;
  leftButtonText: string;
  leftButtonLink: string;
  rightTitle: string;
  rightButtonText: string;
  rightButtonLink: string;
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

export interface StrapiFormula72SchemeSection {
  id: number;
  documentId?: string;
  title?: string | null;
  image?: StrapiMedia | null;
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
