import { useEffect, useState, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  Bot,
  Check,
  Circle,
  FileText,
  Loader2,
  RotateCcw,
  Send,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { SCENARIOS, getScenario } from "@/lib/simulation/scenarios";
import type {
  AlarmEntry,
  CoachOutput,
  DebriefReport,
  LoggedAction,
  PlantState,
} from "@/lib/simulation/types";

export function Panel({
  title,
  className,
  children,
  extra,
}: {
  title: string;
  className?: string;
  extra?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-surface p-3 panel-chrome",
        className,
      )}
    >
      <header className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-[11px] font-bold tracking-[0.12em] text-muted uppercase">{title}</h2>
        {extra}
      </header>
      {children}
    </section>
  );
}

export function RangeSlider({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const [local, setLocal] = useState(value);
  const [drag, setDrag] = useState(false);
  useEffect(() => {
    if (!drag) setLocal(value);
  }, [value, drag]);
  return (
    <input
      type="range"
      className="prop-slider"
      min={0}
      max={100}
      value={local}
      disabled={disabled}
      onPointerDown={() => setDrag(true)}
      onChange={(e) => setLocal(Number(e.target.value))}
      onPointerUp={(e) => {
        setDrag(false);
        onChange(Number((e.target as HTMLInputElement).value));
      }}
      onBlur={(e) => {
        setDrag(false);
        onChange(Number((e.target as HTMLInputElement).value));
      }}
      style={{
        background: `linear-gradient(to right, var(--color-slider-fill) ${local}%, var(--color-slider-track) ${local}%)`,
      }}
    />
  );
}

function ModeBtn({
  active,
  tone,
  onClick,
  children,
}: {
  active: boolean;
  tone: "ok" | "warn" | "danger";
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 px-2 py-2 text-[11px] font-semibold transition-colors",
        active && tone === "ok" && "bg-ok text-bg",
        active && tone === "warn" && "bg-warn text-bg",
        active && tone === "danger" && "bg-danger text-fg",
        !active && "text-subtle hover:bg-surface-2 hover:text-muted",
      )}
    >
      {children}
    </button>
  );
}

const TITLES: Record<string, string> = {
  h1: "Сырьевой насос Н-1",
  e1: "Электродегидратор Э-1",
  fcv: "Клапан сырья FCV-1",
  k1: "Колонна К-1",
  pcv: "Сброс на факел PCV-221",
  avz: "Аппарат возд. охлаждения АВЗ-1",
  h3: "Насос куба К-1 Н-3",
  trc3: "Печь П-3 / регулятор TRC-3",
  k2: "Колонна К-2",
  h2: "Насос куба К-2 Н-2",
};

