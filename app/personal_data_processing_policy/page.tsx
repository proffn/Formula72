import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { getHomePageData } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных | Formula72",
  description: "Политика в отношении обработки персональных данных на сайте kontraktkosmetika.ru.",
};

const documentMeta = [
  { label: "Версия документа", value: "06052026" },
  { label: "Дата вступления в силу", value: "«6» мая 2026 г." },
  { label: "Оператор", value: "ИП Мельникова Ольга Павловна" },
];

type DocumentSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  after?: string[];
  extraBullets?: string[];
  extraAfter?: string[];
};

const sections: DocumentSection[] = [
  {
    title: "1. Общие положения",
    paragraphs: [
      "1.1. Настоящая Политика составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» (далее - Закон) и определяет порядок обработки персональных данных и меры по обеспечению их безопасности, предпринимаемые Индивидуальным предпринимателем Мельниковой Ольгой Павловной (ОГРН 317723200051251, адрес: 426000, г. Ижевск, ул. Авангардная, д. 14, кв. 115) (далее - Оператор).",
      "1.2. Политика применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://kontraktkosmetika.ru (далее - Сайт).",
      "1.3. Оператор ставит своей целью соблюдение прав и свобод человека при обработке персональных данных, включая защиту права на неприкосновенность частной жизни.",
    ],
  },
  {
    title: "2. Основные понятия",
    paragraphs: [
      "2.1. Персональные данные - любая информация, относящаяся к прямо или косвенно определенному физическому лицу.",
      "2.2. Обработка персональных данных - любое действие с персональными данными: сбор, запись, хранение, использование, передача, обезличивание, блокирование, удаление, уничтожение.",
      "2.3. Субъект персональных данных - физическое лицо, чьи данные обрабатываются.",
    ],
  },
  {
    title: "3. Цели обработки персональных данных",
    paragraphs: ["3.1. Оператор обрабатывает персональные данные исключительно в следующих целях:"],
    bullets: [
      "Обработка заявок и обращений пользователей;",
      "Информирование о товарах, услугах и акциях Оператора;",
      "Оказание консультационной и технической поддержки;",
      "Анализ эффективности работы Сайта и улучшение пользовательского опыта;",
      "Исполнение договорных обязательств;",
      "Выполнение требований законодательства РФ.",
    ],
    after: [
      "3.2. Обработка специальных категорий персональных данных (раса, здоровье, убеждения и т.п.) не осуществляется.",
      "3.3. Информирование о товарах, услугах и акциях осуществляется исключительно на основании отдельного согласия Пользователя, которое может быть отозвано в любой момент.",
    ],
  },
  {
    title: "4. Правовые основания обработки",
    paragraphs: ["4.1. Обработка осуществляется на основании:"],
    bullets: [
      "Согласия субъекта персональных данных;",
      "Договора, стороной которого является субъект;",
      "Иных оснований, прямо предусмотренных законодательством Российской Федерации.",
    ],
  },
  {
    title: "5. Условия и способы обработки",
    paragraphs: [
      "5.1. Обработка осуществляется с использованием средств автоматизации (1С-Битрикс24, системы аналитики) и/или без таковых.",
      "5.2. Оператор обеспечивает конфиденциальность персональных данных и принимает необходимые организационные и технические меры защиты, включая:",
    ],
    bullets: [
      "Ограничение доступа к данным;",
      "Использование защищенных каналов связи;",
      "Регулярное резервное копирование;",
      "Обучение сотрудников.",
    ],
    after: [
      "5.3. Передача данных третьим лицам осуществляется только:",
    ],
    extraBullets: [
      "С согласия субъекта;",
      "В рамках исполнения договора (платежные системы, службы доставки);",
      "По требованию уполномоченных государственных органов в установленных законом случаях.",
    ],
    extraAfter: [
      "5.4. Передача персональных данных за пределы территории Российской Федерации не осуществляется.",
    ],
  },
  {
    title: "6. Сроки обработки и хранения",
    paragraphs: [
      "6.1. Персональные данные хранятся и обрабатываются в течение срока, необходимого для достижения целей обработки, но не более 5 (пяти) лет, если иное не установлено законодательством или договором.",
      "6.2. По достижении целей обработки или истечении срока хранения данные подлежат уничтожению или обезличиванию.",
    ],
  },
  {
    title: "7. Права субъекта персональных данных",
    paragraphs: ["7.1. Субъект имеет право:"],
    bullets: [
      "На доступ к своим данным, включая право получать сведения об их обработке;",
      "На уточнение, блокирование, уничтожение своих данных;",
      "На отзыв согласия на обработку;",
      "На защиту своих прав в Роскомнадзоре или в суде.",
    ],
    after: [
      "7.2. Для реализации прав субъект может направить запрос на адрес: kosmetika72@bk.ru с темой «Запрос субъекта персональных данных».",
      "7.3. Ответ на запрос предоставляется в срок не более 30 дней с момента получения.",
    ],
  },
  {
    title: "8. Заключительные положения",
    paragraphs: [
      "8.1. Политика размещена в свободном доступе на Сайте и действует бессрочно до принятия новой редакции.",
      "8.2. Оператор оставляет за собой право вносить изменения в Политику. Актуальная версия всегда доступна по адресу: https://kontraktkosmetika.ru/personal_data_processing_policy",
      "8.3. Все вопросы, связанные с обработкой персональных данных, направляйте на адрес: kosmetika72@bk.ru",
    ],
  },
];

