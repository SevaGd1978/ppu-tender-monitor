export type CustomerType = 'теплосети' | 'генерация' | 'МУП' | 'федеральный бюджет';

export type TenderStatus = 'active' | 'commission' | 'closed';

export interface Tender {
  id: number;
  title: string;
  region: string;
  customer: string;
  customerType: CustomerType;
  price: number;
  law: '44-ФЗ' | '223-ФЗ';
  procedure: string;
  etp: string;
  deadline: string; // ISO
  deadlineLabel: string;
  noticeNumber: string;
  published: string;
  status: TenderStatus;
  statusLabel: string;
  link: string;
}

export const RUN_LABEL = 'Запуск №1 — 27.09.2026, 09:15 (МСК)';

export const TENDERS: Tender[] = [
  {
    id: 1,
    title: 'Поставка фасонных изделий и элементов в ППУ изоляции — филиал «Пермский» (111/27, лот 4613893)',
    region: 'Пермский край',
    customer: 'ПАО «Т Плюс»',
    customerType: 'генерация',
    price: 22504852.0,
    law: '223-ФЗ',
    procedure: 'Запрос цен с ограниченным участием',
    etp: 'B2B-Center',
    deadline: '2026-10-06T12:00',
    deadlineLabel: 'до 06.10.2026, 12:00',
    noticeNumber: '32616404952',
    published: '24.09.2026',
    status: 'active',
    statusLabel: 'Приём заявок',
    link: 'https://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=32616404952',
  },
  {
    id: 2,
    title: 'Поставка фасонных изделий и элементов в ППУ изоляции — филиал «Владимирский» (4613943)',
    region: 'Владимирская обл.',
    customer: 'ПАО «Т Плюс»',
    customerType: 'генерация',
    price: 13600629.79,
    law: '223-ФЗ',
    procedure: 'Запрос цен с ограниченным участием',
    etp: 'B2B-Center',
    deadline: '2026-10-05T14:00',
    deadlineLabel: 'до 05.10.2026, 14:00',
    noticeNumber: '32616404967',
    published: '24.09.2026',
    status: 'active',
    statusLabel: 'Приём заявок',
    link: 'https://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=32616404967',
  },
  {
    id: 3,
    title: 'Фасонные изделия и элементы в ППУ изоляции — филиал «Нижегородский» (4612897)',
    region: 'Нижегородская обл.',
    customer: 'ПАО «Т Плюс»',
    customerType: 'генерация',
    price: 9831126.24,
    law: '223-ФЗ',
    procedure: 'Запрос цен с ограниченным участием',
    etp: 'B2B-Center',
    deadline: '',
    deadlineLabel: '—',
    noticeNumber: '32616340832',
    published: '22.09.2026',
    status: 'commission',
    statusLabel: 'Работа комиссии',
    link: 'https://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=32616340832',
  },
  {
    id: 4,
    title: 'Фасонные изделия и элементы в ППУ изоляции — филиал «Кировский» (9371745, 4612897)',
    region: 'Кировская обл.',
    customer: 'ПАО «Т Плюс»',
    customerType: 'генерация',
    price: 5488787.28,
    law: '223-ФЗ',
    procedure: 'Запрос цен с ограниченным участием',
    etp: '—',
    deadline: '2026-09-29T14:00',
    deadlineLabel: 'до 29.09.2026, 14:00',
    noticeNumber: '32616402520',
    published: '23.09.2026',
    status: 'active',
    statusLabel: 'Приём заявок',
    link: 'https://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=32616402520',
  },
  {
    id: 5,
    title: 'Компенсаторы сильфонные в ППУ изоляции — филиал «Удмуртский» (4615393)',
    region: 'Удмуртия',
    customer: 'ПАО «Т Плюс»',
    customerType: 'генерация',
    price: 3558818.18,
    law: '223-ФЗ',
    procedure: 'Открытый запрос предложений',
    etp: 'B2B-Center',
    deadline: '2026-10-07T11:00',
    deadlineLabel: 'до 07.10.2026, 11:00',
    noticeNumber: '32616409153',
    published: '25.09.2026',
    status: 'active',
    statusLabel: 'Приём заявок',
    link: 'https://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=32616409153',
  },
  {
    id: 6,
    title: 'Работы по ремонту СОДК ППУ-изоляции — филиал №5 (2026VP001992)',
    region: 'Москва',
    customer: 'ПАО «МОЭК»',
    customerType: 'теплосети',
    price: 5432560.0,
    law: '223-ФЗ',
    procedure: 'Открытое маркетинговое исследование',
    etp: 'ЭТП ГПБ',
    deadline: '2026-10-05T10:00',
    deadlineLabel: 'до 05.10.2026, 10:00',
    noticeNumber: '32616411958',
    published: '25.09.2026',
    status: 'active',
    statusLabel: 'Приём заявок',
    link: 'https://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=32616411958',
  },
  {
    id: 7,
    title: 'Поставка стальной электросварной трубы в ППУ ПЭ изоляции и фитингов',
    region: 'Тверская обл.',
    customer: 'ООО «ОЭС Тверской области»',
    customerType: 'теплосети',
    price: 3521880.0,
    law: '223-ФЗ',
    procedure: 'Закупка у единственного поставщика',
    etp: '—',
    deadline: '',
    deadlineLabel: '—',
    noticeNumber: '32616408877',
    published: '25.09.2026',
    status: 'closed',
    statusLabel: 'У единственного поставщика',
    link: 'https://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=32616408877',
  },
  {
    id: 8,
    title: 'Поставка труб ППУ ОЦ и комплектующих (ул. Корнилова, м-он Центральный)',
    region: 'Нижегородская обл., г. Выкса',
    customer: 'АО «Выксатеплоэнерго»',
    customerType: 'теплосети',
    price: 3798229.93,
    law: '223-ФЗ',
    procedure: 'Запрос котировок',
    etp: 'Сбербанк-АСТ (УТП)',
    deadline: '2026-10-02T14:00',
    deadlineLabel: 'до 02.10.2026, 14:00',
    noticeNumber: '32616404675',
    published: '24.09.2026',
    status: 'active',
    statusLabel: 'Приём заявок',
    link: 'https://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=32616404675',
  },
  {
    id: 9,
    title: 'Поставка изделий в ППУ изоляции',
    region: 'Респ. Башкортостан, г. Уфа',
    customer: 'МУП «Уфимские Инженерные Сети»',
    customerType: 'МУП',
    price: 553892.89,
    law: '223-ФЗ',
    procedure: 'Запрос котировок в электронной форме',
    etp: 'ООО «РЭСТ»',
    deadline: '2026-10-01T12:00',
    deadlineLabel: 'до 01.10.2026, 12:00',
    noticeNumber: '32616401885',
    published: '23.09.2026',
    status: 'active',
    statusLabel: 'Приём заявок',
    link: 'https://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=32616401885',
  },
  {
    id: 10,
    title: 'Поставка теплоизоляционной скорлупы ППУ',
    region: 'Дагестан',
    customer: 'ФКУЗ «Дагестанская противочумная станция» Роспотребнадзора',
    customerType: 'федеральный бюджет',
    price: 69496.18,
    law: '44-ФЗ',
    procedure: 'Запрос котировок в электронной форме',
    etp: 'ЭТП ТЭК-Торг',
    deadline: '2026-10-01T09:25',
    deadlineLabel: 'до 01.10.2026, 09:25',
    noticeNumber: '0303100001626000070',
    published: '24.09.2026',
    status: 'active',
    statusLabel: 'Приём заявок',
    link: 'https://zakupki.gov.ru/epz/order/notice/zk20/common-info.html?regNumber=0303100001626000070',
  },
  {
    id: 11,
    title: 'Поставка комплекта заделки стыка 108/200-ППУ-ОЦ',
    region: 'Ярославская обл.',
    customer: 'ФКУ ИК-1 УФСИН России по Ярославской области',
    customerType: 'федеральный бюджет',
    price: 39026.0,
    law: '44-ФЗ',
    procedure: 'Запрос котировок в электронной форме',
    etp: 'Сбербанк-АСТ',
    deadline: '2026-10-01T09:00',
    deadlineLabel: 'до 01.10.2026, 09:00',
    noticeNumber: '0371100005426000061',
    published: '25.09.2026',
    status: 'active',
    statusLabel: 'Приём заявок',
    link: 'https://zakupki.gov.ru/epz/order/notice/zk20/common-info.html?regNumber=0371100005426000061',
  },
];

