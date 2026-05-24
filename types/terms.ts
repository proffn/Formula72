export interface TermsSectionData {
  id: string;
  title: string;
  content: string;
  image: string;
  buttonLabel: string;
  buttonHref: string;
  order: number;
  enabled: boolean;
}

export interface TermsPageData {
  enabled: boolean;
  title: string;
  sections: TermsSectionData[];
}
