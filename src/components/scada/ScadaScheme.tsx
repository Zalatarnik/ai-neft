import type { ReactNode } from "react";
import type { PlantState } from "@/lib/simulation/types";
import { cn } from "@/lib/cn";

function tagClass(val: number, warn: number, danger: number, inverse = false) {
  if (inverse) {
    if (val <= danger) return "text-danger";
    if (val <= warn) return "text-warn";
    return "text-ok";
  }
  if (val >= danger) return "text-danger";
  if (val >= warn) return "text-warn";
  return "text-ok";
}

function pumpText(on: boolean, vib: number) {
  if (vib > 7) return "КАВИТАЦИЯ";
  return on ? "РАБОТА" : "СТОП";
}

function pumpClass(on: boolean, vib: number) {
  if (!on || vib > 7) return "text-danger";
  if (vib > 4) return "text-warn";
  return "text-ok";
}

function ValveIcon({ alarm, active }: { alarm?: boolean; active?: boolean }) {
  return (
    <svg
      className={cn(
        "text-subtle",
        active && "text-ok",
        alarm && "text-danger",
      )}
      width="36"
      height="24"
      viewBox="0 0 32 24"
      aria-hidden
    >
      <polygon points="2,8 2,22 16,15" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" />
      <polygon points="30,8 30,22 16,15" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="2" width="8" height="6" fill="currentColor" />
      <path d="M16 8 v7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function ScadaScheme({
  state,
  zoom,
  pan,
  activePanel,
  onEquipmentClick,
}: {
  state: PlantState;
  zoom: number;
  pan: { x: number; y: number };
  activePanel: string | null;
  onEquipmentClick: (id: string) => void;
}) {
  return (
    <div
      className="scada-grid absolute top-0 left-0 origin-top-left"
      style={{
        width: 2200,
        height: 1200,
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
      }}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 2200 1200" width="2200" height="1200">
        <path d="M 300 700 L 450 700" className="pipe-bg" />
        {state.pump_H1 && <path d="M 300 700 L 450 700" className="pipe-flow" />}
        <path d="M 650 700 L 860 700 Q 880 700 880 680 L 880 620 Q 880 600 900 600" className="pipe-bg" />
        {state.pump_H1 && state.valve_feed > 0 && (
          <path d="M 650 700 L 860 700 Q 880 700 880 680 L 880 620 Q 880 600 900 600" className="pipe-flow" />
        )}
        
        {/* Жёлтая линия газа (Отрисовывается первой, чтобы уйти под факельную) */}
        <path d="M 1000 420 Q 1000 400 1020 400 L 1200 400" className="pipe-bg" />
        {!state.avz_broken && (
          <path d="M 1000 420 Q 1000 400 1020 400 L 1200 400" className="pipe-flow gas" />
        )}
        <path d="M 1400 400 L 1550 400" className="pipe-bg" />
        {!state.avz_broken && <path d="M 1400 400 L 1550 400" className="pipe-flow gas" />}

        {/* Красная факельная линия (Отрисовывается поверх) */}
        <path d="M 1000 510 L 1000 120" className="pipe-bg" />
        {state.pcv_221 > 0 && <path d="M 1000 510 L 1000 120" className="pipe-flow flare" />}
        
        {/* Остальные трубы */}
        <path d="M 1000 690 L 1000 860" className="pipe-bg" />
        {state.pump_H3 && <path d="M 1000 690 L 1000 860" className="pipe-flow" />}
        <path d="M 1100 900 L 1300 900" className="pipe-bg" />
        {state.pump_H3 && <path d="M 1100 900 L 1300 900" className="pipe-flow" />}
        <path d="M 1400 670 L 1400 840" className="pipe-bg" />
        {state.valve_gas > 0 && <path d="M 1400 670 L 1400 840" className="pipe-flow gas" />}
        <path d="M 1500 900 L 1660 900 Q 1680 900 1680 880 L 1680 620 Q 1680 600 1700 600" className="pipe-bg" />
        {state.pump_H3 && (
          <path d="M 1500 900 L 1660 900 Q 1680 900 1680 880 L 1680 620 Q 1680 600 1700 600" className="pipe-flow" />
        )}
        <path d="M 1800 690 L 1800 860" className="pipe-bg" />
        {state.pump_H2 && <path d="M 1800 690 L 1800 860" className="pipe-flow" />}
        <path d="M 1900 900 L 2050 900" className="pipe-bg" />
        {state.pump_H2 && <path d="M 1900 900 L 2050 900" className="pipe-flow" />}
      </svg>

      <div className="term-node" style={{ left: 1000, top: 100 }}>
        ФАКЕЛЬНАЯ
        <br />
        СЕТЬ
      </div>
      <div className="term-node" style={{ left: 1550, top: 400 }}>
        ЁМКОСТЬ
        <br />
        Е-2
      </div>
      <div className="term-node" style={{ left: 1400, top: 650 }}>
        ТОПЛИВНАЯ
        <br />
        СЕТЬ
      </div>
      <div className="term-node" style={{ left: 2100, top: 900 }}>
        ТОВАРНЫЙ
        <br />
        ПАРК
      </div>

      <Eq
        id="h1"
        title="Сырьевой Н-1"
        left={200}
        top={700}
        alarm={!state.pump_H1 || state.vib_H1 > 5}
        active={activePanel === "h1"}
        onClick={onEquipmentClick}
      >
        <Row name="Статус" value={pumpText(state.pump_H1, state.vib_H1)} cls={pumpClass(state.pump_H1, state.vib_H1)} />
        <Row name="Расход" value={`${state.flow_in.toFixed(1)} т/ч`} cls="text-ok" />
      </Eq>

      <Eq
        id="e1"
        title="Электродегидратор Э-1"
        left={550}
        top={700}
        alarm={state.voltage_E1 === 0}
        active={activePanel === "e1"}
        onClick={onEquipmentClick}
      >
        <Row name="Напряжение" value={`${state.voltage_E1.toFixed(1)} кВ`} cls={state.voltage_E1 > 0 ? "text-ok" : "text-danger"} />
        <Row name="Уровень воды" value={`${state.water_level_E1.toFixed(1)} %`} cls={state.water_level_E1 > 70 ? "text-danger" : "text-ok"} />
        <Row name="Деэмульгатор" value={`${state.demulsifier_feed.toFixed(1)} кг/ч`} cls={state.demulsifier_feed < 10 ? "text-danger" : "text-ok"} />
      </Eq>

      <button type="button" className={cn("valve-wrap", activePanel === "fcv" && "active")} style={{ left: 750, top: 700 }} onClick={() => onEquipmentClick("fcv")}>
        <span className={cn("mb-1 rounded-sm border px-2 py-0.5 text-[10px] font-bold transition-all", activePanel === "fcv" ? "border-accent bg-accent/20 text-accent shadow-[0_0_16px_rgba(94,200,232,0.35)]" : "border-border bg-surface text-fg")}>
          FCV-1
        </span>
        <ValveIcon active={state.valve_feed > 0} />
      </button>

      <Eq
        id="k1"
        title="Колонна К-1"
        left={1000}
        top={600}
        tall
        alarm={state.pressure_K1 >= 4.5 || state.level_K1 >= 95}
        active={activePanel === "k1"}
        onClick={onEquipmentClick}
      >
        <Row name="Давление" value={`${state.pressure_K1.toFixed(2)} кгс`} cls={tagClass(state.pressure_K1, 4, 4.5)} />
        <Row name="Темп. верха" value={`${state.temp_top_K1.toFixed(1)} °C`} cls={tagClass(state.temp_top_K1, 145, 150)} />
        <div className="h-2" />
        <Row
          name="Уровень"
          value={`${state.level_K1.toFixed(1)} %`}
          cls={state.level_K1 >= 90 ? "text-danger" : tagClass(state.level_K1, 20, 10, true)}
        />
        <Bar pct={state.level_K1} danger={state.level_K1 > 90 || state.level_K1 < 10} />
      </Eq>

      <button type="button" className={cn("valve-wrap", activePanel === "pcv" && "active")} style={{ left: 1000, top: 250 }} onClick={() => onEquipmentClick("pcv")}>
        <span className={cn("mb-1 rounded-sm border px-2 py-0.5 text-[10px] font-bold transition-all", activePanel === "pcv" ? "border-accent bg-accent/20 text-accent shadow-[0_0_16px_rgba(94,200,232,0.35)]" : "border-border bg-surface text-fg")}>
          PCV-221
        </span>
        <ValveIcon alarm={state.pcv_stuck} active={state.pcv_221 > 0} />
      </button>

      <Eq
        id="avz"
        title="АВЗ-1 охлаждение"
        left={1300}
        top={400}
        alarm={state.avz_broken}
        active={activePanel === "avz"}
        onClick={onEquipmentClick}
      >
        <Row name="Обороты" value={`${state.avz_1.toFixed(0)} %`} cls={state.avz_broken ? "text-danger" : "text-ok"} />
        <Bar pct={state.avz_1} />
      </Eq>

      <Eq
        id="h3"
        title="Насос Н-3 (куб К-1)"
        left={1000}
        top={900}
        alarm={!state.pump_H3 || state.vib_H3 > 5}
        active={activePanel === "h3"}
        onClick={onEquipmentClick}
      >
        <Row name="Статус" value={pumpText(state.pump_H3, state.vib_H3)} cls={pumpClass(state.pump_H3, state.vib_H3)} />
      </Eq>

      <Eq
        id="trc3"
        title="Печь П-3"
        left={1400}
        top={900}
        alarm={state.temp_P3 > 350}
        active={activePanel === "trc3"}
        onClick={onEquipmentClick}
      >
        <Row name="Темп." value={`${state.temp_P3.toFixed(1)} °C`} cls={tagClass(state.temp_P3, 340, 360)} />
        <Row name="Газ" value={`${state.valve_gas.toFixed(1)} %`} cls="text-ok" />
        <Bar pct={state.valve_gas} danger={state.gas_stuck} gas />
      </Eq>

      <button type="button" className={cn("valve-wrap", activePanel === "trc3" && "active")} style={{ left: 1400, top: 750 }} onClick={() => onEquipmentClick("trc3")}>
        <span className={cn("mb-1 rounded-sm border px-2 py-0.5 text-[10px] font-bold transition-all", activePanel === "trc3" ? "border-accent bg-accent/20 text-accent shadow-[0_0_16px_rgba(94,200,232,0.35)]" : "border-border bg-surface text-fg")}>
          TRC-3 газ
        </span>
        <ValveIcon alarm={state.gas_stuck} active={state.valve_gas > 0} />
      </button>

      <Eq
        id="k2"
        title="Колонна К-2"
        left={1800}
        top={600}
        tall
        alarm={state.level_K2 >= 95}
        active={activePanel === "k2"}
        onClick={onEquipmentClick}
      >
        <Row name="Давление" value={`${state.pressure_K2.toFixed(2)} кгс`} cls={tagClass(state.pressure_K2, 1.8, 2.5)} />
        <Row name="Темп. куб" value={`${state.temp_K2.toFixed(1)} °C`} cls="text-ok" />
        <div className="h-2" />
        <Row
          name="Уровень"
          value={`${state.level_K2.toFixed(1)} %`}
          cls={state.level_K2 >= 90 ? "text-danger" : tagClass(state.level_K2, 20, 10, true)}
        />
        <Bar pct={state.level_K2} danger={state.level_K2 > 90 || state.level_K2 < 10} />
      </Eq>

      <Eq
        id="h2"
        title="Печной Н-2"
        left={1800}
        top={900}
        alarm={!state.pump_H2 || state.vib_H2 > 5}
        active={activePanel === "h2"}
        onClick={onEquipmentClick}
      >
        <Row name="Статус" value={pumpText(state.pump_H2, state.vib_H2)} cls={pumpClass(state.pump_H2, state.vib_H2)} />
      </Eq>
    </div>
  );
}

