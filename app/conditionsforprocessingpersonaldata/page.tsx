import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { getHomePageData } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Условия обработки персональных данных | Formula72",
  description: "Условия обработки персональных данных на сайте kontraktkosmetika.ru.",
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
};

const sections: DocumentSection[] = [
  {
    title: "1. Общие положения",
    paragraphs: [
      "1.1. Настоящие Условия регулируют правоотношения по обработке персональных данных между Индивидуальным предпринимателем Мельниковой Ольгой Павловной (ОГРН 317723200051251, адрес: 426000, г. Ижевск, ул. Авангардная, д. 14, кв. 115) (далее - Оператор) и пользователем сайта https://kontraktkosmetika.ru (далее - Пользователь).",
      "1.2. Под персональными данными понимается любая информация, относящаяся к прямо или косвенно определенному физическому лицу.",
    ],
  },
  {
    title: "2. Состав персональных данных",
    paragraphs: ["2.1. При взаимодействии с Сайтом Пользователь может предоставлять следующие данные:"],
    bullets: [
      "Фамилия, имя, отчество;",
      "Адрес электронной почты;",
      "Номер контактного телефона;",
      "Иные данные, указанные Пользователем добровольно.",
    ],
    after: [
      "2.2. Оператор не собирает специальные категории персональных данных (раса, национальность, политические взгляды, религиозные убеждения, состояние здоровья, интимная жизнь).",
    ],
  },
  {
    title: "3. Цели обработки",
    paragraphs: ["3.1. Персональные данные обрабатываются в целях:"],
    bullets: [
      "Обработки заявок на обратную связь и заказы;",
      "Информирования о товарах, услугах и акциях;",
      "Оказания консультационной поддержки;",
      "Анализа эффективности работы Сайта;",
      "Исполнения обязательств по договорам;",
      "Выполнения требований законодательства РФ.",
    ],
  },
  {
    title: "4. Способы обработки",
    paragraphs: [
      "4.1. Обработка осуществляется с использованием средств автоматизации (платформа 1С-Битрикс24, системы аналитики) и/или без их использования.",
      "4.2. Оператор вправе привлекать обработчиков на основании договора:",
    ],
    bullets: [
      "ООО «1С-Битрикс» - техническая поддержка платформы;",
      "Платежные агрегаторы - обработка платежей;",
      "Службы доставки - исполнение заказов.",
    ],
    after: ["4.3. Обработчики обязаны соблюдать конфиденциальность и требования 152-ФЗ."],
  },
  {
    title: "5. Передача персональных данных",
    paragraphs: ["5.1. Оператор не передает персональные данные третьим лицам, за исключением:"],
    bullets: [
      "Случаев, предусмотренных законодательством РФ;",
      "Передачи обработчикам в рамках исполнения договора;",
      "Случаев, когда Пользователь дал отдельное согласие на передачу.",
    ],
    after: [
      "5.2. Передача данных в обезличенном виде для аналитики не требует отдельного согласия.",
      "5.3. Передача персональных данных за пределы территории Российской Федерации не осуществляется.",
    ],
  },
  {
    title: "6. Сроки хранения",
    paragraphs: [
      "6.1. Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, но не более 5 (пяти) лет, если иное не установлено законом.",
      "6.2. По истечении срока данные подлежат уничтожению или обезличиванию.",
    ],
  },
  {
    title: "7. Права пользователя",
    paragraphs: ["7.1. Пользователь вправе:"],
    bullets: [
      "Запросить информацию об обработке своих данных;",
      "Потребовать уточнения, блокирования или уничтожения данных;",
      "Отозвать согласие на обработку;",
      "Обратиться в Роскомнадзор или суд для защиты прав.",
    ],
    after: [
      "7.2. Запросы направляются на адрес: kosmetika72@bk.ru с темой: «Запрос по персональным данным». Ответ предоставляется в срок не более 30 (тридцати) календарных дней.",
    ],
  },
  {
    title: "8. Коммерческие рассылки",
    paragraphs: [
      "8.1. Подписка на рекламно-информационные рассылки осуществляется на основании отдельного согласия Пользователя.",
      "8.2. В каждом письме содержится ссылка для отписки. Отказ от рассылок не влияет на возможность получения основных услуг.",
    ],
  },
  {
    title: "9. Технические данные",
    paragraphs: ["9.1. При посещении Сайта автоматически собираются технические данные:"],
    bullets: ["IP-адрес;", "Информация о браузере и устройстве;", "Данные cookies."],
    after: [
      "9.2. Cookies используются исключительно для обеспечения технической работоспособности Сайта и не содержат конфиденциальной информации. Аналитические и рекламные файлы cookie применяются только при наличии вашего согласия.",
    ],
  },
  {
    title: "10. Защита данных",
    paragraphs: [
      "10.1. Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования и распространения.",
    ],
  },
  {
    title: "11. Заключительные положения",
    paragraphs: [
      "11.1. Настоящие Условия вступают в силу с момента их размещения на Сайте и действуют бессрочно до принятия новой редакции.",
      "11.2. Оператор оставляет за собой право вносить изменения в Условия. Актуальная версия доступна по адресу: https://kontraktkosmetika.ru/conditionsforprocessingpersonaldata",
      "11.3. Все вопросы направляйте на адрес: kosmetika72@bk.ru",
    ],
  },
];

const contacts = [
  "ИП Мельникова Ольга Павловна",
  "ОГРН: 317723200051251",
  "Адрес: 426000, г. Ижевск, ул. Авангардная, д. 14, кв. 115",
];

export const dynamic = "force-dynamic";

export default async function PersonalDataConditionsPage() {
  const data = await getHomePageData();
  const logoImage = data.siteHeader.logoImage || "/images/home/hero/logo1.png";

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
              Условия обработки персональных данных
            </h1>
            <p className="mt-5 max-w-[720px] text-[16px] leading-[1.65] text-[#6F5A54]/82 sm:text-[18px]">
              Документ описывает, какие персональные данные обрабатывает Оператор, для каких целей они используются, как защищаются и какие права есть у Пользователя.
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
