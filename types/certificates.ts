export interface CertificateItemData {
  id: string;
  title: string;
  alt: string;
  image: string;
  order: number;
  enabled: boolean;
}

export interface CertificatesPageData {
  enabled: boolean;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  certificates: CertificateItemData[];
}