export function PropertiesPanel({
  state,
  active,
  cmd,
}: {
  state: PlantState;
  active: string | null;
  cmd: (action: string, value?: number | null) => void;
}) {
  return (
    <Panel title={active ? TITLES[active] ?? "Объект" : "Свойства объекта"} className="area-props">
      <div className="panel-scroll min-h-0 flex-1 pr-1">
        {!active && (
          <div className="flex h-full items-center justify-center rounded-md border border-dashed border-border px-4 py-8 text-center text-[13px] text-subtle">
            Выберите аппарат на мнемосхеме
          </div>
        )}
        {active === "h1" && <PumpBlock on={state.pump_H1} onStart={() => cmd("set_pump_h1", 1)} onStop={() => cmd("set_pump_h1", 0)} />}
        {active === "h2" && <PumpBlock on={state.pump_H2} onStart={() => cmd("set_pump_h2", 1)} onStop={() => cmd("set_pump_h2", 0)} />}
        {active === "h3" && <PumpBlock on={state.pump_H3} onStart={() => cmd("set_pump_h3", 1)} onStop={() => cmd("set_pump_h3", 0)} />}
        {active === "e1" && (
          <div className="flex flex-col gap-2">
            {state.voltage_E1 === 0 && (
              <div className="rounded-md bg-danger px-3 py-2 text-center text-[12px] font-bold text-fg">
                Напряжение отключено. Слейте воду.
              </div>
            )}
            <PropCard>
              <PropHead label="Напряжение" value={`${state.voltage_E1.toFixed(1)} кВ`} ok={state.voltage_E1 > 0} />
              <button
                type="button"
                className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-[12px] font-semibold text-accent disabled:opacity-40"
                disabled={state.water_level_E1 >= 80}
                onClick={() => cmd("restore_voltage")}
              >
                Восстановить 4.8 кВ
              </button>
            </PropCard>
            <PropCard>
              <PropHead label="Дренаж воды" value={`${state.valve_drain_E1.toFixed(1)} %`} />
              <RangeSlider value={state.valve_drain_E1} onChange={(v) => cmd("set_drain_e1", v)} />
            </PropCard>
            <PropCard>
              <PropHead label="Деэмульгатор" value={`${state.demulsifier_feed.toFixed(1)} кг/ч`} />
              <RangeSlider value={state.demulsifier_feed} onChange={(v) => cmd("set_demulsifier", v)} />
            </PropCard>
          </div>
        )}
        {active === "fcv" && (
          <PropCard>
            <PropHead label="Открытие клапана" value={`${state.valve_feed.toFixed(1)} %`} />
            <RangeSlider value={state.valve_feed} onChange={(v) => cmd("set_feed_valve", v)} />
          </PropCard>
        )}
        {active === "k1" && (
          <PropCard>
            <PropHead label="Уровень" value={`${state.level_K1.toFixed(1)} %`} ok={state.level_K1 < 90 && state.level_K1 > 10} />
            <PropHead label="Давление" value={`${state.pressure_K1.toFixed(2)} кгс`} ok={state.pressure_K1 < 4} />
            <PropHead label="Темп. верха" value={`${state.temp_top_K1.toFixed(1)} °C`} ok={state.temp_top_K1 < 145} />
          </PropCard>
        )}
        {active === "k2" && (
          <PropCard>
            <PropHead label="Уровень" value={`${state.level_K2.toFixed(1)} %`} ok={state.level_K2 < 90 && state.level_K2 > 10} />
            <PropHead label="Давление" value={`${state.pressure_K2.toFixed(2)} кгс`} ok={state.pressure_K2 < 1.8} />
            <PropHead label="Темп. куб" value={`${state.temp_K2.toFixed(1)} °C`} ok />
          </PropCard>
        )}
        {active === "pcv" && (
          <div>
            {state.pcv_stuck && (
              <div className="mb-2 rounded-md bg-danger px-3 py-2 text-center text-[12px] font-bold text-fg">
                Клапан заклинил
              </div>
            )}
            <PropCard>
              <PropHead label="Сброс газа" value={`${state.pcv_221.toFixed(1)} %`} />
              <RangeSlider value={state.pcv_221} onChange={(v) => cmd("set_pcv", v)} disabled={state.pcv_stuck} />
            </PropCard>
          </div>
        )}
        {active === "avz" && (
          <div>
            {state.avz_broken && (
              <div className="mb-2 rounded-md bg-danger px-3 py-2 text-center text-[12px] font-bold text-fg">
                Отказ двигателя
              </div>
            )}
            <PropCard>
              <PropHead label="Обороты вентилятора" value={`${state.avz_1.toFixed(0)} %`} />
              <RangeSlider value={state.avz_1} onChange={(v) => cmd("set_avz", v)} disabled={state.avz_broken} />
            </PropCard>
          </div>
        )}
        {active === "trc3" && (
          <div className="flex flex-col gap-2">
            {state.gas_stuck && (
              <div className="rounded-md bg-danger px-3 py-2 text-center text-[12px] font-bold text-fg">
                Клапан заклинил на 100%
              </div>
            )}
            <PropCard>
              <PropHead label="Режим" value={state.TRC3_mode === "AUTO" ? "АВТО" : "РУЧНОЙ"} ok={state.TRC3_mode === "AUTO"} />
              <div className="flex overflow-hidden rounded-md border border-border">
                <ModeBtn active={state.TRC3_mode === "AUTO"} tone="ok" onClick={() => cmd("set_trc3_mode", 1)}>
                  АВТО
                </ModeBtn>
                <ModeBtn active={state.TRC3_mode === "MANUAL"} tone="warn" onClick={() => cmd("set_trc3_mode", 0)}>
                  РУЧНОЙ
                </ModeBtn>
              </div>
            </PropCard>
            <PropCard>
              <PropHead label="Температура" value={`${state.temp_P3.toFixed(1)} °C`} ok={state.temp_P3 < 340} />
            </PropCard>
            <PropCard>
              <PropHead label="Подача газа" value={`${state.valve_gas.toFixed(1)} %`} />
              <RangeSlider
                value={state.valve_gas}
                onChange={(v) => cmd("set_gas_valve", v)}
                disabled={state.TRC3_mode === "AUTO" || state.gas_stuck}
              />
            </PropCard>
          </div>
        )}
      </div>
    </Panel>
  );
}

