export interface AboutValueCardData {
  title: string;
  description: string;
  highlightText?: string;
  icon: string;
  order?: number;
  enabled: boolean;
}

export interface AboutWhyItemData {
  title: string;
  label?: string;
  value: string;
  description: string;
  linkLabel?: string;
  linkHref?: string;
  order?: number;
  enabled: boolean;
}

export interface AboutStoreLinkData {
  title: string;
  logo: string;
  href: string;
  order?: number;
  enabled: boolean;
}

export interface AboutPartnerCardData {
  title: string;
  logo: string;
  stores: AboutStoreLinkData[];
  order?: number;
  enabled: boolean;
}

export interface AboutPageData {
  enabled: boolean;
  title: string;
  subtitle: string;
  logo: string;
  backButtonLabel: string;
  backButtonHref: string;
  valuesTitle: string;
  values: AboutValueCardData[];
  missionTitle: string;
  missionText: string;
  missionImage: string;
  whyTitle: string;
  whyItems: AboutWhyItemData[];
  partners: AboutPartnerCardData[];
}
