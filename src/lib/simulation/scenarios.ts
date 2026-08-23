import type { LoggedAction, PlantState, ScenarioDef } from "./types";

function hasAction(actions: LoggedAction[], name: string) {
  return actions.some((a) => a.action === name);
}

export const SCENARIOS: ScenarioDef[] = [
  {
    id: "break_pump_h1",
    title: "Отказ Н-1",
    tone: "danger",
    brief: "Остановлен сырьевой насос. Падает уровень, риск кавитации и прогара.",
    instructorNote:
      "Отказ Н-1. Падает уровень в аппаратах. Сначала погасите печь, затем остановите Н-3 и Н-2.",
    triggerAction: "break_pump_h1",
    timeoutSec: 90,
    steps: [
      {
        id: "trc_manual",
        label: "TRC-3 в ручной режим",
        hint: "Переведите TRC-3 в ручной — ПИД продолжит держать газ.",
        check: (s) => s.TRC3_mode === "MANUAL",
      },
      {
        id: "gas_off",
        label: "Закрыть топливный газ",
        hint: "Закройте клапан газа TRC-3 до 0%. Без циркуляции трубы прогорят.",
        check: (s) => s.valve_gas <= 5,
      },
      {
        id: "stop_h3",
        label: "Остановить Н-3",
        hint: "Уровень К-1 падает — остановите Н-3 до кавитации.",
        check: (s) => !s.pump_H3,
      },
      {
        id: "stop_h2",
        label: "Остановить Н-2",
        hint: "Остановите печной насос Н-2, чтобы не осушить К-2.",
        check: (s) => !s.pump_H2,
      },
    ],
  },
  {
    id: "short_circuit",
    title: "Замыкание Э-1",
    tone: "danger",
    brief: "Переполнение электродегидратора, отключено напряжение.",
    instructorNote:
      "Переполнение Э-1 водой привело к короткому замыканию. Слейте воду через дренаж и восстановите 4.8 кВ.",
    triggerAction: "short_circuit",
    timeoutSec: 80,
    steps: [
      {
        id: "drain",
        label: "Открыть дренаж Э-1",
        hint: "Поднимите дренаж воды выше 70%, пока уровень не уйдёт ниже 75%.",
        check: (s) => s.valve_drain_E1 >= 70,
      },
      {
        id: "level_ok",
        label: "Снизить уровень воды < 75%",
        hint: "Ждите, пока уровень воды в Э-1 не опустится ниже 75%.",
        check: (s) => s.water_level_E1 < 75,
      },
      {
        id: "restore_v",
        label: "Восстановить 4.8 кВ",
        hint: "Когда уровень безопасен — восстановите напряжение на Э-1.",
        check: (s) => s.voltage_E1 >= 4,
      },
    ],
  },
  {
    id: "demulsifier_fail",
    title: "Потеря деэмульгатора",
    tone: "danger",
    brief: "Вода идёт в К-1, растёт давление.",
    instructorNote:
      "Отключена подача деэмульгатора. Вода пошла в колонну К-1. Восстановите реагент и будьте готовы сбросить давление на факел.",
    triggerAction: "demulsifier_fail",
    timeoutSec: 70,
    steps: [
      {
        id: "reagent",
        label: "Восстановить деэмульгатор",
        hint: "Верните расход деэмульгатора выше 15 кг/ч.",
        check: (s) => s.demulsifier_feed >= 15,
      },
      {
        id: "pcv",
        label: "При росте P открыть PCV-221",
        hint: "Если давление К-1 растёт — откройте сброс на факел.",
        check: (s, a) => s.pcv_221 >= 60 || s.pressure_K1 < 3.2 || hasAction(a, "set_pcv"),
      },
    ],
  },
  {
    id: "jam_pcv",
    title: "Заклинить PCV",
    tone: "danger",
    brief: "Нет сброса на факел. Давление растёт до взрыва.",
    instructorNote:
      "Клапан PCV-221 заклинил, сброса нет. Экстренно гасите печь П-3: TRC-3 в ручной и газ 0%, иначе взрыв колонны.",
    triggerAction: "jam_pcv",
    timeoutSec: 45,
    steps: [
      {
        id: "trc_manual",
        label: "TRC-3 в ручной режим",
        hint: "ПИД не поможет — переведите TRC-3 в ручной.",
        check: (s) => s.TRC3_mode === "MANUAL",
      },
      {
        id: "gas_off",
        label: "Погасить печь (газ 0%)",
        hint: "Немедленно закройте топливный газ. Давление К-1 критическое.",
        check: (s) => s.valve_gas <= 5,
      },
    ],
  },
  {
    id: "jam_gas",
    title: "Заклинить газ",
    tone: "warn",
    brief: "Клапан газа на 100%, ПИД отключён.",
    instructorNote:
      "Клапан газа печи заклинил на 100%. Срочно увеличьте подачу сырья до 100% для съёма тепла и держите циркуляцию Н-3.",
    triggerAction: "jam_gas",
    timeoutSec: 50,
    steps: [
      {
        id: "feed_100",
        label: "Сырьё FCV-1 на 100%",
        hint: "Откройте FCV-1 на 100% — нужен съём тепла.",
        check: (s) => s.valve_feed >= 95,
      },
      {
        id: "h3_on",
        label: "Циркуляция Н-3",
        hint: "Н-3 должен работать, иначе прогар змеевика.",
        check: (s) => s.pump_H3,
      },
      {
        id: "h1_on",
        label: "Н-1 в работе",
        hint: "Не останавливайте сырьевой насос — печь перегреется.",
        check: (s) => s.pump_H1,
      },
    ],
  },
  {
    id: "gas_loss",
    title: "Обрыв пламени",
    tone: "danger",
    brief: "Пропало давление топливного газа, печь погасла.",
    instructorNote:
      "Обрыв топливного газа. Печь погасла. Переведите TRC-3 в ручной и перекройте клапан — не дайте ПИД открыть газ при появлении давления.",
    triggerAction: "gas_loss",
    timeoutSec: 40,
    steps: [
      {
        id: "trc_manual",
        label: "TRC-3 в ручной режим",
        hint: "Зафиксируйте ручной режим, чтобы ПИД не открыл газ.",
        check: (s) => s.TRC3_mode === "MANUAL",
      },
      {
        id: "gas_off",
        label: "Клапан газа закрыт",
        hint: "Перекройте TRC-3. Повторный розжиг без продувки запрещён.",
        check: (s) => s.valve_gas <= 5,
      },
    ],
  },
  {
    id: "water_slug",
    title: "Вода с ЭЛОУ",
    tone: "warn",
    brief: "Гидроудар: вода вскипела в печи, скачок давления.",
    instructorNote:
      "В нефть попала вода с ЭЛОУ. Резкое вскипание в печи. Откройте сброс PCV-221 на факел.",
    triggerAction: "water_slug",
    timeoutSec: 35,
    steps: [
      {
        id: "pcv_open",
        label: "PCV-221 на сброс",
        hint: "Откройте PCV-221 не менее чем на 80%.",
        check: (s) => s.pcv_221 >= 80,
      },
    ],
  },
  {
    id: "break_avz",
    title: "Отказ АВЗ-1",
    tone: "warn",
    brief: "Нет охлаждения верха К-1, растёт температура.",
    instructorNote:
      "Отказ кулера АВЗ-1. Температура верха К-1 растёт. Снизьте нагрузку на печь: TRC-3 в ручной и убавьте газ.",
    triggerAction: "break_avz",
    timeoutSec: 60,
    steps: [
      {
        id: "trc_manual",
        label: "TRC-3 в ручной режим",
        hint: "Переведите печь в ручной режим.",
        check: (s) => s.TRC3_mode === "MANUAL",
      },
      {
        id: "gas_down",
        label: "Снизить газ < 40%",
        hint: "Убавьте топливный газ, чтобы снять тепловую нагрузку с верха К-1.",
        check: (s) => s.valve_gas <= 40,
      },
    ],
  },
];

