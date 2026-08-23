import { getScenario } from "./scenarios";
import type {
  CoachOutput,
  DebriefPayload,
  DebriefReport,
  Extrema,
  LoggedAction,
  PlantState,
} from "./types";

const RULE_REF = "п. 7.9.1 и раздел 3.5 Регламента ЭЛОУ-АВТ-4";

export function evaluateCoach(
  state: PlantState,
  scenarioId: string | null,
  actions: LoggedAction[],
  startedAt: number | null,
  now: number,
): CoachOutput {
  const scenario = getScenario(scenarioId);
  const flags: string[] = [];

  if (state.exploded) {
    flags.push("Разрушение колонны К-1 по давлению");
    return {
      message:
        "Критический отказ. Давление К-1 превысило 5.4 кгс/см². Разбор тренировки обязателен.",
      severity: "danger",
      steps: scenario
        ? scenario.steps.map((st) => ({
            id: st.id,
            label: st.label,
            done: st.check(state, actions),
          }))
        : [],
      reactionSec: reactionOf(actions, startedAt),
      nextAction: null,
      resolved: false,
      flags,
    };
  }

  if (!scenario || startedAt == null) {
    if (state.temp_P3 >= 350) {
      flags.push("Перегрев П-3 без активного сценария");
      return {
        message:
          "Температура П-3 приближается к пределу. Переведите TRC-3 в ручной и снизьте газ.",
        severity: "danger",
        steps: [],
        reactionSec: null,
        nextAction: "TRC-3 ручной, газ вниз",
        resolved: false,
        flags,
      };
    }
    return {
      message:
        "ИИ-модуль активен. Запустите сценарий отказа — буду сравнивать ваши команды с эталонной последовательностью и временем реакции.",
      severity: "info",
      steps: [],
      reactionSec: null,
      nextAction: null,
      resolved: false,
      flags,
    };
  }

  const steps = scenario.steps.map((st) => ({
    id: st.id,
    label: st.label,
    done: st.check(state, actions),
  }));
  const next = scenario.steps.find((st, i) => !steps[i]?.done);
  const allDone = steps.every((s) => s.done);
  const reactionSec = reactionOf(actions, startedAt);
  const elapsed = (now - startedAt) / 1000;

  if (state.temp_P3 >= 360) flags.push("Допущен прогар труб змеевика П-3");
  else if (state.temp_P3 >= 340) flags.push("Перегрев П-3 выше 340 °C");
  if (state.pressure_K1 >= 4.5) flags.push("Срабатывание ПАЗ по давлению К-1");
  if (state.vib_H3 > 7) flags.push("Кавитация Н-3");
  if (state.vib_H2 > 7) flags.push("Кавитация Н-2");
  if (reactionSec != null && reactionSec > 12) {
    flags.push(`Медленная первая реакция (${reactionSec.toFixed(0)} с)`);
  }
  if (elapsed > scenario.timeoutSec && !allDone) {
    flags.push("Превышено нормативное время реакции по сценарию");
  }

  let severity: CoachOutput["severity"] = "info";
  if (
    state.temp_P3 >= 350 ||
    state.pressure_K1 >= 4.5 ||
    state.alarms.some((a) => a.includes("ПРОГАР") || a.includes("ВЗРЫВ") || a.includes("ПАЗ"))
  ) {
    severity = "danger";
  } else if (state.alarms.length > 0 || elapsed > scenario.timeoutSec * 0.6) {
    severity = "warn";
  }

  if (allDone && state.temp_P3 < 345 && state.pressure_K1 < 4.2) {
    return {
      message:
        "Эталонные действия выполнены, процесс стабилизируется. Сформируйте отчёт — разберу последовательность и время реакции.",
      severity: "info",
      steps,
      reactionSec,
      nextAction: null,
      resolved: true,
      flags,
    };
  }

  const hint = next?.hint ?? scenario.instructorNote;
  const timeNote =
    elapsed > scenario.timeoutSec
      ? " Время по регламенту уже превышено."
      : elapsed > scenario.timeoutSec * 0.5
        ? " Действуйте быстрее."
        : "";

  return {
    message: hint + timeNote,
    severity,
    steps,
    reactionSec,
    nextAction: next?.label ?? null,
    resolved: false,
    flags,
  };
}

function reactionOf(actions: LoggedAction[], startedAt: number | null) {
  if (startedAt == null) return null;
  const first = actions.find((a) => a.t >= startedAt);
  if (!first) return null;
  return (first.t - startedAt) / 1000;
}

export function buildDebriefPayload(
  state: PlantState,
  scenarioId: string | null,
  scenarioTitle: string,
  actions: LoggedAction[],
  startedAt: number | null,
  now: number,
  extrema: Extrema,
  uniqueAlarms: string[],
  coach: CoachOutput,
): DebriefPayload {
  return {
    scenarioId,
    scenarioTitle,
    durationSec: startedAt ? Math.round((now - startedAt) / 1000) : 0,
    score: state.score,
    exploded: state.exploded,
    reactionSec: coach.reactionSec,
    actions: actions.slice(-40).map((a) => ({
      t: startedAt ? Math.round((a.t - startedAt) / 1000) : 0,
      label: a.label,
    })),
    steps: coach.steps,
    flags: coach.flags,
    extrema,
    alarms: uniqueAlarms.slice(0, 20),
  };
}

