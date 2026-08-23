import { createServerFn } from "@tanstack/react-start";
import type { DebriefPayload, DebriefReport } from "@/lib/simulation/types";
import { SCENARIOS } from "@/lib/simulation/scenarios";

const SYSTEM_PROMPT = `Ты — ИИ-модуль компьютерного тренажёрного комплекса (КТК) установки ЭЛОУ-АВТ-4 нефтеперерабатывающего завода.
Твоя роль — третий уровень модели: анализ действий обучаемого, времени реакции и последовательности команд.
Сравнивай действия с эталоном, ссылайся на п. 7.9.1 и раздел 3.5 Регламента ЭЛОУ-АВТ-4.
Стиль: старший инструктор-технолог. Кратко, по делу, без эмодзи, на русском.
Не выдумывай параметры, которых нет во входных данных.`;

async function chat(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
  maxTokens: number,
  json = false,
) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false as const, error: "unavailable" as const };

  const payload: Record<string, unknown> = {
    model: "grok-4.5",
    messages,
    max_tokens: maxTokens,
    temperature: 0.3,
  };
  if (json) payload.response_format = { type: "json_object" };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const once = () =>
    fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

  let res = await once();
  if (!res.ok) res = await once();
  if (!res.ok) return { ok: false as const, error: `xAI ${res.status}` as const };

  const jsonBody = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = jsonBody.choices?.[0]?.message?.content?.trim() ?? "";
  if (!text) return { ok: false as const, error: "empty" as const };
  return { ok: true as const, text };
}

export const askTutor = createServerFn({ method: "POST" })
  .validator((input: { question: string; snapshot: string }) => ({
    question: String(input.question ?? "").slice(0, 500),
    snapshot: String(input.snapshot ?? "").slice(0, 3500),
  }))
  .handler(async ({ data }) => {
    if (!data.question.trim()) {
      return { ok: false as const, error: "Пустой вопрос" };
    }
    const result = await chat(
      [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Снимок процесса и действий:\n${data.snapshot}\n\nВопрос оператора: ${data.question}\n\nОтветь 4–8 предложениями: что происходит, что сделать сейчас, чего не делать. Без преамбулы.`,
        },
      ],
      420,
    );
    if (!result.ok) {
      return {
        ok: false as const,
        error:
          result.error === "unavailable"
            ? "ИИ-модуль недоступен в этой среде"
            : "Не удалось получить ответ инструктора",
      };
    }
    return { ok: true as const, text: result.text };
  });

export const generateDebrief = createServerFn({ method: "POST" })
  .validator((input: { payload: DebriefPayload }) => input)
  .handler(async ({ data }) => {
    try {
      const p = data.payload;
      const compact = {
        scenario: p.scenarioTitle,
        durationSec: p.durationSec,
        score: p.score,
        exploded: p.exploded,
        reactionSec: p.reactionSec,
        steps: p.steps,
        flags: p.flags,
        extrema: p.extrema,
        alarms: p.alarms.slice(0, 8),
        actions: p.actions.slice(-20),
      };
      const knownIds = SCENARIOS.map((s) => s.id).join(", ");
      const result = await chat(
        [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Сформируй разбор тренировки как JSON-объект:
{"verdict":"сдал|условно|не сдал","summary":"...","errors":[{"text":"...","rule":"..."}],"reaction":"...","sequence":"...","recommendations":["..."],"nextScenarioId":"id или null","nextScenarioReason":"..."}
nextScenarioId только из: ${knownIds}
Данные: ${JSON.stringify(compact)}`,
          },
        ],
        800,
        true,
      );

      if (!result.ok) return { ok: false as const, error: result.error };

      const parsed = parseReport(result.text);
      if (parsed) return { ok: true as const, report: parsed };
      return {
        ok: true as const,
        report: {
          verdict: "условно" as const,
          summary: result.text.slice(0, 800),
          errors: [],
          reaction: "",
          sequence: "",
          recommendations: [],
          nextScenarioId: p.scenarioId,
          nextScenarioReason: "",
          source: "ai" as const,
        },
      };
    } catch {
      return { ok: false as const, error: "exception" };
    }
  });

function parseReport(text: string): DebriefReport | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const raw = JSON.parse(text.slice(start, end + 1)) as Partial<DebriefReport>;
    const verdict =
      raw.verdict === "сдал" || raw.verdict === "условно" || raw.verdict === "не сдал"
        ? raw.verdict
        : "условно";
    return {
      verdict,
      summary: String(raw.summary ?? "").slice(0, 800),
      errors: Array.isArray(raw.errors)
        ? raw.errors.slice(0, 8).map((e) => ({
            text: String((e as { text?: string }).text ?? ""),
            rule: String((e as { rule?: string }).rule ?? ""),
          }))
        : [],
      reaction: String(raw.reaction ?? ""),
      sequence: String(raw.sequence ?? ""),
      recommendations: Array.isArray(raw.recommendations)
        ? raw.recommendations.map((r) => String(r)).slice(0, 6)
        : [],
      nextScenarioId: raw.nextScenarioId ? String(raw.nextScenarioId) : null,
      nextScenarioReason: String(raw.nextScenarioReason ?? ""),
      source: "ai",
    };
  } catch {
    return null;
  }
}