export interface Source {
  name: string;
  url: string;
  profile: string;
  priority: 'высокий' | 'средний';
}

export const BASE_SOURCES: Source[] = [
  { name: 'ЕИС (zakupki.gov.ru)', url: 'https://zakupki.gov.ru', profile: '44-ФЗ / 223-ФЗ, единый реестр', priority: 'высокий' },
  { name: 'РосТендер', url: 'https://rostender.info', profile: 'агрегатор, все виды торгов', priority: 'средний' },
  { name: 'TenderGuru', url: 'https://www.tenderguru.ru', profile: 'агрегатор, 44-ФЗ / 223-ФЗ', priority: 'средний' },
  { name: 'Контур.Закупки', url: 'https://kontur.ru/zakupki', profile: 'агрегатор с аналитикой', priority: 'средний' },
];

export const EXTRA_SOURCES: Source[] = [
  { name: 'ТЭК-Торг', url: 'https://www.tek-torg.ru', profile: 'профиль ТЭК: теплосети, генерирующие компании', priority: 'высокий' },
  { name: 'Росэлторг (ЕЭТП)', url: 'https://roseltorg.ru', profile: 'крупнейшая ЭТП по 44-ФЗ / 223-ФЗ', priority: 'высокий' },
  { name: 'ЭТП ГПБ', url: 'https://etpgpb.ru', profile: 'энергетика и ЖКХ, трубы ППУ, компенсаторы', priority: 'высокий' },
  { name: 'B2B-Center', url: 'https://www.b2b-center.ru', profile: 'основная площадка ПАО «Т Плюс», РИР Энерго', priority: 'высокий' },
  { name: 'Сбербанк-АСТ', url: 'https://www.sberbank-ast.ru', profile: 'лидер по 44-ФЗ, теплосети и МУП', priority: 'средний' },
  { name: 'РТС-тендер', url: 'https://www.rts-tender.ru', profile: '44-ФЗ / 223-ФЗ, коммунальные заказчики', priority: 'средний' },
  { name: 'Фабрикант', url: 'https://www.fabrikant.ru', profile: 'промышленные заказчики', priority: 'средний' },
  { name: 'НЭБ (бывш. ММВБ)', url: 'https://www.etp-micex.ru', profile: '223-ФЗ, ресурсоснабжающие организации', priority: 'средний' },
  { name: 'Портал поставщиков Москвы', url: 'https://zakupki.mos.ru', profile: 'закупки МОЭК вне ЕИС', priority: 'высокий' },
  { name: 'Оргторг', url: 'https://www.orgtorg.ru', profile: 'Сибирский ФО, региональные теплосети', priority: 'средний' },
];

