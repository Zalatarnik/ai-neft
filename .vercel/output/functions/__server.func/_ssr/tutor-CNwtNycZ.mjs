import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as SCENARIOS } from "./scenarios-Do0PAKGu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-CNwtNycZ.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SYSTEM_PROMPT = `Ты — ИИ-модуль компьютерного тренажёрного комплекса (КТК) установки ЭЛОУ-АВТ-4 нефтеперерабатывающего завода.
Твоя роль — третий уровень модели: анализ действий обучаемого, времени реакции и последовательности команд.
Сравнивай действия с эталоном, ссылайся на п. 7.9.1 и раздел 3.5 Регламента ЭЛОУ-АВТ-4.
Стиль: старший инструктор-технолог. Кратко, по делу, без эмодзи, на русском.
Не выдумывай параметры, которых нет во входных данных.`;
async function chat(messages, maxTokens, json = false) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "unavailable"
	};
	const payload = {
		model: "grok-4.5",
		messages,
		max_tokens: maxTokens,
		temperature: .3
	};
	if (json) payload.response_format = { type: "json_object" };
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${apiKey}`
	};
	const once = () => fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers,
		body: JSON.stringify(payload)
	});
	let res = await once();
	if (!res.ok) res = await once();
	if (!res.ok) return {
		ok: false,
		error: `xAI ${res.status}`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "empty"
	};
	return {
		ok: true,
		text
	};
}
var askTutor_createServerFn_handler = createServerRpc({
	id: "d9b7f3703f538ded2869fe11aba11fd4ec12d6ef5cfab6bd9b736aa1a930f982",
	name: "askTutor",
	filename: "src/lib/ai/tutor.ts"
}, (opts) => askTutor.__executeServer(opts));
var askTutor = createServerFn({ method: "POST" }).validator((input) => ({
	question: String(input.question ?? "").slice(0, 500),
	snapshot: String(input.snapshot ?? "").slice(0, 3500)
})).handler(askTutor_createServerFn_handler, async ({ data }) => {
	if (!data.question.trim()) return {
		ok: false,
		error: "Пустой вопрос"
	};
	const result = await chat([{
		role: "system",
		content: SYSTEM_PROMPT
	}, {
		role: "user",
		content: `Снимок процесса и действий:\n${data.snapshot}\n\nВопрос оператора: ${data.question}\n\nОтветь 4–8 предложениями: что происходит, что сделать сейчас, чего не делать. Без преамбулы.`
	}], 420);
	if (!result.ok) return {
		ok: false,
		error: result.error === "unavailable" ? "ИИ-модуль недоступен в этой среде" : "Не удалось получить ответ инструктора"
	};
	return {
		ok: true,
		text: result.text
	};
});
var generateDebrief_createServerFn_handler = createServerRpc({
	id: "edb92658caa6dd02e38c36433371162880e57724894ae7871d23a095bc4d925a",
	name: "generateDebrief",
	filename: "src/lib/ai/tutor.ts"
}, (opts) => generateDebrief.__executeServer(opts));
var generateDebrief = createServerFn({ method: "POST" }).validator((input) => input).handler(generateDebrief_createServerFn_handler, async ({ data }) => {
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
			actions: p.actions.slice(-20)
		};
		const knownIds = SCENARIOS.map((s) => s.id).join(", ");
		const result = await chat([{
			role: "system",
			content: SYSTEM_PROMPT
		}, {
			role: "user",
			content: `Сформируй разбор тренировки как JSON-объект:
{"verdict":"сдал|условно|не сдал","summary":"...","errors":[{"text":"...","rule":"..."}],"reaction":"...","sequence":"...","recommendations":["..."],"nextScenarioId":"id или null","nextScenarioReason":"..."}
nextScenarioId только из: ${knownIds}
Данные: ${JSON.stringify(compact)}`
		}], 800, true);
		if (!result.ok) return {
			ok: false,
			error: result.error
		};
		const parsed = parseReport(result.text);
		if (parsed) return {
			ok: true,
			report: parsed
		};
		return {
			ok: true,
			report: {
				verdict: "условно",
				summary: result.text.slice(0, 800),
				errors: [],
				reaction: "",
				sequence: "",
				recommendations: [],
				nextScenarioId: p.scenarioId,
				nextScenarioReason: "",
				source: "ai"
			}
		};
	} catch {
		return {
			ok: false,
			error: "exception"
		};
	}
});
function parseReport(text) {
	const start = text.indexOf("{");
	const end = text.lastIndexOf("}");
	if (start < 0 || end <= start) return null;
	try {
		const raw = JSON.parse(text.slice(start, end + 1));
		return {
			verdict: raw.verdict === "сдал" || raw.verdict === "условно" || raw.verdict === "не сдал" ? raw.verdict : "условно",
			summary: String(raw.summary ?? "").slice(0, 800),
			errors: Array.isArray(raw.errors) ? raw.errors.slice(0, 8).map((e) => ({
				text: String(e.text ?? ""),
				rule: String(e.rule ?? "")
			})) : [],
			reaction: String(raw.reaction ?? ""),
			sequence: String(raw.sequence ?? ""),
			recommendations: Array.isArray(raw.recommendations) ? raw.recommendations.map((r) => String(r)).slice(0, 6) : [],
			nextScenarioId: raw.nextScenarioId ? String(raw.nextScenarioId) : null,
			nextScenarioReason: String(raw.nextScenarioReason ?? ""),
			source: "ai"
		};
	} catch {
		return null;
	}
}
//#endregion
export { askTutor_createServerFn_handler, generateDebrief_createServerFn_handler };