export function getScenario(id: string | null) {
  if (!id) return null;
  return SCENARIOS.find((s) => s.id === id) ?? null;
}

export const ACTION_LABELS: Record<string, (v: number | null) => string> = {
  set_pump_h1: (v) => (v ? "Пуск Н-1" : "Стоп Н-1"),
  set_pump_h2: (v) => (v ? "Пуск Н-2" : "Стоп Н-2"),
  set_pump_h3: (v) => (v ? "Пуск Н-3" : "Стоп Н-3"),
  set_feed_valve: (v) => `FCV-1 → ${v?.toFixed(0)}%`,
  set_drain_e1: (v) => `Дренаж Э-1 → ${v?.toFixed(0)}%`,
  set_demulsifier: (v) => `Деэмульгатор → ${v?.toFixed(0)} кг/ч`,
  restore_voltage: () => "Восстановлено напряжение Э-1",
  set_pcv: (v) => `PCV-221 → ${v?.toFixed(0)}%`,
  set_avz: (v) => `АВЗ-1 → ${v?.toFixed(0)}%`,
  set_trc3_mode: (v) => (v ? "TRC-3 AUTO" : "TRC-3 РУЧНОЙ"),
  set_gas_valve: (v) => `Газ П-3 → ${v?.toFixed(0)}%`,
  paz: () => "Экстренный ПАЗ установки",
};

export function describeAction(action: string, value: number | null) {
  const fn = ACTION_LABELS[action];
  return fn ? fn(value) : action;
}

export const INSTRUCTOR_TRIGGERS = new Set([
  "break_pump_h1",
  "jam_pcv",
  "jam_gas",
  "break_avz",
  "water_slug",
  "gas_loss",
  "short_circuit",
  "demulsifier_fail",
]);