export function ruleDebrief(payload: DebriefPayload): DebriefReport {
  const errors: { text: string; rule: string }[] = [];
  const recs: string[] = [];

  if (payload.exploded) {
    errors.push({
      text: "Разрушение колонны К-1 по избыточному давлению.",
      rule: RULE_REF,
    });
    recs.push("При отказе сброса на факел немедленно гасите печь: TRC-3 ручной, газ 0%.");
  }
  if (payload.extrema.maxTempP3 >= 360) {
    errors.push({
      text: `Прогар труб змеевика П-3. Максимум ${payload.extrema.maxTempP3.toFixed(1)} °C.`,
      rule: RULE_REF,
    });
    recs.push(
      "При потере циркуляции сырья немедленно отсекайте топливный газ. Не оставляйте печь на AUTO.",
    );
  } else if (payload.extrema.maxTempP3 > 340) {
    errors.push({
      text: `Перегрев печи до ${payload.extrema.maxTempP3.toFixed(1)} °C. Действия верные, но медленные.`,
      rule: "Раздел 3.5, ограничение 340 °C",
    });
  }
  if (payload.reactionSec != null && payload.reactionSec > 12) {
    errors.push({
      text: `Первая команда через ${payload.reactionSec.toFixed(0)} с при нормативе ≤ 8–10 с.`,
      rule: "Норматив реакции оператора КТК",
    });
  }
  const missed = payload.steps.filter((s) => !s.done);
  if (missed.length) {
    errors.push({
      text: `Не выполнены шаги: ${missed.map((s) => s.label).join("; ")}.`,
      rule: "Эталонный сценарий инструктора",
    });
  }

  const doneRatio =
    payload.steps.length === 0
      ? 1
      : payload.steps.filter((s) => s.done).length / payload.steps.length;

  let verdict: DebriefReport["verdict"] = "сдал";
  if (payload.exploded || payload.extrema.maxTempP3 >= 360 || payload.score < 40) {
    verdict = "не сдал";
  } else if (doneRatio < 1 || payload.score < 75 || errors.length > 1) {
    verdict = "условно";
  }

  const summary =
    verdict === "сдал"
      ? "Оператор действовал в рамках регламента и не допустил критических отклонений."
      : verdict === "условно"
        ? "Сценарий отработан с замечаниями. Требуется повтор на смежном отказе."
        : "Тренировка не зачтена: допущены критические нарушения технологического режима.";

  const next = suggestNext(payload.scenarioId, verdict, payload.flags);

  if (!recs.length) {
    recs.push("Повторите сценарий с фиксацией времени первой команды менее 8 секунд.");
  }

  return {
    verdict,
    summary,
    errors,
    reaction:
      payload.reactionSec == null
        ? "Команд оператора не зафиксировано."
        : payload.reactionSec <= 8
          ? `Реакция ${payload.reactionSec.toFixed(1)} с — в нормативе.`
          : `Реакция ${payload.reactionSec.toFixed(1)} с — медленнее норматива 8 с.`,
    sequence:
      missed.length === 0
        ? "Последовательность совпала с эталоном."
        : `Отклонение от эталона: пропущены ${missed.map((s) => s.label).join(", ")}.`,
    recommendations: recs,
    nextScenarioId: next.id,
    nextScenarioReason: next.reason,
    source: "rules",
  };
}

function suggestNext(
  current: string | null,
  verdict: DebriefReport["verdict"],
  flags: string[],
) {
  if (flags.some((f) => f.includes("прогар") || f.includes("Прогар"))) {
    return {
      id: "break_pump_h1",
      reason: "Повторить отказ Н-1: отработать отсечение газа до потери циркуляции.",
    };
  }
  if (flags.some((f) => f.includes("давлен"))) {
    return {
      id: "jam_pcv",
      reason: "Заклинивание PCV — отработать гашение печи при росте давления.",
    };
  }
  if (verdict === "сдал") {
    const harder: Record<string, string> = {
      water_slug: "jam_pcv",
      break_avz: "jam_gas",
      gas_loss: "break_pump_h1",
      short_circuit: "demulsifier_fail",
      demulsifier_fail: "jam_pcv",
      break_pump_h1: "jam_pcv",
      jam_gas: "jam_pcv",
      jam_pcv: "break_pump_h1",
    };
    const id = (current && harder[current]) || "jam_pcv";
    return { id, reason: "Сценарий зачтён. Следующий — смежный отказ с более жёстким таймингом." };
  }
  return {
    id: current ?? "break_pump_h1",
    reason: "Повторить тот же отказ до стабильного выполнения эталона.",
  };
}
