import type { HomePageData } from "@/types/home";

export const homePageMock: HomePageData = {
  siteHeader: {
    logoImage: "/images/home/hero/logo1.png",
    phone: "+7 969 807 88 87",
    workSchedule: "пн.-пт. с 07:00 до 16:00 по мск",
  },
  navigation: [
    { label: "О нас", href: "#hero" },
    { label: "Производство", href: "#hero" },
    { label: "Опт", href: "#wholesale-contract" },
    { label: "Отзывы", href: "#banners" },
    { label: "Контакты", href: "#wholesale-contract" },
  ],
  hero: {
    lines: ["КОНТРАКТНОЕ", "ПРОИЗВОДСТВО"],
    brand: "FORMULA72",
  },
  banners: [
    {
      id: "banner-1",
      title: "ИДЕАЛЬНЫЙ\nПРОДУКТ С K72",
      image: "/images/home/banners/banner-1.jpg",
      subtitle: "Твоя идея - наш приоритет",
      textPosition: "left-top",
      textColor: "dark",
    },
    {
      id: "banner-2",
      title: "ВРЕМЯ\nСОЗДАВАТЬ",
      image: "/images/home/banners/banner-2.jpg",
      subtitle: "МЫ ПРЕВРАЩАЕМ МЕЧТЫ\nВ РЕАЛЬНОСТЬ",
      textPosition: "right-center",
      textColor: "light",
    },
  ],
  wholesaleContract: {
    backgroundImage: "/images/home/wholesale-contract/opt-contract-bg.jpg",
    left: {
      lines: ["ОПТОВАЯ", "ТОРГОВЛЯ"],
      action: {
        label: "УСЛОВИЯ",
        href: "#",
      },
    },
    right: {
      lines: ["КОНТРАКТНОЕ", "ПРОИЗВОДСТВО"],
      action: {
        label: "ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ",
        href: "#",
      },
    },
  },
  prosCons: {
    sectionTitle: "Плюсы и минусы готовых рецептур и создание своего уникального продукта",
    leftColumn: {
      title: "ОПТ",
      advantagesTitle: "Преимущества",
      advantages: [
        "Быстрый старт",
        "Готовая ассортиментная матрица",
        "Минимальные маркетинговые вложения",
        "Минимальные репутационные риски",
        "Готовые документы и сертификация",
        "Готовый Честный Знак",
      ],
      disadvantagesTitle: "Недостатки",
      disadvantages: [
        "Ниже маржинальность",
        "Зависимость от поставщика",
        "Ограниченный контроль качества",
        "Нет уникальности",
        "Демпинг конкурентов с похожим товаром",
      ],
    },
    rightColumn: {
      title: "КОНТРАКТНОЕ",
      advantagesTitle: "Преимущества",
      advantages: [
        "Собственный бренд и его позиционирование",
        "Формулы, разработанные индивидуально технологом",
        "Контроль качества и гибкость в выборе продукта",
        "Высокая маржинальность",
        "Уникальность на рынке",
        "Защита от демпинга и \"ценовых войн\"",
      ],
      disadvantagesTitle: "Недостатки",
      disadvantages: [
        "Длинный запуск",
        "Риск ошибки с продуктом",
        "Ответственность за продукт / репутацию",
        "Высокие маркетинговые вложения",
      ],
    },
  },
  missionK72: {
    title: "Миссия K72",
    leadText: "Хочешь покорить мир через свой продукт? Мы поможем",
    leftMainImage: "/images/home/mission-k72/mission-main.png",
    items: [
      {
        title: "Сертификация",
        text: "Все наши продукты и сырье сертифицируются",
        image: "/images/home/mission-k72/mission-certification.png",
      },
      {
        title: "Честный Знак",
        text: "Мы умеем работать с Честным Знаком и с радостью поможем вам",
        image: "/images/home/mission-k72/mission-honest-sign.png",
      },
      {
        title: "Профессионализм",
        text: "Мы сотрудничаем с косметологиями и косметологами по всей России",
        image: "/images/home/mission-k72/mission-professionalism.png",
      },
    ],
    sideLabel: "FORMULA72",
  },
  formula72Scheme: {
    title: "K72",
    image: "/images/home/formula72-scheme/formula72-scheme.png",
  },
  workStages: {
    title: "ЭТАПЫ РАБОТЫ",
    stages: [
      {
        id: "stage-1",
        image: "/images/home/work-stages/stage-1.png",
        text: "Совместно с менеджером выбираете продукт, тару, упаковку и определяете состав заказа.",
      },
      {
        id: "stage-2",
        image: "/images/home/work-stages/stage-2.png",
        text: "Подписываете договор и спецификацию, выставляется счет и осуществляется оплата.",
      },
      {
        id: "stage-3",
        image: "/images/home/work-stages/stage-3.png",
        text: "Регистрируется декларация, организуется маркировка «Честный Знак» и создается карточка товара.",
      },
      {
        id: "stage-4",
        image: "/images/home/work-stages/stage-4.png",
        text: "Производство закупает сырьё, изготавливает сигнальный образец и запускает варку при наличии всех материалов.",
      },
      {
        id: "stage-5",
        image: "/images/home/work-stages/stage-5.png",
        text: "Упаковываются коробки, маркируются для отгрузки и осуществляется отгрузка продукции.",
      },
      {
        id: "stage-6",
        image: "/images/home/work-stages/stage-6.png",
        text: "Организуется транспортировка, оформляется забор груза и передаются сопроводительные документы.",
      },
    ],
  },
};
