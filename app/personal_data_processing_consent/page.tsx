import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { getHomePageData } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных | Formula72",
  description: "Согласие на обработку персональных данных на сайте kontraktkosmetika.ru.",
};

const documentMeta = [
  { label: "Версия документа", value: "06052026" },
  { label: "Дата вступления в силу", value: "«6» мая 2026 г." },
  { label: "Место подписания", value: "г. Ижевск" },
];

type DocumentSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  after?: string[];
  extraBullets?: string[];
};

const intro = [
  "Настоящим, в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006 г., я, действуя свободно, своей волей и в своем интересе, выражаю безусловное согласие на обработку моих персональных данных Индивидуальному предпринимателю Мельниковой Ольге Павловне (ОГРН 317723200051251), зарегистрированному по адресу: 426000, г. Ижевск, Республика Удмуртия, ул. Авангардная, д. 14, кв. 115 (далее - Оператор).",
  "Данное согласие предоставляется мною при заполнении электронной формы на официальном сайте Оператора в сети «Интернет» по адресу: https://kontraktkosmetika.ru (далее - Сайт). Отправка формы означает мое полное ознакомление с условиями настоящего Согласия и Политики обработки персональных данных, размещенной по адресу: https://kontraktkosmetika.ru/personal_data_processing_policy.",
];

const sections: DocumentSection[] = [
  {
    title: "1. Состав и цели обработки персональных данных",
    paragraphs: [
      "1.1. Под персональными данными понимается информация, которую я предоставляю Оператору через формы на Сайте, включая:",
    ],
    bullets: [
      "Фамилию, имя, отчество;",
      "Адрес электронной почты;",
      "Номер контактного телефона;",
      "Иные данные, указанные мной добровольно.",
    ],
    after: ["1.2. Оператор обрабатывает персональные данные в целях:"],
    extraBullets: [
      "Регистрации и обработки заявок на обратную связь, консультации или заказы;",
      "Исполнения обязательств по договорам, стороной которых я являюсь;",
      "Информирования о товарах, услугах, акциях и изменениях на Сайте;",
      "Оказания технической и консультационной поддержки;",
      "Улучшения качества обслуживания, анализа эффективности работы Сайта;",
      "Выполнения требований законодательства Российской Федерации.",
    ],
  },
  {
    title: "2. Условия и способы обработки",
    paragraphs: [
      "2.1. Обработка осуществляется с использованием средств автоматизации и/или без их использования, включая: сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, обезличивание, блокирование, удаление и уничтожение.",
      "2.2. Оператор вправе поручить обработку персональных данных третьим лицам на основании договора, в том числе:",
    ],
    bullets: [
      "ООО «1С-Битрикс» - для обеспечения технической поддержки платформы 1С-Битрикс24;",
      "Платежным системам и банкам - для проведения расчетов;",
      "Службам доставки и логистическим партнерам - для исполнения заказов.",
    ],
    after: [
      "2.3. Передача данных третьим лицам осуществляется исключительно в объемах, необходимых для достижения целей обработки, при условии соблюдения ими требований законодательства РФ о конфиденциальности.",
    ],
  },
  {
    title: "3. Маркетинговые коммуникации",
    paragraphs: [
      "3.1. Я согласен(на), что Оператор может направлять мне рекламно-информационные сообщения о товарах, услугах, акциях и специальных предложениях следующими способами:",
    ],
    bullets: [
      "☐ по электронной почте - на адрес, который я указал(а) в поле «E-mail» настоящей формы;",
      "☐ посредством СМС - на номер телефона, который я указал(а) в поле «Телефон» настоящей формы;",
      "☐ посредством телефонных звонков - на номер, который я указал(а) в поле «Телефон» настоящей формы.",
    ],
    after: [
      "3.2. Я понимаю, что могу выбрать один, несколько или все каналы связи, отметив соответствующие чек-боксы в форме заявки на настоящем сайте.",
      "3.3. Данное согласие является отдельным от согласия на обработку персональных данных и может быть отозвано независимо, в том числе частично (например, только в отношении СМС или только звонков).",
      "3.4. Отказ от получения маркетинговых сообщений не влияет на возможность использования основных функций Сайта и получения консультационных услуг Оператора.",
    ],
  },
  {
    title: "4. Срок действия и порядок отзыва согласия",
    paragraphs: [
      "4.1. Настоящее Согласие действует в течение 5 (пяти) лет с даты его предоставления. По истечении указанного срока обработка персональных данных прекращается, если я не предоставлю новое согласие.",
      "4.2. Согласие может быть отозвано мной в любой момент путем:",
    ],
    bullets: [
      "Направления письменного уведомления на адрес электронной почты Оператора: kosmetika72@bk.ru с темой письма: «Отзыв согласия на обработку персональных данных»;",
      "Использования ссылки «Отписаться» в рекламных письмах;",
      "Обращения через форму обратной связи на Сайте.",
    ],
    after: [
      "4.3. В случае отзыва согласия Оператор обязуется прекратить обработку и уничтожить персональные данные в срок не более 30 (тридцати) календарных дней, если иное не предусмотрено законодательством РФ или действующими договорами.",
    ],
  },
  {
    title: "5. Права субъекта персональных данных",
    paragraphs: ["5.1. Я имею право:"],
    bullets: [
      "На доступ к своим персональным данным и получение сведений об их обработке;",
      "На уточнение, блокирование, удаление или обезличивание моих данных;",
      "На отзыв настоящего согласия;",
      "На защиту своих прав в Роскомнадзоре или в судебном порядке.",
    ],
    after: [
      "5.2. Запросы, связанные с реализацией моих прав, направляются на адрес: kosmetika72@bk.ru. Ответ предоставляется в срок не более 30 (тридцати) календарных дней с момента получения запроса.",
    ],
  },
  {
    title: "6. Заключительные положения",
    paragraphs: [
      "6.1. Настоящее Согласие является информированным, конкретным и сознательным. Я подтверждаю, что ознакомлен(а) с Политикой обработки персональных данных Оператора.",
      "6.2. Проставление отметки в чек-боксе на Сайте и нажатие кнопки «Отправить» является аналогом собственноручной подписи и означает полное принятие условий настоящего Согласия.",
      "6.3. Все споры и разногласия разрешаются в соответствии с законодательством Российской Федерации.",
    ],
  },
];