export interface RoleNote {
  role: string;
  name: string;
  note: string;
}

export const ROLE_NOTES: RoleNote[] = [
  {
    role: 'Поиск закупок',
    name: 'Ольга Реброва',
    note: '11 активных закупок по ППУ-изоляции (публикации 22–25.09.2026). За последние 3 часа новых нет.',
  },
  {
    role: 'Анализ рынка',
    name: 'Дмитрий Костин',
    note: 'Доминируют тепловые сети и генерация (Т Плюс, МОЭК, Выксатеплоэнерго, МУП УИС). НМЦК: от 39 026 ₽ до 22,5 млн ₽.',
  },
  {
    role: 'Юридическая проверка',
    name: 'Марина Азарова',
    note: 'Ближайший дедлайн — 29.09.2026, 14:00. По 44-ФЗ обеспечение заявки не требуется. Красных флагов по заказчикам не выявлено.',
  },
  {
    role: 'Что нужно для участия',
    name: 'Игорь Плахов',
    note: 'Аккредитация на ЭТП ГПБ, B2B-Center, Сбербанк-АСТ (УТП), РТС-тендер, ТЭК-Торг, «РЭСТ». Тверь — только у единственного поставщика.',
  },
  {
    role: 'Статусы тендеров',
    name: 'Светлана Гурьева',
    note: 'Т Плюс (филиал «Нижегородский», № 32616340832) — работа комиссии, отслеживать итоги. Остальные — приём заявок.',
  },
];

export const fmtRub = (n: number) =>
  n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₽';

export const totalActivePrice = TENDERS.filter((t) => t.status === 'active').reduce((s, t) => s + t.price, 0);
