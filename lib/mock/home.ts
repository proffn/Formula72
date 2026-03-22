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
      title: "ИДЕАЛЬНЫЙ\nПРОДУКТ С К72",
      image: "/images/home/banners/banner-1.jpg",
      subtitle: "Твоя идея — наш приоритет",
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
};