const contacts = [
  "ИП Мельникова Ольга Павловна",
  "ОГРН: 317723200051251",
  "Адрес: 426000, г. Ижевск, ул. Авангардная, д. 14, кв. 115",
];

export const dynamic = "force-dynamic";

export default async function PersonalDataProcessingConsentPage() {
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
                Согласие на обработку персональных данных
              </h1>
              <p className="mt-5 max-w-[720px] text-[16px] leading-[1.65] text-[#6F5A54]/82 sm:text-[18px]">
                Документ фиксирует добровольное согласие субъекта на обработку персональных данных, правила маркетинговых коммуникаций и порядок отзыва согласия.
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
              <div className="mb-8 flex flex-col gap-2 border-b border-[#7C6259]/12 pb-6 text-[15px] font-bold uppercase tracking-[0.04em] text-[#5B4842] sm:flex-row sm:items-center sm:justify-between">
                <span>г. Ижевск</span>
                <span>«6» мая 2026 г.</span>
              </div>

              <div className="mb-8 space-y-3 border-b border-[#7C6259]/12 pb-8 text-[15px] leading-[1.7] text-[#63504A]/88 sm:text-[16px]">
                {intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="space-y-8">
                {sections.map((section) => (
                  <section
                    key={section.title}
                    className="border-b border-[#7C6259]/12 pb-8 last:border-b-0 last:pb-0"
                  >
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