function PumpBlock({ on, onStart, onStop }: { on: boolean; onStart: () => void; onStop: () => void }) {
  return (
    <PropCard>
      <PropHead label="Состояние" value={on ? "РАБОТА" : "СТОП"} ok={on} />
      <div className="flex overflow-hidden rounded-md border border-border">
        <ModeBtn active={on} tone="ok" onClick={onStart}>
          ПУСК
        </ModeBtn>
        <ModeBtn active={!on} tone="danger" onClick={onStop}>
          СТОП
        </ModeBtn>
      </div>
    </PropCard>
  );
}

function PropCard({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 flex flex-col gap-2 rounded-md border border-border bg-bg/60 p-3">{children}</div>
  );
}

function PropHead({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span className="text-muted">{label}</span>
      <span className={cn("font-mono font-bold", ok === false ? "text-danger" : ok ? "text-ok" : "text-fg")}>
        {value}
      </span>
    </div>
  );
}

function vibTone(on: boolean, vib: number) {
  if (!on || vib > 7) return "bg-danger";
  if (vib > 4) return "bg-warn";
  return "bg-ok";
}

export function DiagPanel({ state }: { state: PlantState }) {
  const rows = [
    { name: "Н-1 сырьё", on: state.pump_H1, vib: state.vib_H1 },
    { name: "Н-3 куб К-1", on: state.pump_H3, vib: state.vib_H3 },
    { name: "Н-2 куб К-2", on: state.pump_H2, vib: state.vib_H2 },
  ];
  return (
    <Panel title="Система Компакс" className="area-diag">
      <div className="panel-scroll flex min-h-0 flex-1 flex-col gap-2">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-md border border-border bg-bg/50 px-3 py-2.5 text-[12px]"
          >
            <span className="flex items-center gap-2">
              <span className={cn("inline-block size-2 rounded-full", vibTone(r.on, r.vib))} />
              {r.name}
            </span>
            <span className={cn("font-mono font-bold", !r.on || r.vib > 7 ? "text-danger" : r.vib > 4 ? "text-warn" : "text-ok")}>
              {r.vib.toFixed(2)} мм/с
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function InstructorPanel({
  onScenario,
  onReset,
}: {
  onScenario: (id: string) => void;
  onReset: () => void;
}) {
  return (
    <Panel title="Сценарии инструктора" className="area-instructor bg-instructor">
      <div className="panel-scroll grid min-h-0 flex-1 grid-cols-2 content-start gap-2 pr-1">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onScenario(s.id)}
            className={cn(
              "rounded-md border px-2 py-2 text-[11px] font-semibold leading-tight",
              s.tone === "danger"
                ? "border-danger/50 bg-danger/10 text-danger hover:bg-danger/20"
                : "border-warn/50 bg-warn/10 text-warn hover:bg-warn/20",
            )}
          >
            {s.title}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 flex items-center justify-center gap-2 rounded-md border border-ok/40 bg-ok/10 px-3 py-2 text-[12px] font-semibold text-ok hover:bg-ok/20"
      >
        <RotateCcw className="size-3.5" />
        Сбросить установку
      </button>
    </Panel>
  );
}

export function AlarmsPanel({
  alarms,
  onAck,
}: {
  alarms: AlarmEntry[];
  onAck: (id: string) => void;
}) {
  return (
    <Panel
      title="Журнал тревог"
      className="area-alarms"
      extra={
        alarms.some((a) => !a.ack) ? (
          <span className="rounded-sm bg-danger/20 px-1.5 py-0.5 font-mono text-[10px] text-danger">
            {alarms.filter((a) => !a.ack).length}
          </span>
        ) : null
      }
    >
      <ul className="panel-scroll m-0 min-h-0 flex-1 list-none p-0">
        {alarms.length === 0 ? (
          <li className="text-[12px] text-subtle">Активных тревог нет</li>
        ) : (
          alarms.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => onAck(a.id)}
                className={cn(
                  "mb-1.5 w-full rounded-r-md border-l-4 border-danger px-3 py-2 text-left text-[12px] text-danger/90",
                  a.ack ? "bg-danger/5" : "unacked",
                )}
              >
                <div className="mb-1 font-mono text-[10px] text-muted">{a.time}</div>
                {a.text}
              </button>
            </li>
          ))
        )}
      </ul>
    </Panel>
  );
}

