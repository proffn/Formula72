import type { AboutPageData } from "@/types/about";

export const aboutPageMock: AboutPageData = {
  enabled: true,
  title: "ФОРМУЛА [72]",
  subtitle: "ВАША ИДЕЯ - НАШЕ ВОПЛОЩЕНИЕ",
  logo: "/images/home/hero/logo1.png",
  mobileLogo: "/images/home/hero/logo1.png",
  backButtonLabel: "На главную",
  backButtonHref: "/",
  valuesTitle: "ЦЕННОСТИ ФОРМУЛА72",
  values: [
    {
      title: "Скорость",
      description:
        "Сейчас мир на расстоянии\nклика. Хочешь свой бренд\nкосметики?",
      highlightText: "Мы уложимся за 30\nрабочих дней.",
      icon: "/images/home/about/icons/speed-icon.png",
      order: 1,
      enabled: true,
    },
    {
      title: "Доступность",
      description:
        "Чтобы запустить свой бренд\nкосметики – больше не нужен\nзавод и огромные вложения:",
      highlightText:
        "Минимальная партия у нас\nдействительно минимальная,\nа не для “галочки”.\n\nК Вашим услугам экспертиза\nотдела маркетинга\n#ФОРМУЛА[72]: если Вы наш\nклиент - консультация, как\nвыйти в “Золотое Яблоко”\nили Летуаль - БЕСПЛАТНО.",
      icon: "/images/home/about/icons/accessibility-icon.png",
      order: 2,
      enabled: true,
    },
    {
      title: "Профессионализм",
      description:
        "1000 проверенных составов,\nсовременное производство\nи целая команда маркетинга\nбудет работать над Вашим\nбрендом, начиная\nс минимальной партии.",
      highlightText:
        "За Ваши брендом закрепляется\nпрофессиональный менеджер,\nкоторый заинтересован в том,\nчтобы Ваш продукт\nреально продавался.",
      icon: "/images/home/about/icons/professionalism-icon.png",
      order: 3,
      enabled: true,
    },
  ],
  missionTitle: "МИССИЯ БРЕНДА",
  missionText:
    "Хочешь покорить мир через свой бренд косметики?\nМы поможем. Ваша идея - наше воплощение.",
  missionImage: "/images/home/about/icons/cream-heart.png",
  whyTitle: "ПОЧЕМУ СТОИТ ВЫБРАТЬ #ФОРМУЛА[72]",
  whyItems: [
    {
      title: "Скорость",
      label: "Формула",
      value: "14 / 30",
      description:
        "14 рабочих дней займёт\nразработка опытных\nобразцов.\n\n30 рабочих дней займёт\nразработка Вашего\nбренда под ключ.",
      order: 1,
      enabled: true,
    },
    {
      title: "Доступность",
      label: "Минимальная партия",
      value: "от 50 000₽",
      description:
        "Это самый низкий порог\nвхода для бизнеса в 2026*\n\n*Согласно данным\nЯНДЕКС БИЗНЕС открыть,\nнапример, ПВЗ от 250 000 ₽",
      linkLabel: "ЯНДЕКС БИЗНЕС",
      linkHref: "https://business.yandex/praktika/kakoj-biznes-otkryt-v-rossii/",
      order: 2,
      enabled: true,
    },
    {
      title: "Профессионализм",
      label: "Полная",
      value: "ПОДДЕРЖКА",
      description:
        "Полная поддержка на всех\nстадиях от производства\nдо маркетинга.\n\nМы точно знаем, как создать\nуспешный косметический\nбренд - потому что наши\nсобственные продукты\nпродаются:",
      order: 3,
      enabled: true,
    },
  ],
  partners: [
    {
      title: "ÉVSI",
      logo: "/images/home/about/partners/evsi-logo.png",
      order: 1,
      enabled: true,
      stores: [
        {
          title: "Золотое яблоко",
          logo: "/images/home/about/stores/golden-apple-logo.png",
          href: "https://goldapple.ru/brands/evsi",
          order: 1,
          enabled: true,
        },
        {
          title: "Летуаль",
          logo: "/images/home/about/stores/letual-logo.png",
          href: "https://www.letu.ru/merchant/41500012",
          order: 2,
          enabled: true,
        },
        {
          title: "Детский мир",
          logo: "/images/home/about/stores/detmir-logo.png",
          href: "https://www.detmir.ru/catalog/index/name/skin_care_mom/brand/113897/",
          order: 3,
          enabled: true,
        },
      ],
    },
    {
      title: "QTIX",
      logo: "/images/home/about/partners/qtix-logo.png",
      order: 2,
      enabled: true,
      stores: [
        {
          title: "Летуаль",
          logo: "/images/home/about/stores/letual-logo.png",
          href: "https://www.letu.ru/merchant/215000004",
          order: 1,
          enabled: true,
        },
      ],
    },
    {
      title: "DR.GROOMER",
      logo: "/images/home/about/partners/dr-groomer-logo.png",
      order: 3,
      enabled: true,
      stores: [
        {
          title: "Зоозавр",
          logo: "/images/home/about/stores/zoozavr-logo.png",
          href: "https://zoozavr.ru/catalog/index/name/uhod-i-kosmetika-dlya-sobak/brand/113898/",
          order: 1,
          enabled: true,
        },
      ],
    },
  ],
};