const contacts = [
  "ИП Мельникова Ольга Павловна",
  "ОГРН: 317723200051251",
  "Адрес: 426000, г. Ижевск, ул. Авангардная, д. 14, кв. 115",
];

export const dynamic = "force-dynamic";

export default async function PersonalDataProcessingPolicyPage() {
  const data = await getHomePageData();
  const logoImage = data.siteHeader.logoImage || "/images/home/hero/logo3.png";

  return (
    <>
      <main className="min-h-screen overflow-hidden bg-[#F7F2EE] text-[#63504A]">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.86),transparent_62%)]" />
          <div className="absolute left-[-14rem] top-20 h-[30rem] w-[30rem] rounded-full bg-[#E8D8CF]/40 blur-3xl" />
          <div className="absolute right-[-12rem] top-80 h-[28rem] w-[28rem] rounded-full bg-white/60 blur-3xl" />

          <div className="relative mx-auto w-full max-w-[1120px] px-4 py-5 sm:px-6 lg:px-8">
            <header className="flex items-center justify-between gap-4">
              <Link
                href="/"
                aria-label="На главную"
                className="relative block h-[54px] w-[132px] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.02]"
              >
                <Image
                  src={logoImage}
                  alt="Formula72"
                  fill
                  priority
                  unoptimized
                  className="object-contain object-left"
                />
              </Link>
              <Link
                href="/"
                className="rounded-full border border-[#63504A]/14 bg-white/56 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.04em] text-[#63504A] shadow-[0_12px_28px_rgba(99,80,74,0.1)] transition duration-300 ease-out hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_16px_34px_rgba(99,80,74,0.14)]"
              >
                На главную
              </Link>
            </header>

            <section className="pb-10 pt-14 sm:pb-12 sm:pt-[4.5rem] lg:pt-20">
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#8D7770]">Документы</p>
              <h1 className="mt-4 max-w-[980px] text-[clamp(1.9rem,4.2vw,3.8rem)] font-bold uppercase leading-[0.96] tracking-[-0.045em] text-[#63504A]">
                Политика в отношении обработки персональных данных
              </h1>
              <p className="mt-5 max-w-[720px] text-[16px] leading-[1.65] text-[#6F5A54]/82 sm:text-[18px]">
                Документ определяет порядок обработки персональных данных, цели, правовые основания, меры защиты и права субъектов персональных данных.
              </p>
            </section>

            <section className="grid gap-3 sm:grid-cols-3">
              {documentMeta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[18px] border border-[#7C6259]/12 bg-white/62 px-5 py-4 shadow-[0_16px_42px_rgba(99,80,74,0.09)] backdrop-blur"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8D7770]/78">{item.label}</p>
                  <p className="mt-2 text-[15px] font-bold leading-[1.35] text-[#5B4842]">{item.value}</p>
                </div>
              ))}
            </section>

            <article className="mt-5 rounded-[28px] border border-[#7C6259]/12 bg-white/76 p-5 shadow-[0_24px_70px_rgba(99,80,74,0.12)] backdrop-blur sm:p-8 lg:p-10">
              <div className="space-y-8">
                {sections.map((section) => (
                  <section key={section.title} className="border-b border-[#7C6259]/12 pb-8 last:border-b-0 last:pb-0">
                    <h2 className="text-[22px] font-bold uppercase leading-[1.08] tracking-[-0.04em] text-[#5B4842] sm:text-[26px]">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-3 text-[15px] leading-[1.7] text-[#63504A]/88 sm:text-[16px]">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets ? (
                        <ul className="grid gap-2 pl-1">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#63504A]/58" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.after?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.extraBullets ? (
                        <ul className="grid gap-2 pl-1">
                          {section.extraBullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#63504A]/58" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.extraAfter?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </article>

            <section className="mb-14 mt-5 rounded-[28px] bg-[#63504A] p-5 text-[#F7F2EE] shadow-[0_24px_60px_rgba(70,51,45,0.22)] sm:p-7 lg:mb-[4.5rem]">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#F7F2EE]/70">Контактные данные Оператора</p>
              <div className="mt-4 grid gap-2 text-[15px] leading-[1.55] sm:text-[16px]">
                {contacts.map((contact) => (
                  <p key={contact}>{contact}</p>
                ))}
                <a
                  href="mailto:kosmetika72@bk.ru"
                  className="font-bold text-white underline decoration-[#F7F2EE]/35 underline-offset-4 transition hover:decoration-white"
                >
                  Email: kosmetika72@bk.ru
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter section={data.footer} />
    </>
  );
}
