import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { ScadaScheme } from "./ScadaScheme";
import {
  AiPanel,
  AlarmsPanel,
  DebriefDialog,
  DiagPanel,
  HeaderBar,
  InstructorPanel,
  PropertiesPanel,
} from "./panels";
import { useSimulation } from "@/lib/simulation/use-simulation";
import { buildDebriefPayload, ruleDebrief } from "@/lib/simulation/coach";
import { getScenario } from "@/lib/simulation/scenarios";
import { askTutor, generateDebrief } from "@/lib/ai/tutor";
import type { DebriefReport } from "@/lib/simulation/types";
import { cn } from "@/lib/cn";

type Tab = "ai" | "props" | "inst" | "alarms";

export function Dashboard() {
  const sim = useSimulation();
  const scadaRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.72);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 720,
  );
  const [tab, setTab] = useState<Tab>("ai");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [asking, setAsking] = useState(false);
  const [debriefing, setDebriefing] = useState(false);
  const [report, setReport] = useState<DebriefReport | null>(null);

  useEffect(() => {
    const el = scadaRef.current;
    if (!el) return;
    const mq = window.matchMedia("(max-width: 720px)");
    const applyMq = () => setIsMobile(mq.matches);
    applyMq();
    mq.addEventListener("change", applyMq);

    const layout = () => {
      const mobile = mq.matches;
      const fit = Math.min(el.clientWidth / 2200, el.clientHeight / 1200);
      const z = mobile
        ? 0.52
        : Math.round(Math.max(0.42, Math.min(1.05, fit * 1.02)) * 100) / 100;
      setZoom(z);
      setPan({
        x: el.clientWidth / 2 - (mobile ? 1000 : 1100) * z,
        y: el.clientHeight / 2 - (mobile ? 720 : 680) * z,
      });
    };
    layout();
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      setZoom((prev) => Math.round(Math.min(Math.max(0.35, prev + delta), 2.2) * 100) / 100);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", layout);
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", layout);
      mq.removeEventListener("change", applyMq);
    };
  }, []);

  const beginPan = (x: number, y: number) => {
    setDragging(true);
    startPos.current = { x: x - pan.x, y: y - pan.y };
  };

  const onMapDown = (e: MouseEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest(".eq-node") || t.closest(".valve-wrap")) return;
    beginPan(e.clientX, e.clientY);
  };
  const onMapMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPan({ x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y });
  };
  const onTouchStart = (e: TouchEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest(".eq-node") || t.closest(".valve-wrap")) return;
    const p = e.touches[0];
    if (p) beginPan(p.clientX, p.clientY);
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!dragging) return;
    const p = e.touches[0];
    if (p) setPan({ x: p.clientX - startPos.current.x, y: p.clientY - startPos.current.y });
  };

  const snapshot = () => {
    const s = sim.state;
    const sc = getScenario(sim.scenarioId);
    return [
      `Сценарий: ${sc?.title ?? "штатный режим"}`,
      `Оценка: ${s.score}/100`,
      `П-3 ${s.temp_P3}°C газ ${s.valve_gas}% режим ${s.TRC3_mode}`,
      `К-1 P=${s.pressure_K1} Tверх=${s.temp_top_K1} L=${s.level_K1}%`,
      `К-2 P=${s.pressure_K2} T=${s.temp_K2} L=${s.level_K2}%`,
      `Н-1 ${s.pump_H1 ? "вкл" : "выкл"} расход ${s.flow_in} FCV ${s.valve_feed}%`,
      `Н-3 ${s.pump_H3 ? "вкл" : "выкл"} виб ${s.vib_H3}`,
      `Н-2 ${s.pump_H2 ? "вкл" : "выкл"} виб ${s.vib_H2}`,
      `Э-1 U=${s.voltage_E1} вода ${s.water_level_E1}% дэм ${s.demulsifier_feed}`,
      `PCV ${s.pcv_221}% ${s.pcv_stuck ? "заклинил" : ""} АВЗ ${s.avz_1}%`,
      `Тревоги: ${s.alarms.join("; ") || "нет"}`,
      `Эталон: ${sim.coach.steps.map((st) => `${st.done ? "+" : "-"} ${st.label}`).join("; ")}`,
      `Команды: ${sim.actions.slice(-12).map((a) => a.label).join(" → ")}`,
      `Подсказка: ${sim.coach.message}`,
    ].join("\n");
  };

  const handleAsk = async () => {
    const q = question.trim();
    if (!q || asking) return;
    setAsking(true);
    setChat((c) => [...c, { role: "user", text: q }]);
    setQuestion("");
    try {
      const res = await askTutor({ data: { question: q, snapshot: snapshot() } });
      setChat((c) => [
        ...c,
        {
          role: "assistant",
          text: res.ok ? res.text : res.error,
        },
      ]);
    } catch {
      setChat((c) => [...c, { role: "assistant", text: "Связь с ИИ-модулем потеряна." }]);
    } finally {
      setAsking(false);
    }
  };

  const handleDebrief = async () => {
    if (debriefing) return;
    setDebriefing(true);
    const payload = buildDebriefPayload(
      sim.state,
      sim.scenarioId,
      getScenario(sim.scenarioId)?.title ?? "Штатный режим",
      sim.actions,
      sim.startedAt,
      sim.now,
      sim.extrema,
      [...new Set(sim.alarms.map((a) => a.text))],
      sim.coach,
    );
    const fallback = ruleDebrief(payload);
    try {
      const res = await generateDebrief({ data: { payload } });
      setReport(res.ok ? res.report : fallback);
    } catch {
      setReport(fallback);
    } finally {
      setDebriefing(false);
    }
  };

  const handleReset = () => {
    sim.reset();
    setActivePanel(null);
    setPan({ x: 0, y: 0 });
    setChat([]);
    setReport(null);
  };

  const handleScenario = (id: string) => {
    sim.cmd(id);
    setTab("ai");
    setReport(null);
  };

  const handleNext = (id: string | null) => {
    setReport(null);
    if (id) {
      sim.reset();
      setTimeout(() => sim.cmd(id), 50);
    }
  };

  if (sim.state.exploded) {
    return (
      <div className="shake-overlay flex min-h-dvh flex-col items-center justify-center bg-danger/50 px-6 text-center">
        <div className="text-3xl font-bold tracking-wide text-fg sm:text-5xl">ВЗРЫВ КОЛОННЫ К-1</div>
        <p className="mt-3 max-w-md text-[15px] text-fg/90">
          Критическое превышение давления. Аппарат разрушен. Сформируйте отчёт или перезапустите тренажёр.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={handleDebrief}
            className="rounded-md border border-fg/30 bg-bg/40 px-5 py-3 text-[13px] font-semibold text-fg"
          >
            Отчёт ИИ-модуля
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-ok/50 bg-ok/20 px-5 py-3 text-[13px] font-semibold text-ok"
          >
            Перезапуск тренажёра
          </button>
        </div>
        {report && (
          <DebriefDialog report={report} onClose={() => setReport(null)} onNext={handleNext} />
        )}
      </div>
    );
  }

  return (
    <div className="dashboard-shell">
      <HeaderBar
        clock={sim.clock}
        score={sim.state.score}
        online
        onPaz={() => sim.cmd("paz")}
      />

      <div
        ref={scadaRef}
        className={cn(
          "area-scada relative overflow-hidden rounded-lg border border-border",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onMouseDown={onMapDown}
        onMouseMove={onMapMove}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => setDragging(false)}
      >
        <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-sm border border-border bg-surface px-2 py-1 text-[10px] font-bold tracking-wider text-muted uppercase">
          Мнемосхема АСУ ТП · колесо — масштаб
        </div>
        <ScadaScheme
          state={sim.state}
          zoom={zoom}
          pan={pan}
          activePanel={activePanel}
          onEquipmentClick={(id) => {
            setActivePanel(id);
            setTab("props");
          }}
        />
      </div>

      {!isMobile ? (
        <div className="contents">
          <PropertiesPanel state={sim.state} active={activePanel} cmd={sim.cmd} />
          <AiPanel
            coach={sim.coach}
            scenarioId={sim.scenarioId}
            actions={sim.actions}
            question={question}
            setQuestion={setQuestion}
            chat={chat}
            asking={asking}
            onAsk={handleAsk}
            onDebrief={handleDebrief}
            debriefing={debriefing}
          />
          <DiagPanel state={sim.state} />
          <InstructorPanel onScenario={handleScenario} onReset={handleReset} />
          <AlarmsPanel alarms={sim.alarms} onAck={sim.ackAlarm} />
        </div>
      ) : (
        <div className="flex min-h-0 flex-col">
          <div className="mb-2 grid grid-cols-4 gap-1">
            {(
              [
                ["ai", "ИИ"],
                ["props", "Объект"],
                ["inst", "Сценарии"],
                ["alarms", "Тревоги"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "rounded-md border px-2 py-2 text-[11px] font-semibold",
                  tab === id ? "border-accent text-accent" : "border-border text-muted",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="min-h-[220px] flex-1">
            {tab === "ai" && (
              <AiPanel
                coach={sim.coach}
                scenarioId={sim.scenarioId}
                actions={sim.actions}
                question={question}
                setQuestion={setQuestion}
                chat={chat}
                asking={asking}
                onAsk={handleAsk}
                onDebrief={handleDebrief}
                debriefing={debriefing}
              />
            )}
            {tab === "props" && (
              <PropertiesPanel state={sim.state} active={activePanel} cmd={sim.cmd} />
            )}
            {tab === "inst" && <InstructorPanel onScenario={handleScenario} onReset={handleReset} />}
            {tab === "alarms" && <AlarmsPanel alarms={sim.alarms} onAck={sim.ackAlarm} />}
          </div>
        </div>
      )}

      {report && <DebriefDialog report={report} onClose={() => setReport(null)} onNext={handleNext} />}
    </div>
  );
}
