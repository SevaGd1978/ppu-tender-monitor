import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import {
  TENDERS,
  BASE_SOURCES,
  EXTRA_SOURCES,
  ROLE_NOTES,
  RUN_LABEL,
  fmtRub,
  totalActivePrice,
  type CustomerType,
  type Tender,
  type TenderStatus,
} from '@/data/tenders';
import { ExternalLink, Search, Flame, Banknote, CalendarClock, Building2 } from 'lucide-react';

const NOW = new Date('2026-09-27T09:15:00');

function daysLeft(t: Tender): number | null {
  if (!t.deadline) return null;
  return Math.ceil((new Date(t.deadline).getTime() - NOW.getTime()) / 86400000);
}

const STATUS_STYLE: Record<TenderStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
  commission: 'bg-amber-500/10 text-amber-700 border-amber-300',
  closed: 'bg-slate-500/10 text-slate-600 border-slate-300',
};

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('deadline');

  const filtered = useMemo(() => {
    let list = TENDERS.filter((t) => {
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q) ||
        t.noticeNumber.includes(q);
      const matchT = typeFilter === 'all' || t.customerType === typeFilter;
      const matchS = statusFilter === 'all' || t.status === statusFilter;
      return matchQ && matchT && matchS;
    });
    list = [...list].sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'deadline') {
        const da = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const db = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        return da - db;
      }
      return 0;
    });
    return list;
  }, [query, typeFilter, statusFilter, sortBy]);

  const nearest = TENDERS.filter((t) => t.deadline && t.status === 'active')
    .map((t) => ({ t, d: daysLeft(t)! }))
    .sort((a, b) => a.d - b.d)[0];

  const customerTypes: CustomerType[] = ['теплосети', 'генерация', 'МУП', 'федеральный бюджет'];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Мониторинг тендеров: ППУ-изоляция трубопроводов</h1>
            <p className="text-muted-foreground mt-1">{RUN_LABEL} · базовые источники: ЕИС, РосТендер, TenderGuru, Контур.Закупки</p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1">
            44-ФЗ / 223-ФЗ
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Flame className="h-4 w-4 text-orange-500" />} label="Активных закупок" value={String(TENDERS.length)} sub="публикации 22–25.09.2026" />
          <StatCard icon={<Banknote className="h-4 w-4 text-emerald-600" />} label="Сумма НМЦК (приём заявок)" value={fmtRub(totalActivePrice)} />
          <StatCard
            icon={<CalendarClock className="h-4 w-4 text-red-500" />}
            label="Ближайший дедлайн"
            value={nearest ? `${nearest.d} дн.` : '—'}
            sub={nearest ? `${nearest.t.deadlineLabel} · ${nearest.t.customer}` : undefined}
          />
          <StatCard
            icon={<Building2 className="h-4 w-4 text-blue-500" />}
            label="Типы заказчиков"
            value="4"
            sub="теплосети · генерация · МУП · федеральный бюджет"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Поиск: название, заказчик, регион, № извещения" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-52">
              <SelectValue placeholder="Тип заказчика" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы заказчиков</SelectItem>
              {customerTypes.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Приём заявок</SelectItem>
              <SelectItem value="commission">Работа комиссии</SelectItem>
              <SelectItem value="closed">У единственного поставщика</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-52">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">Сначала ближайший дедлайн</SelectItem>
              <SelectItem value="price">Сначала крупная НМЦК</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground ml-auto">Найдено: {filtered.length}</span>
        </div>

        {/* Tenders table */}
        <Card>
          <CardHeader>
            <CardTitle>Список тендеров</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[32%]">Закупка</TableHead>
                  <TableHead>Регион</TableHead>
                  <TableHead>Заказчик</TableHead>
                  <TableHead className="text-right">НМЦК, ₽</TableHead>
                  <TableHead>Процедура / ЭТП</TableHead>
                  <TableHead>Дедлайн</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => {
                  const dl = daysLeft(t);
                  return (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">
                        <div>{t.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {t.law} · извещение № {t.noticeNumber} от {t.published}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{t.region}</TableCell>
                      <TableCell className="text-sm">
                        {t.customer}
                        <div className="text-xs text-muted-foreground">{t.customerType}</div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm whitespace-nowrap">{fmtRub(t.price)}</TableCell>
                      <TableCell className="text-sm">
                        {t.procedure}
                        <div className="text-xs text-muted-foreground">{t.etp}</div>
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        {t.deadlineLabel}
                        {dl !== null && t.status === 'active' && (
                          <Badge variant={dl <= 2 ? 'destructive' : 'secondary'} className="ml-2">
                            {dl} дн.
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={STATUS_STYLE[t.status]}>
                          {t.statusLabel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <a href={t.link} target="_blank" rel="noreferrer" title="Карточка в ЕИС">
                          <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      По заданным фильтрам ничего не найдено.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Roles */}
        <Card>
          <CardHeader>
            <CardTitle>Сводка отдела</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ROLE_NOTES.map((r) => (
              <div key={r.role} className="rounded-lg border p-4 space-y-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{r.role}</div>
                <div className="font-semibold">{r.name}</div>
                <p className="text-sm text-muted-foreground leading-snug">{r.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Источники мониторинга</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-sm font-medium mb-3">Базовые</div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {BASE_SOURCES.map((s) => (
                  <SourceRow key={s.name} {...s} />
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <div className="text-sm font-medium mb-3">Дополнительные площадки</div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {EXTRA_SOURCES.map((s) => (
                  <SourceRow key={s.name} {...s} />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Закупки Т Плюс, МОЭК и РИР Энерго часто идут только на фирменных ЭТП (B2B-Center, ТЭК-Торг, zakupki.mos.ru):
              карточки в ЕИС есть, но требования и документация — на площадке заказчика.
            </p>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground">
          Данные актуальны на момент запуска. Прямой доступ к zakupki.gov.ru с текущего IP ограничен — сверка по агрегатору ЕИС.
          Следующий запуск: сверка с данной сводкой для исключения дубликатов.
        </p>
      </div>
    </div>
  );
}

function SourceRow({ name, url, profile, priority }: { name: string; url: string; profile: string; priority: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex items-start justify-between gap-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
    >
      <div>
        <div className="text-sm font-medium flex items-center gap-1.5">
          {name}
          <ExternalLink className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{profile}</div>
      </div>
      <Badge variant={priority === 'высокий' ? 'default' : 'secondary'} className="shrink-0 text-[10px]">
        {priority}
      </Badge>
    </a>
  );
}
