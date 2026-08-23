import { useCallback, useEffect, useRef, useState } from "react";
import { SimulationEngine } from "./engine";
import { describeAction, getScenario, INSTRUCTOR_TRIGGERS } from "./scenarios";
import { evaluateCoach } from "./coach";
import type {
  AlarmEntry,
  CoachOutput,
  Extrema,
  LoggedAction,
  PlantState,
} from "./types";

let seq = 0;
function nid() {
  seq += 1;
  return `${Date.now()}-${seq}`;
}

export function useSimulation() {
  const engineRef = useRef<SimulationEngine | null>(null);
  if (!engineRef.current) engineRef.current = new SimulationEngine();

  const [state, setState] = useState<PlantState>(() => engineRef.current!.getState());
  const [alarms, setAlarms] = useState<AlarmEntry[]>([]);
  const [actions, setActions] = useState<LoggedAction[]>([]);
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [clock, setClock] = useState("--:--:--");

  const ingestAlarms = useCallback((list: string[]) => {
    if (!list.length) return;
    setAlarms((prev) => {
      const next = [...prev];
      for (const text of list) {
        if (!next.some((a) => a.text === text && !a.ack)) {
          next.unshift({
            id: nid(),
            time: new Date().toLocaleTimeString("ru-RU"),
            text,
            ack: false,
          });
        }
      }
      return next.slice(0, 80);
    });
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const engine = engineRef.current!;
      engine.update();
      const snap = engine.getState();
      setState(snap);
      setNow(Date.now());
      setClock(new Date().toLocaleTimeString("ru-RU"));
      ingestAlarms(snap.alarms);
    }, 1000);
    return () => window.clearInterval(id);
  }, [ingestAlarms]);

  const cmd = useCallback((action: string, value: number | null = null) => {
    const engine = engineRef.current!;
    engine.apply(action, value);
    const snap = engine.getState();
    setState(snap);
    ingestAlarms(snap.alarms);

    if (INSTRUCTOR_TRIGGERS.has(action)) {
      const sc = getScenario(action);
      setScenarioId(action);
      setStartedAt(Date.now());
      setActions([]);
      return sc?.instructorNote ?? "";
    }

    if (action === "paz") {
      engine.apply("set_pump_h1", 0);
      engine.apply("set_pump_h2", 0);
      engine.apply("set_pump_h3", 0);
      engine.apply("set_feed_valve", 0);
      engine.apply("set_pcv", 100);
      engine.apply("set_trc3_mode", 0);
      engine.apply("set_gas_valve", 0);
      setState(engine.getState());
    }

    const label = describeAction(action, value);
    setActions((prev) =>
      [
        ...prev,
        {
          id: nid(),
          t: Date.now(),
          tick: engine.tick,
          action,
          value,
          label,
        },
      ].slice(-80),
    );
    return null;
  }, [ingestAlarms]);

  const reset = useCallback(() => {
    engineRef.current!.reset();
    setState(engineRef.current!.getState());
    setAlarms([]);
    setActions([]);
    setScenarioId(null);
    setStartedAt(null);
  }, []);

  const ackAlarm = useCallback((id: string) => {
    setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, ack: true } : a)));
  }, []);

  const extrema: Extrema = {
    maxTempP3: engineRef.current.maxTempP3,
    maxPressureK1: engineRef.current.maxPressureK1,
    minLevelK1: engineRef.current.minLevelK1,
    minLevelK2: engineRef.current.minLevelK2,
    maxVibH2: engineRef.current.maxVibH2,
    maxVibH3: engineRef.current.maxVibH3,
  };

  const coach: CoachOutput = evaluateCoach(state, scenarioId, actions, startedAt, now);

  return {
    state,
    alarms,
    actions,
    scenarioId,
    startedAt,
    now,
    clock,
    extrema,
    coach,
    cmd,
    reset,
    ackAlarm,
  };
}