function Eq({
  id,
  title,
  left,
  top,
  alarm,
  active,
  tall,
  children,
  onClick,
}: {
  id: string;
  title: string;
  left: number;
  top: number;
  alarm?: boolean;
  active?: boolean;
  tall?: boolean;
  onClick: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn("eq-node text-left", alarm && "alarm", active && "active")}
      style={{ left, top, height: tall ? 180 : undefined }}
      onClick={() => onClick(id)}
    >
      <div className="rounded-t-[7px] border-b border-border bg-surface-2 px-2.5 py-2 text-center text-[11px] font-bold tracking-wide">
        {title}
      </div>
      <div className="flex flex-col gap-1.5 p-3">{children}</div>
    </button>
  );
}

function Row({ name, value, cls }: { name: string; value: string; cls: string }) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-muted">{name}</span>
      <span className={cn("font-mono text-[12px] font-bold", cls)}>{value}</span>
    </div>
  );
}

function Bar({ pct, danger, gas }: { pct: number; danger?: boolean; gas?: boolean }) {
  return (
    <div className="mt-1 h-1 w-full overflow-hidden rounded-sm bg-surface-2">
      <div
        className={cn("h-full", danger ? "bg-danger" : gas ? "bg-warn" : "bg-accent")}
        style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
      />
    </div>
  );
}