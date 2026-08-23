export type TrcMode = "AUTO" | "MANUAL";

export interface PlantState {
  score: number;
  alarms: string[];
  exploded: boolean;
  pump_H1: boolean;
  pump_H2: boolean;
  pump_H3: boolean;
  valve_feed: number;
  valve_drain_E1: number;
  demulsifier_feed: number;
  voltage_E1: number;
  water_level_E1: number;
  flow_in: number;
  level_K1: number;
  pressure_K1: number;
  temp_top_K1: number;
  level_K2: number;
  pressure_K2: number;
  temp_K2: number;
  flow_H3: number;
  flow_out: number;
  TRC3_mode: TrcMode;
  valve_gas: number;
  temp_P3: number;
  pcv_221: number;
  avz_1: number;
  avz_broken: boolean;
  pcv_stuck: boolean;
  gas_stuck: boolean;
  gas_loss: boolean;
  vib_H1: number;
  vib_H2: number;
  vib_H3: number;
  tick: number;
}

export interface LoggedAction {
  id: string;
  t: number;
  tick: number;
  action: string;
  value: number | null;
  label: string;
}

export interface AlarmEntry {
  id: string;
  time: string;
  text: string;
  ack: boolean;
}

export interface ScenarioStep {
  id: string;
  label: string;
  hint: string;
  check: (state: PlantState, actions: LoggedAction[]) => boolean;
}

export interface ScenarioDef {
  id: string;
  title: string;
  tone: "danger" | "warn";
  brief: string;
  instructorNote: string;
  triggerAction: string;
  steps: ScenarioStep[];
  timeoutSec: number;
}

export interface CoachStepStatus {
  id: string;
  label: string;
  done: boolean;
}

export interface CoachOutput {
  message: string;
  severity: "info" | "warn" | "danger";
  steps: CoachStepStatus[];
  reactionSec: number | null;
  nextAction: string | null;
  resolved: boolean;
  flags: string[];
}

export interface Extrema {
  maxTempP3: number;
  maxPressureK1: number;
  minLevelK1: number;
  minLevelK2: number;
  maxVibH2: number;
  maxVibH3: number;
}

export interface DebriefPayload {
  scenarioId: string | null;
  scenarioTitle: string;
  durationSec: number;
  score: number;
  exploded: boolean;
  reactionSec: number | null;
  actions: { t: number; label: string }[];
  steps: { label: string; done: boolean }[];
  flags: string[];
  extrema: Extrema;
  alarms: string[];
}

export interface DebriefReport {
  verdict: "сдал" | "условно" | "не сдал";
  summary: string;
  errors: { text: string; rule: string }[];
  reaction: string;
  sequence: string;
  recommendations: string[];
  nextScenarioId: string | null;
  nextScenarioReason: string;
  source: "ai" | "rules";
}
