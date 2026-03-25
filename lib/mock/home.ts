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
};
