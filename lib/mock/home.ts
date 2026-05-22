import type { HomePageData } from "@/types/home";

export const homePageMock: HomePageData = {
  siteHeader: {
    logoImage: "/images/home/hero/logo1.png",
    phone: "+7 969 807 88 87",
    workSchedule: "пн.-пт. с 07:00 до 16:00 по мск",
  },
  navigation: [
    { label: "О нас", href: "/about" },
    { label: "Производство", href: "/production" },
    { label: "Опт", href: "https://b24-k8i1gh.bitrix24site.ru/crm_form_cw6nx/?utm_source=website_contract72" },
    { label: "Отзывы", href: "/#coverage-map" },
    { label: "Контакты", href: "#wholesale-contract" },
  ],
  hero: {
    lines: ["КОНТРАКТНОE", "ПРОИЗВОДСТВО", "КОСМЕТИКИ"],
    brand: "ФОРМУЛА72",
    mobileBackgroundImage: "/images/home/hero/mobile-hero-bg.png",
  },
  bannerSection: {
    enabled: true,
    autoplayDelay: 6000,
    banners: [
      {
        id: "banner-1",
          title: "ИДЕАЛЬНЫЙ ПРОДУКТ\nС FORMULA72",
          subtitle: "ТВОЯ ИДЕЯ - НАШ ПРИОРИТЕТ",
          image: "/images/home/banners/banner-1.jpg",
          mobileImage: "/images/home/banners/banner-1-mobile.png",
          mobileAspectRatio: "247 / 275",
          enabled: true,
        order: 1,
        contentAlign: "left",
        contentVerticalAlign: "top",
        textMaxWidth: "18rem",
        textColor: "dark",
      },
      {
        id: "banner-2",
          title: "ВРЕМЯ\nСОЗДАВАТЬ",
          subtitle: "МЫ ПРЕВРАЩАЕМ МЕЧТЫ\nВ РЕАЛЬНОСТЬ",
          image: "/images/home/banners/banner-2.jpg",
          mobileImage: "/images/home/banners/banner-2-mobile.png",
          mobileAspectRatio: "248 / 274",
          enabled: true,
        order: 2,
        contentAlign: "right",
        contentVerticalAlign: "center",
        textMaxWidth: "19rem",
        textColor: "light",
      },
    ],
  },
    wholesaleContract: {
      backgroundImage: "/images/home/wholesale-contract/opt-contract-bg.jpg",
      left: {
        lines: ["РћРџРўРћР’РђРЇ", "РўРћР Р“РћР’Р›РЇ"],
        action: {
          label: "РЈРЎР›РћР’РРЇ",
          href: "#",
        },
        MobileImage: "/images/home/wholesale-contract/opt-mobile.jpg",
      },
      right: {
        lines: ["РљРћРќРўР РђРљРўРќРћР•", "РџР РћРР—Р’РћР”РЎРўР’Рћ"],
        action: {
          label: "РџРћР›РЈР§РРўР¬ РљРћРќРЎРЈР›Р¬РўРђР¦РР®",
          href: "#",
        },
        MobileImage: "/images/home/wholesale-contract/contract-mobile.jpg",
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
      buttonText: "Получить прайс лист",
      buttonLink: "#wholesale-contract",
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
        'Защита от демпинга и "ценовых войн"',
      ],
      disadvantagesTitle: "Недостатки",
      disadvantages: [
        "Длинный запуск",
        "Риск ошибки с продуктом",
        "Ответственность за продукт / репутацию",
        "Высокие маркетинговые вложения",
      ],
      buttonText: "Получить консультацию",
      buttonLink: "#wholesale-contract",
    },
  },
  missionK72: {
    title: "РњРёСЃСЃРёСЏ K72",
    leadText: "РҐРѕС‡РµС€СЊ РїРѕРєРѕСЂРёС‚СЊ РјРёСЂ С‡РµСЂРµР· СЃРІРѕР№ РїСЂРѕРґСѓРєС‚? РњС‹ РїРѕРјРѕР¶РµРј",
    leftMainImage: "/images/home/mission-k72/mission-main.png",
    items: [
      {
        title: "РЎРµСЂС‚РёС„РёРєР°С†РёСЏ",
        text: "Р’СЃРµ РЅР°С€Рё РїСЂРѕРґСѓРєС‚С‹ Рё СЃС‹СЂСЊРµ СЃРµСЂС‚РёС„РёС†РёСЂСѓСЋС‚СЃСЏ",
        image: "/images/home/mission-k72/mission-certification.png",
      },
      {
        title: "Р§РµСЃС‚РЅС‹Р№ Р—РЅР°Рє",
        text: "РњС‹ СѓРјРµРµРј СЂР°Р±РѕС‚Р°С‚СЊ СЃ Р§РµСЃС‚РЅС‹Рј Р—РЅР°РєРѕРј Рё СЃ СЂР°РґРѕСЃС‚СЊСЋ РїРѕРјРѕР¶РµРј РІР°Рј",
        image: "/images/home/mission-k72/mission-honest-sign.png",
      },
      {
        title: "РџСЂРѕС„РµСЃСЃРёРѕРЅР°Р»РёР·Рј",
        text: "РњС‹ СЃРѕС‚СЂСѓРґРЅРёС‡Р°РµРј СЃ РєРѕСЃРјРµС‚РѕР»РѕРіРёСЏРјРё Рё РєРѕСЃРјРµС‚РѕР»РѕРіР°РјРё РїРѕ РІСЃРµР№ Р РѕСЃСЃРёРё",
        image: "/images/home/mission-k72/mission-professionalism.png",
      },
    ],
    sideLabel: "FORMULA72",
  },
  formula72Scheme: {
    title: "K72",
    image: "/images/home/formula72-scheme/formula72-scheme.png",
    items: [
      {
        title: "АНГРО",
        description:
          "Готовая косметическая масса в удобной таре для самостоятельного розлива и упаковки.",
        mobileImage: "/images/home/formula72-scheme/formula_angro.png",
      },
      {
        title: "ОПТ",
        description: "Предлагаем готовую косметику известных брендов на оптимальных условиях.",
        mobileImage: "/images/home/formula72-scheme/formula_opt.png",
      },
      {
        title: "ПОД КЛЮЧ",
        description:
          "Возьмем на себя ключевые этапы производства. Качественная косметика под вашим брендом.",
        mobileImage: "/images/home/formula72-scheme/formula_key.png",
      },
    ],
  },
  workStages: {
    title: "Р­РўРђРџР« Р РђР‘РћРўР«",
    stages: [
      {
        id: "stage-1",
        number: "1",
        image: "/images/home/work-stages/stage-1.png",
        text: "РЎРѕРІРјРµСЃС‚РЅРѕ СЃ РјРµРЅРµРґР¶РµСЂРѕРј РІС‹Р±РёСЂР°РµС‚Рµ РїСЂРѕРґСѓРєС‚, С‚Р°СЂСѓ, СѓРїР°РєРѕРІРєСѓ Рё РѕРїСЂРµРґРµР»СЏРµС‚Рµ СЃРѕСЃС‚Р°РІ Р·Р°РєР°Р·Р°.",
      },
      {
        id: "stage-2",
        number: "2",
        image: "/images/home/work-stages/stage-2.png",
        text: "РџРѕРґРїРёСЃС‹РІР°РµС‚Рµ РґРѕРіРѕРІРѕСЂ Рё СЃРїРµС†РёС„РёРєР°С†РёСЋ, РІС‹СЃС‚Р°РІР»СЏРµС‚СЃСЏ СЃС‡РµС‚ Рё РѕСЃСѓС‰РµСЃС‚РІР»СЏРµС‚СЃСЏ РѕРїР»Р°С‚Р°.",
      },
      {
        id: "stage-3",
        number: "3",
        image: "/images/home/work-stages/stage-3.png",
        text: "Р РµРіРёСЃС‚СЂРёСЂСѓРµС‚СЃСЏ РґРµРєР»Р°СЂР°С†РёСЏ, РѕСЂРіР°РЅРёР·СѓРµС‚СЃСЏ РјР°СЂРєРёСЂРѕРІРєР° В«Р§РµСЃС‚РЅС‹Р№ Р—РЅР°РєВ» Рё СЃРѕР·РґР°РµС‚СЃСЏ РєР°СЂС‚РѕС‡РєР° С‚РѕРІР°СЂР°.",
      },
      {
        id: "stage-4",
        number: "4",
        image: "/images/home/work-stages/stage-4.png",
        text: "РџСЂРѕРёР·РІРѕРґСЃС‚РІРѕ Р·Р°РєСѓРїР°РµС‚ СЃС‹СЂСЊС‘, РёР·РіРѕС‚Р°РІР»РёРІР°РµС‚ СЃРёРіРЅР°Р»СЊРЅС‹Р№ РѕР±СЂР°Р·РµС† Рё Р·Р°РїСѓСЃРєР°РµС‚ РІР°СЂРєСѓ РїСЂРё РЅР°Р»РёС‡РёРё РІСЃРµС… РјР°С‚РµСЂРёР°Р»РѕРІ.",
      },
      {
        id: "stage-5",
        number: "5",
        image: "/images/home/work-stages/stage-5.png",
        text: "РЈРїР°РєРѕРІС‹РІР°СЋС‚СЃСЏ РєРѕСЂРѕР±РєРё, РјР°СЂРєРёСЂСѓСЋС‚СЃСЏ РґР»СЏ РѕС‚РіСЂСѓР·РєРё Рё РѕСЃСѓС‰РµСЃС‚РІР»СЏРµС‚СЃСЏ РѕС‚РіСЂСѓР·РєР° РїСЂРѕРґСѓРєС†РёРё.",
      },
      {
        id: "stage-6",
        number: "6",
        image: "/images/home/work-stages/stage-6.png",
        text: "РћСЂРіР°РЅРёР·СѓРµС‚СЃСЏ С‚СЂР°РЅСЃРїРѕСЂС‚РёСЂРѕРІРєР°, РѕС„РѕСЂРјР»СЏРµС‚СЃСЏ Р·Р°Р±РѕСЂ РіСЂСѓР·Р° Рё РїРµСЂРµРґР°СЋС‚СЃСЏ СЃРѕРїСЂРѕРІРѕРґРёС‚РµР»СЊРЅС‹Рµ РґРѕРєСѓРјРµРЅС‚С‹.",
      },
    ],
  },
  whoSuits: {
    title: "РљРћРњРЈ РџРћР”РћР™Р”РЃРў",
    items: [
      {
        id: "who-suits-1",
        title: "РЎРµР»Р»РµСЂР°Рј РЅР° РјР°СЂРєРµС‚РїР»РµР№СЃР°С…",
        text: "РњРёРЅРёРјР°Р»СЊРЅР°СЏ РїР°СЂС‚РёСЏ РѕС‚ 5000 в‚Ѕ РґР»СЏ СЃС‚Р°СЂС‚Р°, РјРѕР¶РЅРѕ Р·Р°РїСѓСЃРєР°С‚СЊ РїСЂРѕРґСѓРєС‚ РїРѕРґ СЃРІРѕРёРј Р±СЂРµРЅРґРѕРј Р±РµР· Р»РёС€РЅРёС… РІР»РѕР¶РµРЅРёР№.",
        image: "/images/home/who-suits/item-1.png",
        buttonText: "РАССЧИТАТЬ СТОИМОСТЬ",
        buttonLink: "#wholesale-contract",
      },
      {
        id: "who-suits-2",
        title: "Р‘СЊСЋС‚Рё-Р±Р»РѕРіРµСЂР°Рј",
        text: "РџРѕРґРѕР№РґРµС‚ РґР»СЏ РїРµСЂРІРѕРіРѕ Р·Р°РїСѓСЃРєР°, СЂРµРєР»Р°РјРЅС‹С… РёРЅС‚РµРіСЂР°С†РёР№ Рё С‚РµСЃС‚Р° СЃРїСЂРѕСЃР° СЃ СЃРѕР±СЃС‚РІРµРЅРЅРѕР№ РєРѕСЃРјРµС‚РёС‡РµСЃРєРѕР№ Р»РёРЅРµР№РєРѕР№.",
        image: "/images/home/who-suits/item-2.png",
        buttonText: "РАССЧИТАТЬ СТОИМОСТЬ",
        buttonLink: "#wholesale-contract",
      },
      {
        id: "who-suits-3",
        title: "РЎР°Р»РѕРЅР°Рј РєСЂР°СЃРѕС‚С‹",
        text: "РџРѕРјРѕР¶РµС‚ СЃРѕР·РґР°С‚СЊ РїСЂРѕРґСѓРєС‚ РґР»СЏ РїРѕСЃС‚РѕСЏРЅРЅС‹С… РєР»РёРµРЅС‚РѕРІ Рё СѓСЃРёР»РёС‚СЊ РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅС‹Р№ РёРјРёРґР¶ СЃР°Р»РѕРЅРЅРѕРіРѕ Р±РёР·РЅРµСЃР°.",
        image: "/images/home/who-suits/item-3.png",
        buttonText: "РАССЧИТАТЬ СТОИМОСТЬ",
        buttonLink: "#wholesale-contract",
      },
      {
        id: "who-suits-4",
        title: "Р”РёСЃС‚СЂРёР±СЊСЋС‚РѕСЂР°Рј",
        text: "РџРѕРґС…РѕРґРёС‚ РґР»СЏ СЂР°СЃС€РёСЂРµРЅРёСЏ Р°СЃСЃРѕСЂС‚РёРјРµРЅС‚Р° Рё Р·Р°РїСѓСЃРєР° РїРѕР·РёС†РёРё СЃ С…РѕСЂРѕС€РµР№ РјР°СЂР¶РёРЅР°Р»СЊРЅРѕСЃС‚СЊСЋ РІ СЃРѕР±СЃС‚РІРµРЅРЅРѕР№ СЃРµС‚Рё РїСЂРѕРґР°Р¶.",
        image: "/images/home/who-suits/item-4.png",
        buttonText: "РАССЧИТАТЬ СТОИМОСТЬ",
        buttonLink: "#wholesale-contract",
      },
      {
        id: "who-suits-5",
        title: "РњР°РіР°Р·РёРЅР°Рј РєРѕСЃРјРµС‚РёРєРё Рё СЃРµС‚СЏРј",
        text: "РЈРґРѕР±РЅС‹Р№ С„РѕСЂРјР°С‚ РґР»СЏ Р·Р°РїСѓСЃРєР° private label Рё СЂР°Р·РІРёС‚РёСЏ РЅРѕРІРѕРіРѕ РЅР°РїСЂР°РІР»РµРЅРёСЏ Р±РµР· СЃР»РѕР¶РЅРѕР№ РїСЂРѕРёР·РІРѕРґСЃС‚РІРµРЅРЅРѕР№ Р±Р°Р·С‹.",
        image: "/images/home/who-suits/item-5.png",
        buttonText: "РАССЧИТАТЬ СТОИМОСТЬ",
        buttonLink: "#wholesale-contract",
      },
      {
        id: "who-suits-6",
        title: "РҐРѕС‡Сѓ СЃРІРѕР№ Р±СЂРµРЅРґ!",
        text: "РЎРѕР±РµСЂРµРј РїРѕРґС…РѕРґСЏС‰РёР№ РїСЂРѕРґСѓРєС‚, С‚Р°СЂСѓ Рё СѓРїР°РєРѕРІРєСѓ, С‡С‚РѕР±С‹ РІС‹ Р±С‹СЃС‚СЂРѕ РІС‹С€Р»Рё РЅР° СЂС‹РЅРѕРє СЃРѕ СЃРІРѕРµР№ РєРѕСЃРјРµС‚РёС‡РµСЃРєРѕР№ РјР°СЂРєРѕР№.",
        image: "/images/home/who-suits/item-6.png",
        buttonText: "РАССЧИТАТЬ СТОИМОСТЬ",
        buttonLink: "#wholesale-contract",
      },
    ],
  },
  whyTrustUs: {
    title: "РџРћР§Р•РњРЈ РќРђРњ Р”РћР’Р•Р РЇР®Рў?",
    speedTitle: "Скорость",
    speedFormulaLabel: "Формула 14/30:",
    speedText:
      "14 рабочих дней займет разработка опытных образцов. 30 рабочих дней займет разработка Вашего бренда под ключ.",
    speedFulfillmentText: "Собственный фулфилмент",
    availabilityTitle: "Доступность",
    availabilityText:
      "Минимальная партия - 50 000 ₽. Это самый низкий порог входа для бизнеса в 2026*",
    availabilityNote: "* Согласно данным ЯНДЕКС БИЗНЕС открыть ПВЗ от 550 000 ₽",
    professionalismTitle: "Профессионализм",
    professionalismText:
      "Знаем, как создать успешный косметический бренд, который будет продаваться в Золотом Яблоке или Лэтуаль: EVSI и QTIX - это наши собственные торговые марки.",
    brandLinks: [
      { label: "EVSI в Лэтуаль", href: "https://www.letu.ru/brand/evsi" },
      { label: "EVSI в Золотом Яблоке", href: "https://goldapple.ru/brands/evsi" },
      { label: "QTIX в Лэтуаль", href: "https://www.letu.ru/brand/qti" },
    ],
    points: [
      {
        id: "why-trust-point-1",
        text: "300+ довольных клиентов по всей России и странам СНГ",
      },
      {
        id: "why-trust-point-2",
        text: "Производство в России, собственная лаборатория",
      },
      {
        id: "why-trust-point-3",
        text: "Чистые формулы, разработанные опытными технологами",
      },
      {
        id: "why-trust-point-4",
        text: "Поддержим Вас на всех стадиях: от производства до маркетинга",
      },
    ],
    galleryItems: [
      {
        id: "why-trust-gallery-1",
        image: "/images/home/why-trust-us/item-1.jpg",
        hoverImage: "/images/home/why-trust-us/item-1-hover.jpg",
      },
      {
        id: "why-trust-gallery-2",
        image: "/images/home/why-trust-us/item-2.jpg",
        hoverImage: "/images/home/why-trust-us/item-2-hover.jpg",
      },
      {
        id: "why-trust-gallery-3",
        image: "/images/home/why-trust-us/item-3.jpg",
        hoverImage: "/images/home/why-trust-us/item-3-hover.jpg",
      },
      {
        id: "why-trust-gallery-4",
        image: "/images/home/why-trust-us/item-4.jpg",
        hoverImage: "/images/home/why-trust-us/item-4-hover.jpg",
      },
    ],
  },
  whatWeCanMake: {
    title: "Что мы можем изготовить",
    items: [
      { id: "make-1", title: "Брови и ресницы", image: "/images/home/what-we-can-make/item-1.png", isActive: true },
      { id: "make-2", title: "Уход за лицом", image: "/images/home/what-we-can-make/item-2.png", isActive: true },
      { id: "make-3", title: "Уход за телом", image: "/images/home/what-we-can-make/item-3.png", isActive: true },
      { id: "make-4", title: "Антицеллюлитная серия", image: "/images/home/what-we-can-make/item-4.png", isActive: true },
      { id: "make-5", title: "Уход за волосами", image: "/images/home/what-we-can-make/item-5.png", isActive: true },
      { id: "make-6", title: "Средства для ванны и душа", image: "/images/home/what-we-can-make/item-6.png", isActive: true },
      { id: "make-7", title: "Средства для педикюра", image: "/images/home/what-we-can-make/item-7.png", isActive: true },
      { id: "make-8", title: "Шугаринг и депиляция", image: "/images/home/what-we-can-make/item-8.png", isActive: true },
      { id: "make-9", title: "Средства для кутикулы", image: "/images/home/what-we-can-make/item-9.png", isActive: true },
      { id: "make-10", title: "Солнцезащитная серия", image: "/images/home/what-we-can-make/item-10.png", isActive: true },
      { id: "make-11", title: "Мужская серия", image: "/images/home/what-we-can-make/item-11.png", isActive: true },
      { id: "make-12", title: "Средства для животных", image: "/images/home/what-we-can-make/item-12.png", isActive: true },
    ],
  },
    faq: {
    bigNumber: "12",
    title: "12 вопросов, которые задаёт каждый перед первым заказом",
    description:
      "Мы собрали самые частые вопросы о формуле, таре, объемах и сроках — чтобы вы сэкономили время на переписке и более осознанно приняли решение",
    categories: [
      {
        id: "faq-category-1",
        title: "Про продукт и рецептуры",
        items: [
          {
            id: "faq-1",
            number: "01",
            question: "Можно ли повторить уже существующий продукт?",
            answer: "Да, мы можем обсудить повтор уже существующего продукта или подобрать максимально близкое решение на основе вашей задачи и состава.",
            isActive: true,
          },
          {
            id: "faq-2",
            number: "02",
            question: "Как я могу увидеть составы?",
            answer: "Составы и варианты рецептур обсуждаются на этапе подбора продукта: мы подскажем доступные решения и поможем выбрать оптимальный вариант.",
            isActive: true,
          },
          {
            id: "faq-3",
            number: "03",
            question: "Возможно ли доработать продукт из готовой рецептуры?",
            answer: "Да, готовую рецептуру можно адаптировать под ваши пожелания по текстуре, аромату, активам и позиционированию.",
            isActive: true,
          },
          {
            id: "faq-4",
            number: "04",
            question: "Сколько стоит разработка рецепта?",
            answer: "Стоимость разработки зависит от сложности задачи. На консультации мы поможем оценить бюджет и предложим подходящий формат запуска.",
            isActive: true,
          },
        ],
      },
      {
        id: "faq-category-2",
        title: "Про сырьё и тару",
        items: [
          {
            id: "faq-5",
            number: "05",
            question: "Работаете ли с давальческим сырьём?",
            answer: "Да, такой формат можно обсудить отдельно. Мы заранее проверим совместимость сырья и требования к производственному процессу.",
            isActive: true,
          },
          {
            id: "faq-6",
            number: "06",
            question: "Могу ли отправить вам свою тару или отдушку?",
            answer: "Да, мы можем рассмотреть вашу тару, комплектующие или отдушку и заранее согласовать технические нюансы и совместимость.",
            isActive: true,
          },
          {
            id: "faq-7",
            number: "07",
            question: "Можно ли приобрести продукт на разлив?",
            answer: "Да, для некоторых форматов это возможно. Уточним подходящий вариант в зависимости от продукта, объёма и упаковки.",
            isActive: true,
          },
        ],
      },
      {
        id: "faq-category-3",
        title: "Про деньги, сроки и объёмы",
        items: [
          {
            id: "faq-8",
            number: "08",
            question: "В минимальную сумму заказа входит только один продукт или несколько видов?",
            answer: "Минимальная сумма заказа может распределяться между несколькими позициями — точную конфигурацию мы поможем собрать под вашу задачу.",
            isActive: true,
          },
          {
            id: "faq-9",
            number: "09",
            question: "Какие объёмы вы можете изготовить?",
            answer: "Мы работаем с разными объёмами партий: от стартовых запусков до более крупных тиражей. Подберём формат под ваш канал продаж.",
            isActive: true,
          },
          {
            id: "faq-10",
            number: "10",
            question: "Сколько готовится заказ?",
            answer: "Сроки зависят от выбранного продукта, тары и загрузки производства. На старте проекта мы даём ориентир по срокам и этапам.",
            isActive: true,
          },
          {
            id: "faq-11",
            number: "11",
            question: "Отправляете на маркетплейсы?",
            answer: "Да, мы помогаем подготовить продукцию к отгрузке и учитываем требования маркетплейсов при комплектации заказа.",
            isActive: true,
          },
          {
            id: "faq-12",
            number: "12",
            question: "Возможно ли запросить предварительные расчёты?",
            answer: "Да, вы можете оставить запрос, и мы подготовим предварительный расчёт по вашему продукту, объёму и упаковке.",
            isActive: true,
          },
        ],
      },
    ],
    ctaTitle: "Не нашли ответа на свой вопрос?",
    ctaText: "Нажмите здесь, и мы всё вам расскажем.",
    ctaButtonText: "Задать вопрос",
    ctaButtonLink: "#wholesale-contract",
  },
  leadCta: {
    title: "Оставьте заявку — мы свяжемся в ближайшее время",
    description:
      "Заполните короткую форму, и менеджер свяжется с вами, чтобы ответить на вопросы и предложить варианты сотрудничества.",
    buttonText: "ОСТАВИТЬ ЗАЯВКУ",
    buttonLink: "#wholesale-contract",
  },
  finalBrand: {
    title: "FORMULA72",
  },
  footer: {
    contactsColumnTitle: "КОНТАКТЫ",
    consultationTitle: "Консультация по контрактному производству",
    consultationPhone: "+7 969 907 88 87",
    consultationEmail: "kosmetika72@bk.ru",
    procurementTitle: "Отдел закупок",
    procurementEmail: "kontrakt-kosmetika@mail.ru",
    marketingTitle: "Отдел маркетинга",
    marketingEmail: "evsi@gmail.com",
    workingHours: "график работы с 11:00 до 16:00 по Мск",
    companyColumnTitle: "О КОМПАНИИ",
    companyLinks: [
      { label: "Условия", href: "#" },
      { label: "Вакансии", href: "#" },
      { label: "Сертификаты", href: "#" },
      { label: "Бесплатные материалы для предпринимателей", href: "#" },
      { label: "Разработка дизайна", href: "#" },
    ],
    documentsColumnTitle: "ДОКУМЕНТЫ",
    documentLinks: [
      { label: "Условия обработки персональных данных", href: "/conditionsforprocessingpersonaldata" },
      { label: "Политика обработки персональных данных", href: "/personal_data_processing_policy" },
      { label: "Согласие на обработку персональных данных", href: "/personal_data_processing_consent" },
    ],
    formButtonText: "Оставить заявку",
    formButtonLink: "https://b24-2uwhq2.bitrix24site.ru/?utm_source=website_contract72",
    socialLinks: [
      { label: "WhatsApp", href: "#", enabled: true, icon: undefined, hoverIcon: undefined },
      { label: "Telegram", href: "#", enabled: true, icon: undefined, hoverIcon: undefined },
      { label: "VK", href: "#", enabled: true, icon: undefined, hoverIcon: undefined },
    ],
  },
  floatingContact: {
    enabled: true,
    buttonLabel: "Связь с менеджером",
    items: [
      {
        label: "Telegram",
        href: "https://t.me/formula72",
        enabled: true,
        order: 1,
      },
      {
        label: "MAX",
        href: "https://t.me/formula72_manager",
        enabled: true,
        order: 2,
      },
      {
        label: "VK",
        href: "https://vk.com/kontraktnoe72",
        enabled: true,
        order: 3,
      },
      {
        label: "+7 969 907 88 87",
        href: "tel:+79699078887",
        enabled: true,
        order: 4,
      },
    ],
    showScrollTop: true,
  },
  coverageMap: {
    title: "Formula72",
    subtitle: "РљРѕРЅС‚СЂР°РєС‚РЅРѕРµ РїСЂРѕРёР·РІРѕРґСЃС‚РІРѕ",
    description: "РќР°Рј РґРѕРІРµСЂСЏСЋС‚ С‚С‹СЃСЏС‡Рё РєР»РёРµРЅС‚РѕРІ",
    mapImage: "/images/home/coverage-map/map.png",
    reviews: [
      {
        id: "coverage-review-1",
        name: "Р•Р»РµРЅР°",
        reviewText: "Р’ РІРѕСЃС‚РѕСЂРіРµ! РљР°С‡РµСЃС‚РІРѕ 100%. РЎР°РјРѕРµ Р»СѓС‡С€РµРµ РїСЂРѕРёР·РІРѕРґСЃС‚РІРѕ.",
        rating: 5,
        avatar: "/images/home/coverage-map/default-avatar.png",
        xPosition: 71,
        yPosition: 34,
        isActive: true,
      },
      {
        id: "coverage-review-2",
        name: "Р”Р°СЂСЊСЏ",
        reviewText: "Р’СЃРµ РїРѕРЅСЂР°РІРёР»РѕСЃСЊ! РЎРїР°СЃРёР±Рѕ РјРµРЅРµРґР¶РµСЂСѓ РћР»СЊРіРµ Р·Р° СЃРѕРїСЂРѕРІРѕР¶РґРµРЅРёРµ Р·Р°РєР°Р·Р°.",
        rating: 5,
        avatar: "/images/home/coverage-map/default-avatar.png",
        xPosition: 18,
        yPosition: 56,
        isActive: true,
      },
      {
        id: "coverage-review-3",
        name: "РђРЅРЅР°",
        reviewText: "Р‘С‹СЃС‚СЂРѕ СЃРѕРіР»Р°СЃРѕРІР°Р»Рё РґРµС‚Р°Р»Рё, РїРѕРјРѕРіР»Рё СЃ СѓРїР°РєРѕРІРєРѕР№ Рё РїРѕР»СѓС‡РёР»Рё РѕС‚Р»РёС‡РЅС‹Р№ СЂРµР·СѓР»СЊС‚Р°С‚.",
        rating: 5,
        avatar: "/images/home/coverage-map/default-avatar.png",
        xPosition: 50,
        yPosition: 48,
        isActive: true,
      },
      {
        id: "coverage-review-4",
        name: "РњР°СЂРёСЏ",
        reviewText: "РћС‡РµРЅСЊ Р°РєРєСѓСЂР°С‚РЅР°СЏ СЂР°Р±РѕС‚Р° СЃ Р±СЂРµРЅРґРѕРј Рё СЃС‚Р°Р±РёР»СЊРЅРѕРµ РєР°С‡РµСЃС‚РІРѕ РѕС‚ РїР°СЂС‚РёРё Рє РїР°СЂС‚РёРё.",
        rating: 4,
        avatar: "/images/home/coverage-map/default-avatar.png",
        xPosition: 89,
        yPosition: 58,
        isActive: true,
      },
    ],
  },
};




