export function AiPanel({
  coach,
  scenarioId,
  actions,
  question,
  setQuestion,
  chat,
  asking,
  onAsk,
  onDebrief,
  debriefing,
}: {
  coach: CoachOutput;
  scenarioId: string | null;
  actions: LoggedAction[];
  question: string;
  setQuestion: (v: string) => void;
  chat: { role: "user" | "assistant"; text: string }[];
  asking: boolean;
  onAsk: () => void;
  onDebrief: () => void;
  debriefing: boolean;
}) {
  const sc = getScenario(scenarioId);
  return (
    <Panel
      title="ИИ-модуль"
      className="area-ai"
      extra={
        <span className="flex items-center gap-1 text-[10px] text-muted">
          <Bot className="size-3.5 text-accent" />
          L3 анализ
        </span>
      }
    >
      <div className="panel-scroll">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <LevelChip ok label="L1 физика" />
          <LevelChip ok={Boolean(sc)} label={sc ? `L2 ${sc.title}` : "L2 дефект"} />
          <LevelChip ok={coach.severity !== "danger"} warn={coach.severity === "warn"} label="L3 разбор" />
        </div>
        <div
          className={cn(
            "mb-2 rounded-md border px-3 py-2 text-[12px] leading-relaxed",
            coach.severity === "danger" && "border-danger/40 bg-danger/10 text-danger",
            coach.severity === "warn" && "border-warn/40 bg-warn/10 text-warn",
            coach.severity === "info" && "border-accent/25 bg-accent/10 text-accent",
          )}
        >
          {coach.message}
        </div>
        {coach.steps.length > 0 && (
          <ul className="mb-2 space-y-1">
            {coach.steps.map((st) => (
              <li key={st.id} className="flex items-center gap-2 text-[11px]">
                {st.done ? (
                  <Check className="size-3.5 text-ok" />
                ) : (
                  <Circle className="size-3.5 text-subtle" />
                )}
                <span className={st.done ? "text-muted line-through" : "text-fg"}>{st.label}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mb-2 flex gap-3 font-mono text-[10px] text-muted">
          {coach.reactionSec != null && <span>Реакция {coach.reactionSec.toFixed(1)} с</span>}
          {actions.length > 0 && <span>Команд {actions.length}</span>}
        </div>
        <div className="space-y-1.5">
          {chat.map((m, i) => (
            <div
              key={i}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-[12px] leading-relaxed",
                m.role === "user" ? "bg-surface-2 text-fg" : "bg-accent/10 text-accent",
              )}
            >
              {m.text}
            </div>
          ))}
        </div>
      </div>
      <form
        className="mt-2 flex gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          onAsk();
        }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Спросить инструктора…"
          className="min-w-0 flex-1 rounded-md border border-border bg-bg px-2 py-2 text-[12px] text-fg outline-none placeholder:text-subtle focus:border-accent"
        />
        <button
          type="submit"
          disabled={asking || !question.trim()}
          className="rounded-md border border-accent/40 bg-accent/15 px-2.5 text-accent disabled:opacity-40"
          aria-label="Отправить"
        >
          {asking ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        </button>
      </form>
      <button
        type="button"
        onClick={onDebrief}
        disabled={debriefing}
        className="mt-2 flex items-center justify-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-[12px] font-semibold text-fg hover:border-accent/40 disabled:opacity-50"
      >
        {debriefing ? <Loader2 className="size-3.5 animate-spin" /> : <FileText className="size-3.5" />}
        Сформировать отчёт
      </button>
    </Panel>
  );
}

function LevelChip({ ok, warn, label }: { ok?: boolean; warn?: boolean; label: string }) {
  return (
    <span
      className={cn(
        "rounded-sm border px-1.5 py-0.5 text-[10px] font-medium",
        warn
          ? "border-warn/40 text-warn"
          : ok
            ? "border-ok/40 text-ok"
            : "border-border text-subtle",
      )}
    >
      {label}
    </span>
  );
}

export function HeaderBar({
  clock,
  score,
  online,
  onPaz,
}: {
  clock: string;
  score: number;
  online: boolean;
  onPaz: () => void;
}) {
  return (
    <header className="area-header flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4">
      <div className="flex min-w-0 items-center gap-3">
        <Activity className="size-5 shrink-0 text-accent" />
        <div className="min-w-0">
          <div className="truncate text-[15px] font-semibold tracking-wide text-accent">КТК: ЭЛОУ-АВТ-4</div>
          <div className="hidden text-[11px] tracking-wider text-muted uppercase sm:block">
            Полномасштабный тренажёр
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onPaz}
          className="flex items-center gap-1.5 rounded-md border border-danger bg-danger/15 px-2.5 py-1.5 text-[11px] font-bold text-danger hover:bg-danger/25"
        >
          <ShieldAlert className="size-3.5" />
          ПАЗ
        </button>
        <div className="hidden items-center gap-1.5 font-mono text-[12px] sm:flex">
          <span className={cn("size-2 rounded-full", online ? "bg-ok led-live" : "bg-danger")} />
          <span className="text-muted">Связь</span>
        </div>
        <span className="hidden font-mono text-[12px] text-fg md:inline">{clock}</span>
        <span
          className={cn(
            "rounded-md border px-2.5 py-1 font-mono text-[12px] font-bold",
            score >= 75
              ? "border-ok/40 bg-ok/10 text-ok"
              : score >= 40
                ? "border-warn/40 bg-warn/10 text-warn"
                : "border-danger/40 bg-danger/10 text-danger",
          )}
        >
          {score}/100
        </span>
      </div>
    </header>
  );
}

export function DebriefDialog({
  report,
  onClose,
  onNext,
}: {
  report: DebriefReport;
  onClose: () => void;
  onNext: (id: string | null) => void;
}) {
  const next = report.nextScenarioId ? getScenario(report.nextScenarioId) : null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/85 p-4">
      <div className="panel-scroll max-h-[90dvh] w-full max-w-lg rounded-xl border border-border bg-surface p-5 panel-chrome">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold tracking-[0.14em] text-muted uppercase">
              Отчёт ИИ-модуля {report.source === "ai" ? "· Grok" : "· правила"}
            </div>
            <h3 className="mt-1 text-lg font-semibold">
              {report.verdict === "сдал" ? "Зачёт" : report.verdict === "условно" ? "Условно" : "Не зачёт"}
            </h3>
          </div>
          <span
            className={cn(
              "rounded-md border px-2 py-1 text-[12px] font-bold",
              report.verdict === "сдал" && "border-ok/40 text-ok",
              report.verdict === "условно" && "border-warn/40 text-warn",
              report.verdict === "не сдал" && "border-danger/40 text-danger",
            )}
          >
            {report.verdict}
          </span>
        </div>
        <p className="mb-3 text-[13px] leading-relaxed text-fg">{report.summary}</p>
        <div className="mb-3 grid gap-2 text-[12px]">
          <div className="rounded-md border border-border bg-bg/40 p-3">
            <div className="mb-1 text-[10px] font-bold tracking-wider text-muted uppercase">Время реакции</div>
            {report.reaction}
          </div>
          <div className="rounded-md border border-border bg-bg/40 p-3">
            <div className="mb-1 text-[10px] font-bold tracking-wider text-muted uppercase">Последовательность</div>
            {report.sequence}
          </div>
        </div>
        {report.errors.length > 0 && (
          <div className="mb-3">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-danger uppercase">
              <AlertTriangle className="size-3.5" />
              Ошибки оператора
            </div>
            <ul className="space-y-1.5">
              {report.errors.map((e, i) => (
                <li key={i} className="rounded-md border border-danger/25 bg-danger/10 px-3 py-2 text-[12px]">
                  <div>{e.text}</div>
                  {e.rule && <div className="mt-1 text-[10px] text-muted">{e.rule}</div>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {report.recommendations.length > 0 && (
          <div className="mb-4">
            <div className="mb-1.5 text-[11px] font-bold tracking-wider text-muted uppercase">Рекомендации</div>
            <ul className="list-disc space-y-1 pl-4 text-[12px] text-fg">
              {report.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          {next && (
            <button
              type="button"
              onClick={() => onNext(report.nextScenarioId)}
              className="flex-1 rounded-md border border-accent/40 bg-accent/15 px-3 py-2.5 text-[12px] font-semibold text-accent"
            >
              Далее: {next.title}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md border border-border px-3 py-2.5 text-[12px] font-semibold text-fg"
          >
            Закрыть
          </button>
        </div>
        {report.nextScenarioReason && (
          <p className="mt-2 text-[11px] leading-relaxed text-muted">{report.nextScenarioReason}</p>
        )}
      </div>
    </div>
  );
}
