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

export interface HomePageData {
  siteHeader: SiteHeaderContent;
  navigation: NavItem[];
  hero: HeroContent;
  banners: BannerItem[];
  wholesaleContract: WholesaleSectionData;
}
