import type { CertificatesPageData } from "@/types/certificates";

const buttonHref = "https://b24-2uwhq2.bitrix24site.ru/?utm_source=website_contract72";

export const certificatesPageMock: CertificatesPageData = {
  enabled: true,
  title: "СЕРТИФИКАТЫ",
  description:
    "Компания ФОРМУЛА72 имеет все необходимые сертификаты и разрешения.\n" +
    "С ними можно ознакомиться, пролистав изображения в карусели.\n" +
    "Остались вопросы?\n" +
    "Задайте их сотруднику компании ФОРМУЛА72.",
  buttonLabel: "КОНСУЛЬТАЦИЯ",
  buttonHref,
  certificates: Array.from({ length: 8 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      id: `certificate-${number}`,
      title: `Сертификат ${index + 1}`,
      alt: `Сертификат Formula72 ${index + 1}`,
      image: `/images/home/certificates/certificate-${number}.jpg`,
      order: index + 1,
      enabled: true,
    };
  }),
};
