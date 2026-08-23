import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as LoaderCircle, c as Check, i as RotateCcw, l as Bot, n as ShieldAlert, o as FileText, r as Send, s as Circle, t as TriangleAlert, u as Activity } from "../_libs/lucide-react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { i as getScenario, n as SCENARIOS, r as describeAction, t as INSTRUCTOR_TRIGGERS } from "./scenarios-Do0PAKGu.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CQ468IjT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function tagClass(val, warn, danger, inverse = false) {
	if (inverse) {
		if (val <= danger) return "text-danger";
		if (val <= warn) return "text-warn";
		return "text-ok";
	}
	if (val >= danger) return "text-danger";
	if (val >= warn) return "text-warn";
	return "text-ok";
}
function pumpText(on, vib) {
	if (vib > 7) return "КАВИТАЦИЯ";
	return on ? "РАБОТА" : "СТОП";
}
function pumpClass(on, vib) {
	if (!on || vib > 7) return "text-danger";
	if (vib > 4) return "text-warn";
	return "text-ok";
}
function ValveIcon({ alarm, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: cn("text-subtle", active && "text-ok", alarm && "text-danger"),
		width: "36",
		height: "24",
		viewBox: "0 0 32 24",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "2,8 2,22 16,15",
				fill: "var(--color-surface)",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "30,8 30,22 16,15",
				fill: "var(--color-surface)",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12",
				y: "2",
				width: "8",
				height: "6",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 8 v7",
				stroke: "currentColor",
				strokeWidth: "2"
			})
		]
	});
}
function ScadaScheme({ state, zoom, pan, activePanel, onEquipmentClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scada-grid absolute top-0 left-0 origin-top-left",
		style: {
			width: 2200,
			height: 1200,
			transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "pointer-events-none absolute inset-0 h-full w-full",
				viewBox: "0 0 2200 1200",
				width: "2200",
				height: "1200",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 300 700 L 450 700",
						className: "pipe-bg"
					}),
					state.pump_H1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 300 700 L 450 700",
						className: "pipe-flow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 650 700 L 860 700 Q 880 700 880 680 L 880 620 Q 880 600 900 600",
						className: "pipe-bg"
					}),
					state.pump_H1 && state.valve_feed > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 650 700 L 860 700 Q 880 700 880 680 L 880 620 Q 880 600 900 600",
						className: "pipe-flow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1000 510 L 1000 120",
						className: "pipe-bg"
					}),
					state.pcv_221 > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1000 510 L 1000 120",
						className: "pipe-flow flare"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1000 420 Q 1000 400 1020 400 L 1200 400",
						className: "pipe-bg"
					}),
					!state.avz_broken && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1000 420 Q 1000 400 1020 400 L 1200 400",
						className: "pipe-flow gas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1400 400 L 1550 400",
						className: "pipe-bg"
					}),
					!state.avz_broken && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1400 400 L 1550 400",
						className: "pipe-flow gas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1000 690 L 1000 860",
						className: "pipe-bg"
					}),
					state.pump_H3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1000 690 L 1000 860",
						className: "pipe-flow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1100 900 L 1300 900",
						className: "pipe-bg"
					}),
					state.pump_H3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1100 900 L 1300 900",
						className: "pipe-flow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1400 670 L 1400 840",
						className: "pipe-bg"
					}),
					state.valve_gas > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1400 670 L 1400 840",
						className: "pipe-flow gas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1500 900 L 1660 900 Q 1680 900 1680 880 L 1680 620 Q 1680 600 1700 600",
						className: "pipe-bg"
					}),
					state.pump_H3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1500 900 L 1660 900 Q 1680 900 1680 880 L 1680 620 Q 1680 600 1700 600",
						className: "pipe-flow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1800 690 L 1800 860",
						className: "pipe-bg"
					}),
					state.pump_H2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1800 690 L 1800 860",
						className: "pipe-flow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1900 900 L 2050 900",
						className: "pipe-bg"
					}),
					state.pump_H2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 1900 900 L 2050 900",
						className: "pipe-flow"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "term-node",
				style: {
					left: 1e3,
					top: 100
				},
				children: [
					"ФАКЕЛЬНАЯ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"СЕТЬ"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "term-node",
				style: {
					left: 1550,
					top: 400
				},
				children: [
					"ЁМКОСТЬ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Е-2"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "term-node",
				style: {
					left: 1400,
					top: 650
				},
				children: [
					"ТОПЛИВНАЯ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"СЕТЬ"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "term-node",
				style: {
					left: 2100,
					top: 900
				},
				children: [
					"ТОВАРНЫЙ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"ПАРК"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eq, {
				id: "h1",
				title: "Сырьевой Н-1",
				left: 200,
				top: 700,
				alarm: !state.pump_H1 || state.vib_H1 > 5,
				active: activePanel === "h1",
				onClick: onEquipmentClick,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					name: "Статус",
					value: pumpText(state.pump_H1, state.vib_H1),
					cls: pumpClass(state.pump_H1, state.vib_H1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					name: "Расход",
					value: `${state.flow_in.toFixed(1)} т/ч`,
					cls: "text-ok"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eq, {
				id: "e1",
				title: "Электродегидратор Э-1",
				left: 550,
				top: 700,
				alarm: state.voltage_E1 === 0,
				active: activePanel === "e1",
				onClick: onEquipmentClick,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Напряжение",
						value: `${state.voltage_E1.toFixed(1)} кВ`,
						cls: state.voltage_E1 > 0 ? "text-ok" : "text-danger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Уровень воды",
						value: `${state.water_level_E1.toFixed(1)} %`,
						cls: state.water_level_E1 > 70 ? "text-danger" : "text-ok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Деэмульгатор",
						value: `${state.demulsifier_feed.toFixed(1)} кг/ч`,
						cls: state.demulsifier_feed < 10 ? "text-danger" : "text-ok"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "valve-wrap",
				style: {
					left: 750,
					top: 700
				},
				onClick: () => onEquipmentClick("fcv"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 rounded-sm border border-border bg-surface px-2 py-0.5 text-[10px] font-bold text-fg",
					children: "FCV-1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValveIcon, { active: state.valve_feed > 0 })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eq, {
				id: "k1",
				title: "Колонна К-1",
				left: 1e3,
				top: 600,
				tall: true,
				alarm: state.pressure_K1 >= 4.5 || state.level_K1 >= 95,
				active: activePanel === "k1",
				onClick: onEquipmentClick,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Давление",
						value: `${state.pressure_K1.toFixed(2)} кгс`,
						cls: tagClass(state.pressure_K1, 4, 4.5)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Темп. верха",
						value: `${state.temp_top_K1.toFixed(1)} °C`,
						cls: tagClass(state.temp_top_K1, 145, 150)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Уровень",
						value: `${state.level_K1.toFixed(1)} %`,
						cls: state.level_K1 >= 90 ? "text-danger" : tagClass(state.level_K1, 20, 10, true)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						pct: state.level_K1,
						danger: state.level_K1 > 90 || state.level_K1 < 10
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "valve-wrap",
				style: {
					left: 1e3,
					top: 250
				},
				onClick: () => onEquipmentClick("pcv"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 rounded-sm border border-border bg-surface px-2 py-0.5 text-[10px] font-bold text-fg",
					children: "PCV-221"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValveIcon, {
					alarm: state.pcv_stuck,
					active: state.pcv_221 > 0
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eq, {
				id: "avz",
				title: "АВЗ-1 охлаждение",
				left: 1300,
				top: 400,
				alarm: state.avz_broken,
				active: activePanel === "avz",
				onClick: onEquipmentClick,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					name: "Обороты",
					value: `${state.avz_1.toFixed(0)} %`,
					cls: state.avz_broken ? "text-danger" : "text-ok"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, { pct: state.avz_1 })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eq, {
				id: "h3",
				title: "Насос Н-3 (куб К-1)",
				left: 1e3,
				top: 900,
				alarm: !state.pump_H3 || state.vib_H3 > 5,
				active: activePanel === "h3",
				onClick: onEquipmentClick,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					name: "Статус",
					value: pumpText(state.pump_H3, state.vib_H3),
					cls: pumpClass(state.pump_H3, state.vib_H3)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eq, {
				id: "trc3",
				title: "Печь П-3",
				left: 1400,
				top: 900,
				alarm: state.temp_P3 > 350,
				active: activePanel === "trc3",
				onClick: onEquipmentClick,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Темп.",
						value: `${state.temp_P3.toFixed(1)} °C`,
						cls: tagClass(state.temp_P3, 340, 360)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Газ",
						value: `${state.valve_gas.toFixed(1)} %`,
						cls: "text-ok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						pct: state.valve_gas,
						danger: state.gas_stuck,
						gas: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "valve-wrap",
				style: {
					left: 1400,
					top: 750
				},
				onClick: () => onEquipmentClick("trc3"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 rounded-sm border border-border bg-surface px-2 py-0.5 text-[10px] font-bold text-fg",
					children: "TRC-3 газ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValveIcon, {
					alarm: state.gas_stuck,
					active: state.valve_gas > 0
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eq, {
				id: "k2",
				title: "Колонна К-2",
				left: 1800,
				top: 600,
				tall: true,
				alarm: state.level_K2 >= 95,
				active: activePanel === "k2",
				onClick: onEquipmentClick,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Давление",
						value: `${state.pressure_K2.toFixed(2)} кгс`,
						cls: tagClass(state.pressure_K2, 1.8, 2.5)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Темп. куб",
						value: `${state.temp_K2.toFixed(1)} °C`,
						cls: "text-ok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						name: "Уровень",
						value: `${state.level_K2.toFixed(1)} %`,
						cls: state.level_K2 >= 90 ? "text-danger" : tagClass(state.level_K2, 20, 10, true)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						pct: state.level_K2,
						danger: state.level_K2 > 90 || state.level_K2 < 10
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eq, {
				id: "h2",
				title: "Печной Н-2",
				left: 1800,
				top: 900,
				alarm: !state.pump_H2 || state.vib_H2 > 5,
				active: activePanel === "h2",
				onClick: onEquipmentClick,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					name: "Статус",
					value: pumpText(state.pump_H2, state.vib_H2),
					cls: pumpClass(state.pump_H2, state.vib_H2)
				})
			})
		]
	});
}
function Eq({ id, title, left, top, alarm, active, tall, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: cn("eq-node text-left", alarm && "alarm", active && "border-accent"),
		style: {
			left,
			top,
			height: tall ? 180 : void 0
		},
		onClick: () => onClick(id),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-t-[7px] border-b border-border bg-surface-2 px-2.5 py-2 text-center text-[11px] font-bold tracking-wide",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-1.5 p-3",
			children
		})]
	});
}
function Row({ name, value, cls }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-[11px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-mono text-[12px] font-bold", cls),
			children: value
		})]
	});
}
function Bar({ pct, danger, gas }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-1 w-full overflow-hidden rounded-sm bg-surface-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full", danger ? "bg-danger" : gas ? "bg-warn" : "bg-accent"),
			style: { width: `${Math.max(0, Math.min(100, pct))}%` }
		})
	});
}
function Panel({ title, className, children, extra }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-surface p-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-2 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[11px] font-bold tracking-[0.12em] text-muted uppercase",
				children: title
			}), extra]
		}), children]
	});
}
function RangeSlider({ value, onChange, disabled }) {
	const [local, setLocal] = (0, import_react.useState)(value);
	const [drag, setDrag] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!drag) setLocal(value);
	}, [value, drag]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "range",
		className: "prop-slider",
		min: 0,
		max: 100,
		value: local,
		disabled,
		onPointerDown: () => setDrag(true),
		onChange: (e) => setLocal(Number(e.target.value)),
		onPointerUp: (e) => {
			setDrag(false);
			onChange(Number(e.target.value));
		},
		onBlur: (e) => {
			setDrag(false);
			onChange(Number(e.target.value));
		},
		style: { background: `linear-gradient(to right, var(--color-accent) ${local}%, var(--color-border) ${local}%)` }
	});
}
function ModeBtn({ active, tone, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("flex-1 px-2 py-2 text-[11px] font-semibold transition-colors", active && tone === "ok" && "bg-ok text-bg", active && tone === "warn" && "bg-warn text-bg", active && tone === "danger" && "bg-danger text-fg", !active && "text-subtle hover:bg-surface-2 hover:text-muted"),
		children
	});
}
var TITLES = {
	h1: "Сырьевой насос Н-1",
	e1: "Электродегидратор Э-1",
	fcv: "Клапан сырья FCV-1",
	k1: "Колонна К-1",
	pcv: "Сброс на факел PCV-221",
	avz: "Аппарат возд. охлаждения АВЗ-1",
	h3: "Насос куба К-1 Н-3",
	trc3: "Печь П-3 / регулятор TRC-3",
	k2: "Колонна К-2",
	h2: "Насос куба К-2 Н-2"
};
function PropertiesPanel({ state, active, cmd }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: active ? TITLES[active] ?? "Объект" : "Свойства объекта",
		className: "area-props",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-y-auto pr-1",
			children: [
				!active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center rounded-md border border-dashed border-border px-4 py-8 text-center text-[13px] text-subtle",
					children: "Выберите аппарат на мнемосхеме"
				}),
				active === "h1" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PumpBlock, {
					on: state.pump_H1,
					onStart: () => cmd("set_pump_h1", 1),
					onStop: () => cmd("set_pump_h1", 0)
				}),
				active === "h2" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PumpBlock, {
					on: state.pump_H2,
					onStart: () => cmd("set_pump_h2", 1),
					onStop: () => cmd("set_pump_h2", 0)
				}),
				active === "h3" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PumpBlock, {
					on: state.pump_H3,
					onStart: () => cmd("set_pump_h3", 1),
					onStop: () => cmd("set_pump_h3", 0)
				}),
				active === "e1" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						state.voltage_E1 === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-danger px-3 py-2 text-center text-[12px] font-bold text-fg",
							children: "Напряжение отключено. Слейте воду."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
							label: "Напряжение",
							value: `${state.voltage_E1.toFixed(1)} кВ`,
							ok: state.voltage_E1 > 0
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-[12px] font-semibold text-accent disabled:opacity-40",
							disabled: state.water_level_E1 >= 80,
							onClick: () => cmd("restore_voltage"),
							children: "Восстановить 4.8 кВ"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
							label: "Дренаж воды",
							value: `${state.valve_drain_E1.toFixed(1)} %`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeSlider, {
							value: state.valve_drain_E1,
							onChange: (v) => cmd("set_drain_e1", v)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
							label: "Деэмульгатор",
							value: `${state.demulsifier_feed.toFixed(1)} кг/ч`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeSlider, {
							value: state.demulsifier_feed,
							onChange: (v) => cmd("set_demulsifier", v)
						})] })
					]
				}),
				active === "fcv" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
					label: "Открытие клапана",
					value: `${state.valve_feed.toFixed(1)} %`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeSlider, {
					value: state.valve_feed,
					onChange: (v) => cmd("set_feed_valve", v)
				})] }),
				active === "k1" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
						label: "Уровень",
						value: `${state.level_K1.toFixed(1)} %`,
						ok: state.level_K1 < 90 && state.level_K1 > 10
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
						label: "Давление",
						value: `${state.pressure_K1.toFixed(2)} кгс`,
						ok: state.pressure_K1 < 4
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
						label: "Темп. верха",
						value: `${state.temp_top_K1.toFixed(1)} °C`,
						ok: state.temp_top_K1 < 145
					})
				] }),
				active === "k2" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
						label: "Уровень",
						value: `${state.level_K2.toFixed(1)} %`,
						ok: state.level_K2 < 90 && state.level_K2 > 10
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
						label: "Давление",
						value: `${state.pressure_K2.toFixed(2)} кгс`,
						ok: state.pressure_K2 < 1.8
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
						label: "Темп. куб",
						value: `${state.temp_K2.toFixed(1)} °C`,
						ok: true
					})
				] }),
				active === "pcv" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [state.pcv_stuck && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 rounded-md bg-danger px-3 py-2 text-center text-[12px] font-bold text-fg",
					children: "Клапан заклинил"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
					label: "Сброс газа",
					value: `${state.pcv_221.toFixed(1)} %`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeSlider, {
					value: state.pcv_221,
					onChange: (v) => cmd("set_pcv", v),
					disabled: state.pcv_stuck
				})] })] }),
				active === "avz" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [state.avz_broken && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 rounded-md bg-danger px-3 py-2 text-center text-[12px] font-bold text-fg",
					children: "Отказ двигателя"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
					label: "Обороты вентилятора",
					value: `${state.avz_1.toFixed(0)} %`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeSlider, {
					value: state.avz_1,
					onChange: (v) => cmd("set_avz", v),
					disabled: state.avz_broken
				})] })] }),
				active === "trc3" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						state.gas_stuck && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-danger px-3 py-2 text-center text-[12px] font-bold text-fg",
							children: "Клапан заклинил на 100%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
							label: "Режим",
							value: state.TRC3_mode === "AUTO" ? "АВТО" : "РУЧНОЙ",
							ok: state.TRC3_mode === "AUTO"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex overflow-hidden rounded-md border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBtn, {
								active: state.TRC3_mode === "AUTO",
								tone: "ok",
								onClick: () => cmd("set_trc3_mode", 1),
								children: "АВТО"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBtn, {
								active: state.TRC3_mode === "MANUAL",
								tone: "warn",
								onClick: () => cmd("set_trc3_mode", 0),
								children: "РУЧНОЙ"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
							label: "Температура",
							value: `${state.temp_P3.toFixed(1)} °C`,
							ok: state.temp_P3 < 340
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
							label: "Подача газа",
							value: `${state.valve_gas.toFixed(1)} %`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeSlider, {
							value: state.valve_gas,
							onChange: (v) => cmd("set_gas_valve", v),
							disabled: state.TRC3_mode === "AUTO" || state.gas_stuck
						})] })
					]
				})
			]
		})
	});
}
function PumpBlock({ on, onStart, onStop }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PropCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropHead, {
		label: "Состояние",
		value: on ? "РАБОТА" : "СТОП",
		ok: on
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex overflow-hidden rounded-md border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBtn, {
			active: on,
			tone: "ok",
			onClick: onStart,
			children: "ПУСК"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBtn, {
			active: !on,
			tone: "danger",
			onClick: onStop,
			children: "СТОП"
		})]
	})] });
}
function PropCard({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-2 flex flex-col gap-2 rounded-md border border-border bg-bg/60 p-3",
		children
	});
}
function PropHead({ label, value, ok }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-[13px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-mono font-bold", ok === false ? "text-danger" : ok ? "text-ok" : "text-fg"),
			children: value
		})]
	});
}
function vibTone(on, vib) {
	if (!on || vib > 7) return "bg-danger";
	if (vib > 4) return "bg-warn";
	return "bg-ok";
}
function DiagPanel({ state }) {
	const rows = [
		{
			name: "Н-1 сырьё",
			on: state.pump_H1,
			vib: state.vib_H1
		},
		{
			name: "Н-3 куб К-1",
			on: state.pump_H3,
			vib: state.vib_H3
		},
		{
			name: "Н-2 куб К-2",
			on: state.pump_H2,
			vib: state.vib_H2
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Система Компакс",
		className: "area-diag",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-md border border-border bg-bg/50 px-3 py-2.5 text-[12px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block size-2 rounded-full", vibTone(r.on, r.vib)) }), r.name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("font-mono font-bold", !r.on || r.vib > 7 ? "text-danger" : r.vib > 4 ? "text-warn" : "text-ok"),
					children: [r.vib.toFixed(2), " мм/с"]
				})]
			}, r.name))
		})
	});
}
function InstructorPanel({ onScenario, onReset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Сценарии инструктора",
		className: "area-instructor",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid min-h-0 flex-1 grid-cols-2 content-start gap-2 overflow-y-auto pr-1",
			children: SCENARIOS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onScenario(s.id),
				className: cn("rounded-md border px-2 py-2 text-[11px] font-semibold leading-tight", s.tone === "danger" ? "border-danger/50 bg-danger/10 text-danger hover:bg-danger/20" : "border-warn/50 bg-warn/10 text-warn hover:bg-warn/20"),
				children: s.title
			}, s.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onReset,
			className: "mt-2 flex items-center justify-center gap-2 rounded-md border border-ok/40 bg-ok/10 px-3 py-2 text-[12px] font-semibold text-ok hover:bg-ok/20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Сбросить установку"]
		})]
	});
}
function AlarmsPanel({ alarms, onAck }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Журнал тревог",
		className: "area-alarms",
		extra: alarms.some((a) => !a.ack) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-sm bg-danger/20 px-1.5 py-0.5 font-mono text-[10px] text-danger",
			children: alarms.filter((a) => !a.ack).length
		}) : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "min-h-0 flex-1 list-none overflow-y-auto p-0 m-0",
			children: alarms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-[12px] text-subtle",
				children: "Активных тревог нет"
			}) : alarms.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onAck(a.id),
				className: cn("mb-1.5 w-full rounded-r-md border-l-4 border-danger px-3 py-2 text-left text-[12px] text-danger/90", a.ack ? "bg-danger/5" : "unacked"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1 font-mono text-[10px] text-muted",
					children: a.time
				}), a.text]
			}) }, a.id))
		})
	});
}
function AiPanel({ coach, scenarioId, actions, question, setQuestion, chat, asking, onAsk, onDebrief, debriefing }) {
	const sc = getScenario(scenarioId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "ИИ-модуль",
		className: "area-ai",
		extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 text-[10px] text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-3.5 text-accent" }), "L3 анализ"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex flex-wrap gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelChip, {
						ok: true,
						label: "L1 физика"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelChip, {
						ok: Boolean(sc),
						label: sc ? `L2 ${sc.title}` : "L2 дефект"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelChip, {
						ok: coach.severity !== "danger",
						warn: coach.severity === "warn",
						label: "L3 разбор"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mb-2 rounded-md border px-3 py-2 text-[12px] leading-relaxed", coach.severity === "danger" && "border-danger/40 bg-danger/10 text-danger", coach.severity === "warn" && "border-warn/40 bg-warn/10 text-warn", coach.severity === "info" && "border-accent/25 bg-accent/10 text-accent"),
				children: coach.message
			}),
			coach.steps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mb-2 space-y-1",
				children: coach.steps.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2 text-[11px]",
					children: [st.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-ok" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-3.5 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: st.done ? "text-muted line-through" : "text-fg",
						children: st.label
					})]
				}, st.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex gap-3 font-mono text-[10px] text-muted",
				children: [coach.reactionSec != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Реакция ",
					coach.reactionSec.toFixed(1),
					" с"
				] }), actions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Команд ", actions.length] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 space-y-1.5 overflow-y-auto",
				children: chat.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("rounded-md px-2.5 py-1.5 text-[12px] leading-relaxed", m.role === "user" ? "bg-surface-2 text-fg" : "bg-accent/10 text-accent"),
					children: m.text
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-2 flex gap-1.5",
				onSubmit: (e) => {
					e.preventDefault();
					onAsk();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: question,
					onChange: (e) => setQuestion(e.target.value),
					placeholder: "Спросить инструктора…",
					className: "min-w-0 flex-1 rounded-md border border-border bg-bg px-2 py-2 text-[12px] text-fg outline-none placeholder:text-subtle focus:border-accent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: asking || !question.trim(),
					className: "rounded-md border border-accent/40 bg-accent/15 px-2.5 text-accent disabled:opacity-40",
					"aria-label": "Отправить",
					children: asking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onDebrief,
				disabled: debriefing,
				className: "mt-2 flex items-center justify-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-[12px] font-semibold text-fg hover:border-accent/40 disabled:opacity-50",
				children: [debriefing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), "Сформировать отчёт"]
			})
		]
	});
}
function LevelChip({ ok, warn, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-sm border px-1.5 py-0.5 text-[10px] font-medium", warn ? "border-warn/40 text-warn" : ok ? "border-ok/40 text-ok" : "border-border text-subtle"),
		children: label
	});
}
function HeaderBar({ clock, score, online, onPaz }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "area-header flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-5 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-[15px] font-semibold tracking-wide text-accent",
					children: "КТК: ЭЛОУ-АВТ-4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden text-[11px] tracking-wider text-muted uppercase sm:block",
					children: "Полномасштабный тренажёр"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 sm:gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onPaz,
					className: "flex items-center gap-1.5 rounded-md border border-danger bg-danger/15 px-2.5 py-1.5 text-[11px] font-bold text-danger hover:bg-danger/25",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3.5" }), "ПАЗ"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-1.5 font-mono text-[12px] sm:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", online ? "bg-ok" : "bg-danger") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Связь"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden font-mono text-[12px] text-fg md:inline",
					children: clock
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("rounded-md border px-2.5 py-1 font-mono text-[12px] font-bold", score >= 75 ? "border-ok/40 bg-ok/10 text-ok" : score >= 40 ? "border-warn/40 bg-warn/10 text-warn" : "border-danger/40 bg-danger/10 text-danger"),
					children: [score, "/100"]
				})
			]
		})]
	});
}
function DebriefDialog({ report, onClose, onNext }) {
	const next = report.nextScenarioId ? getScenario(report.nextScenarioId) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-surface p-5 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] font-bold tracking-[0.14em] text-muted uppercase",
						children: ["Отчёт ИИ-модуля ", report.source === "ai" ? "· Grok" : "· правила"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-lg font-semibold",
						children: report.verdict === "сдал" ? "Зачёт" : report.verdict === "условно" ? "Условно" : "Не зачёт"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("rounded-md border px-2 py-1 text-[12px] font-bold", report.verdict === "сдал" && "border-ok/40 text-ok", report.verdict === "условно" && "border-warn/40 text-warn", report.verdict === "не сдал" && "border-danger/40 text-danger"),
						children: report.verdict
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-[13px] leading-relaxed text-fg",
					children: report.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 grid gap-2 text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-bg/40 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-[10px] font-bold tracking-wider text-muted uppercase",
							children: "Время реакции"
						}), report.reaction]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-bg/40 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-[10px] font-bold tracking-wider text-muted uppercase",
							children: "Последовательность"
						}), report.sequence]
					})]
				}),
				report.errors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1.5 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-danger uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }), "Ошибки оператора"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1.5",
						children: report.errors.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border border-danger/25 bg-danger/10 px-3 py-2 text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: e.text }), e.rule && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[10px] text-muted",
								children: e.rule
							})]
						}, i))
					})]
				}),
				report.recommendations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1.5 text-[11px] font-bold tracking-wider text-muted uppercase",
						children: "Рекомендации"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "list-disc space-y-1 pl-4 text-[12px] text-fg",
						children: report.recommendations.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: r }, i))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 sm:flex-row",
					children: [next && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onNext(report.nextScenarioId),
						className: "flex-1 rounded-md border border-accent/40 bg-accent/15 px-3 py-2.5 text-[12px] font-semibold text-accent",
						children: ["Далее: ", next.title]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "flex-1 rounded-md border border-border px-3 py-2.5 text-[12px] font-semibold text-fg",
						children: "Закрыть"
					})]
				}),
				report.nextScenarioReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11px] leading-relaxed text-muted",
					children: report.nextScenarioReason
				})
			]
		})
	});
}
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}
function rand(min, max) {
	return min + Math.random() * (max - min);
}
var PIDController = class {
	kp;
	ki;
	outMin;
	outMax;
	integral = 0;
	constructor(kp, ki, outMin = 0, outMax = 100) {
		this.kp = kp;
		this.ki = ki;
		this.outMin = outMin;
		this.outMax = outMax;
	}
	reset() {
		this.integral = 0;
	}
	compute(sp, pv) {
		const error = sp - pv;
		this.integral = clamp(this.integral + error, -50, 50);
		return clamp(this.kp * error + this.ki * this.integral, this.outMin, this.outMax);
	}
};
var SimulationEngine = class {
	pump_H1_on = true;
	pump_H2_on = true;
	pump_H3_on = true;
	auto_mode = true;
	sp_temp = 335;
	pid = new PIDController(2.5, .5);
	valve_feed = 80;
	valve_gas = 83.5;
	pcv_221 = 40;
	avz_1 = 80;
	valve_drain_E1 = 30;
	demulsifier_feed = 25;
	voltage_E1 = 4.8;
	water_level_E1 = 40;
	avz_broken = false;
	pcv_stuck = false;
	gas_stuck = false;
	gas_loss = false;
	level_K1 = 50;
	pressure_K1 = 2.5;
	temp_top_K1 = 140;
	level_K2 = 45;
	pressure_K2 = 1.2;
	temp_K2 = 250;
	temp_p3_out = 335;
	vib_H1 = 2.1;
	vib_H2 = 1.8;
	vib_H3 = 1.9;
	alarms = [];
	score = 100;
	exploded = false;
	tick = 0;
	maxTempP3 = 335;
	maxPressureK1 = 2.5;
	minLevelK1 = 50;
	minLevelK2 = 45;
	maxVibH2 = 1.8;
	maxVibH3 = 1.9;
	reset() {
		this.pid = new PIDController(2.5, .5);
		this.pump_H1_on = true;
		this.pump_H2_on = true;
		this.pump_H3_on = true;
		this.auto_mode = true;
		this.sp_temp = 335;
		this.valve_feed = 80;
		this.valve_gas = 83.5;
		this.pcv_221 = 40;
		this.avz_1 = 80;
		this.valve_drain_E1 = 30;
		this.demulsifier_feed = 25;
		this.voltage_E1 = 4.8;
		this.water_level_E1 = 40;
		this.avz_broken = false;
		this.pcv_stuck = false;
		this.gas_stuck = false;
		this.gas_loss = false;
		this.level_K1 = 50;
		this.pressure_K1 = 2.5;
		this.temp_top_K1 = 140;
		this.level_K2 = 45;
		this.pressure_K2 = 1.2;
		this.temp_K2 = 250;
		this.temp_p3_out = 335;
		this.vib_H1 = 2.1;
		this.vib_H2 = 1.8;
		this.vib_H3 = 1.9;
		this.alarms = [];
		this.score = 100;
		this.exploded = false;
		this.tick = 0;
		this.maxTempP3 = 335;
		this.maxPressureK1 = 2.5;
		this.minLevelK1 = 50;
		this.minLevelK2 = 45;
		this.maxVibH2 = 1.8;
		this.maxVibH3 = 1.9;
	}
	triggerWaterSlug() {
		this.pressure_K1 += 1.8;
		this.alarms.push("ГИДРОУДАР: вскипание воды в печи П-3");
		this.score -= 15;
	}
	apply(action, value) {
		const v = value ?? 0;
		switch (action) {
			case "set_pump_h1":
				this.pump_H1_on = Boolean(v);
				break;
			case "set_pump_h2":
				this.pump_H2_on = Boolean(v);
				break;
			case "set_pump_h3":
				this.pump_H3_on = Boolean(v);
				break;
			case "set_feed_valve":
				this.valve_feed = clamp(v, 0, 100);
				break;
			case "set_drain_e1":
				this.valve_drain_E1 = clamp(v, 0, 100);
				break;
			case "set_demulsifier":
				this.demulsifier_feed = clamp(v, 0, 100);
				break;
			case "restore_voltage":
				if (this.water_level_E1 < 75) this.voltage_E1 = 4.8;
				break;
			case "set_pcv":
				if (!this.pcv_stuck) this.pcv_221 = clamp(v, 0, 100);
				break;
			case "set_avz":
				if (!this.avz_broken) this.avz_1 = clamp(v, 0, 100);
				break;
			case "set_trc3_mode":
				this.auto_mode = Boolean(v);
				break;
			case "set_gas_valve":
				if (!this.auto_mode && !this.gas_stuck && !this.gas_loss) this.valve_gas = clamp(v, 0, 100);
				break;
			case "break_pump_h1":
				this.pump_H1_on = false;
				break;
			case "jam_pcv":
				this.pcv_stuck = true;
				this.pcv_221 = 0;
				break;
			case "jam_gas":
				this.gas_stuck = true;
				this.valve_gas = 100;
				this.auto_mode = false;
				break;
			case "break_avz":
				this.avz_broken = true;
				this.avz_1 = 0;
				break;
			case "water_slug":
				this.triggerWaterSlug();
				break;
			case "gas_loss":
				this.gas_loss = true;
				this.auto_mode = false;
				break;
			case "short_circuit":
				this.valve_drain_E1 = 0;
				this.water_level_E1 = 85;
				break;
			case "demulsifier_fail": this.demulsifier_feed = 0;
		}
	}
	update() {
		if (this.exploded) return;
		this.tick += 1;
		this.alarms = [];
		const flow_H1 = this.pump_H1_on ? 150 : 0;
		this.water_level_E1 += (flow_H1 * .03 - this.valve_drain_E1 / 100 * 15) * .1;
		this.water_level_E1 = clamp(this.water_level_E1 + rand(-.1, .1), 0, 100);
		if (this.water_level_E1 > 80 && this.voltage_E1 > 0) {
			this.voltage_E1 = 0;
			this.alarms.push("[ПАЗ] Короткое замыкание Э-1. Высокий уровень воды.");
			this.score -= 10;
		}
		const flow_to_K1 = flow_H1 * (this.valve_feed / 100);
		const flow_H3 = this.pump_H3_on ? 120 : 0;
		if ((this.voltage_E1 < 2 || this.demulsifier_feed < 5) && flow_to_K1 > 0) {
			this.pressure_K1 += rand(.05, .15);
			this.alarms.push("НАРУШЕНИЕ ОБЕССОЛИВАНИЯ: вода поступает в К-1.");
		}
		this.level_K1 += (flow_to_K1 - flow_H3) * .05 + rand(-.1, .1);
		this.level_K1 = clamp(this.level_K1, 0, 100);
		this.vib_H1 = this.pump_H1_on ? 2.1 + rand(-.1, .1) : 0;
		if (this.pump_H3_on) {
			if (this.level_K1 < 15) {
				this.vib_H3 = Math.min(12, this.vib_H3 + .4 + rand(0, .2));
				this.alarms.push(`КАВИТАЦИЯ Н-3. Вибрация ${this.vib_H3.toFixed(1)} мм/с`);
			} else this.vib_H3 = Math.max(1.9, this.vib_H3 - .5) + rand(-.1, .1);
		} else this.vib_H3 = 0;
		if (this.vib_H3 > 9 && this.pump_H3_on) {
			this.alarms.push("[ПАЗ] Разрушение Н-3.");
			this.pump_H3_on = false;
			this.score -= 20;
		}
		if (this.gas_loss) {
			this.valve_gas = 0;
			this.alarms.push("ОБРЫВ ПЛАМЕНИ П-3. Нет давления в топливной сети.");
		} else if (this.auto_mode && !this.gas_stuck) this.valve_gas = this.pid.compute(this.sp_temp, this.temp_p3_out);
		const heat_in = this.valve_gas / 100 * 3e3;
		let target_temp = flow_H3 > 0 ? 200 + heat_in / flow_H3 * 6.47 : 900;
		if (flow_H3 === 0 && heat_in > 0) {
			target_temp = 900;
			this.alarms.push("ОПАСНОСТЬ ПРОГАРА ТРУБ П-3. Нет циркуляции.");
		}
		this.temp_p3_out += (target_temp - this.temp_p3_out) / 4;
		const vapor_gen = Math.max(0, (this.temp_p3_out - 200) * .02);
		const relief = this.pcv_221 / 100 * 6.75;
		this.pressure_K1 = Math.max(1, this.pressure_K1 + (vapor_gen - relief) * .1 + rand(-.02, .02));
		const cooling = this.avz_broken ? 0 : this.avz_1 / 100 * 50;
		this.temp_top_K1 += (Math.max(20, this.temp_p3_out * .537 - cooling) - this.temp_top_K1) / 3;
		const flow_H2 = this.pump_H2_on ? 120 : 0;
		this.level_K2 += (flow_H3 - flow_H2) * .05 + rand(-.1, .1);
		this.level_K2 = clamp(this.level_K2, 0, 100);
		this.temp_K2 += (this.temp_p3_out * .8 - this.temp_K2) / 5;
		this.pressure_K2 = 1 + Math.max(0, (this.temp_K2 - 200) * .01);
		if (this.pump_H2_on) {
			if (this.level_K2 < 15) {
				this.vib_H2 = Math.min(12, this.vib_H2 + .4 + rand(0, .2));
				this.alarms.push(`КАВИТАЦИЯ Н-2. Вибрация ${this.vib_H2.toFixed(1)} мм/с`);
			} else this.vib_H2 = Math.max(1.8, this.vib_H2 - .5) + rand(-.1, .1);
		} else this.vib_H2 = 0;
		if (this.vib_H2 > 9 && this.pump_H2_on) {
			this.alarms.push("[ПАЗ] Разрушение Н-2.");
			this.pump_H2_on = false;
			this.score -= 20;
		}
		if (this.pressure_K1 > 4.5) {
			this.alarms.push("[ПАЗ] Высокое давление в К-1 (>4.5 кгс/см²)");
			this.score -= 5;
		}
		if (this.pressure_K1 > 5.4) {
			this.alarms.push("ВЗРЫВ КОЛОННЫ К-1 ОТ ИЗБЫТОЧНОГО ДАВЛЕНИЯ");
			this.exploded = true;
			this.score = 0;
		}
		if (this.level_K1 >= 100 || this.level_K2 >= 100) {
			this.alarms.push("ЗАХЛЕБЫВАНИЕ. Унос жидкости.");
			this.score -= 10;
		}
		if (this.temp_top_K1 > 150) {
			this.alarms.push("[СИГНАЛИЗАЦИЯ] Перегрев верха К-1 (>150 °C)");
			this.score -= 2;
		}
		if (this.temp_p3_out >= 360) {
			this.alarms.push("КРИТИЧЕСКАЯ АВАРИЯ: ПРОГАР ПЕЧИ П-3");
			this.score -= 10;
		}
		this.score = Math.max(0, this.score);
		this.maxTempP3 = Math.max(this.maxTempP3, this.temp_p3_out);
		this.maxPressureK1 = Math.max(this.maxPressureK1, this.pressure_K1);
		this.minLevelK1 = Math.min(this.minLevelK1, this.level_K1);
		this.minLevelK2 = Math.min(this.minLevelK2, this.level_K2);
		this.maxVibH2 = Math.max(this.maxVibH2, this.vib_H2);
		this.maxVibH3 = Math.max(this.maxVibH3, this.vib_H3);
	}
	getState() {
		return {
			score: this.score,
			alarms: [...this.alarms],
			exploded: this.exploded,
			pump_H1: this.pump_H1_on,
			pump_H2: this.pump_H2_on,
			pump_H3: this.pump_H3_on,
			valve_feed: round1(this.valve_feed),
			valve_drain_E1: round1(this.valve_drain_E1),
			demulsifier_feed: round1(this.demulsifier_feed),
			voltage_E1: round1(this.voltage_E1),
			water_level_E1: round1(this.water_level_E1),
			flow_in: round1(this.pump_H1_on ? 150 * (this.valve_feed / 100) : 0),
			level_K1: round1(this.level_K1),
			pressure_K1: round2(this.pressure_K1),
			temp_top_K1: round1(this.temp_top_K1),
			level_K2: round1(this.level_K2),
			pressure_K2: round2(this.pressure_K2),
			temp_K2: round1(this.temp_K2),
			flow_H3: this.pump_H3_on ? 120 : 0,
			flow_out: this.pump_H2_on ? 120 : 0,
			TRC3_mode: this.auto_mode ? "AUTO" : "MANUAL",
			valve_gas: round1(this.valve_gas),
			temp_P3: round1(this.temp_p3_out),
			pcv_221: round1(this.pcv_221),
			avz_1: round1(this.avz_1),
			avz_broken: this.avz_broken,
			pcv_stuck: this.pcv_stuck,
			gas_stuck: this.gas_stuck,
			gas_loss: this.gas_loss,
			vib_H1: round2(this.vib_H1),
			vib_H2: round2(this.vib_H2),
			vib_H3: round2(this.vib_H3),
			tick: this.tick
		};
	}
};
function round1(n) {
	return Math.round(n * 10) / 10;
}
function round2(n) {
	return Math.round(n * 100) / 100;
}
var RULE_REF = "п. 7.9.1 и раздел 3.5 Регламента ЭЛОУ-АВТ-4";
function evaluateCoach(state, scenarioId, actions, startedAt, now) {
	const scenario = getScenario(scenarioId);
	const flags = [];
	if (state.exploded) {
		flags.push("Разрушение колонны К-1 по давлению");
		return {
			message: "Критический отказ. Давление К-1 превысило 5.4 кгс/см². Разбор тренировки обязателен.",
			severity: "danger",
			steps: scenario ? scenario.steps.map((st) => ({
				id: st.id,
				label: st.label,
				done: st.check(state, actions)
			})) : [],
			reactionSec: reactionOf(actions, startedAt),
			nextAction: null,
			resolved: false,
			flags
		};
	}
	if (!scenario || startedAt == null) {
		if (state.temp_P3 >= 350) {
			flags.push("Перегрев П-3 без активного сценария");
			return {
				message: "Температура П-3 приближается к пределу. Переведите TRC-3 в ручной и снизьте газ.",
				severity: "danger",
				steps: [],
				reactionSec: null,
				nextAction: "TRC-3 ручной, газ вниз",
				resolved: false,
				flags
			};
		}
		return {
			message: "ИИ-модуль активен. Запустите сценарий отказа — буду сравнивать ваши команды с эталонной последовательностью и временем реакции.",
			severity: "info",
			steps: [],
			reactionSec: null,
			nextAction: null,
			resolved: false,
			flags
		};
	}
	const steps = scenario.steps.map((st) => ({
		id: st.id,
		label: st.label,
		done: st.check(state, actions)
	}));
	const next = scenario.steps.find((st, i) => !steps[i]?.done);
	const allDone = steps.every((s) => s.done);
	const reactionSec = reactionOf(actions, startedAt);
	const elapsed = (now - startedAt) / 1e3;
	if (state.temp_P3 >= 360) flags.push("Допущен прогар труб змеевика П-3");
	else if (state.temp_P3 >= 340) flags.push("Перегрев П-3 выше 340 °C");
	if (state.pressure_K1 >= 4.5) flags.push("Срабатывание ПАЗ по давлению К-1");
	if (state.vib_H3 > 7) flags.push("Кавитация Н-3");
	if (state.vib_H2 > 7) flags.push("Кавитация Н-2");
	if (reactionSec != null && reactionSec > 12) flags.push(`Медленная первая реакция (${reactionSec.toFixed(0)} с)`);
	if (elapsed > scenario.timeoutSec && !allDone) flags.push("Превышено нормативное время реакции по сценарию");
	let severity = "info";
	if (state.temp_P3 >= 350 || state.pressure_K1 >= 4.5 || state.alarms.some((a) => a.includes("ПРОГАР") || a.includes("ВЗРЫВ") || a.includes("ПАЗ"))) severity = "danger";
	else if (state.alarms.length > 0 || elapsed > scenario.timeoutSec * .6) severity = "warn";
	if (allDone && state.temp_P3 < 345 && state.pressure_K1 < 4.2) return {
		message: "Эталонные действия выполнены, процесс стабилизируется. Сформируйте отчёт — разберу последовательность и время реакции.",
		severity: "info",
		steps,
		reactionSec,
		nextAction: null,
		resolved: true,
		flags
	};
	return {
		message: (next?.hint ?? scenario.instructorNote) + (elapsed > scenario.timeoutSec ? " Время по регламенту уже превышено." : elapsed > scenario.timeoutSec * .5 ? " Действуйте быстрее." : ""),
		severity,
		steps,
		reactionSec,
		nextAction: next?.label ?? null,
		resolved: false,
		flags
	};
}
function reactionOf(actions, startedAt) {
	if (startedAt == null) return null;
	const first = actions.find((a) => a.t >= startedAt);
	if (!first) return null;
	return (first.t - startedAt) / 1e3;
}
function buildDebriefPayload(state, scenarioId, scenarioTitle, actions, startedAt, now, extrema, uniqueAlarms, coach) {
	return {
		scenarioId,
		scenarioTitle,
		durationSec: startedAt ? Math.round((now - startedAt) / 1e3) : 0,
		score: state.score,
		exploded: state.exploded,
		reactionSec: coach.reactionSec,
		actions: actions.slice(-40).map((a) => ({
			t: startedAt ? Math.round((a.t - startedAt) / 1e3) : 0,
			label: a.label
		})),
		steps: coach.steps,
		flags: coach.flags,
		extrema,
		alarms: uniqueAlarms.slice(0, 20)
	};
}
function ruleDebrief(payload) {
	const errors = [];
	const recs = [];
	if (payload.exploded) {
		errors.push({
			text: "Разрушение колонны К-1 по избыточному давлению.",
			rule: RULE_REF
		});
		recs.push("При отказе сброса на факел немедленно гасите печь: TRC-3 ручной, газ 0%.");
	}
	if (payload.extrema.maxTempP3 >= 360) {
		errors.push({
			text: `Прогар труб змеевика П-3. Максимум ${payload.extrema.maxTempP3.toFixed(1)} °C.`,
			rule: RULE_REF
		});
		recs.push("При потере циркуляции сырья немедленно отсекайте топливный газ. Не оставляйте печь на AUTO.");
	} else if (payload.extrema.maxTempP3 > 340) errors.push({
		text: `Перегрев печи до ${payload.extrema.maxTempP3.toFixed(1)} °C. Действия верные, но медленные.`,
		rule: "Раздел 3.5, ограничение 340 °C"
	});
	if (payload.reactionSec != null && payload.reactionSec > 12) errors.push({
		text: `Первая команда через ${payload.reactionSec.toFixed(0)} с при нормативе ≤ 8–10 с.`,
		rule: "Норматив реакции оператора КТК"
	});
	const missed = payload.steps.filter((s) => !s.done);
	if (missed.length) errors.push({
		text: `Не выполнены шаги: ${missed.map((s) => s.label).join("; ")}.`,
		rule: "Эталонный сценарий инструктора"
	});
	const doneRatio = payload.steps.length === 0 ? 1 : payload.steps.filter((s) => s.done).length / payload.steps.length;
	let verdict = "сдал";
	if (payload.exploded || payload.extrema.maxTempP3 >= 360 || payload.score < 40) verdict = "не сдал";
	else if (doneRatio < 1 || payload.score < 75 || errors.length > 1) verdict = "условно";
	const summary = verdict === "сдал" ? "Оператор действовал в рамках регламента и не допустил критических отклонений." : verdict === "условно" ? "Сценарий отработан с замечаниями. Требуется повтор на смежном отказе." : "Тренировка не зачтена: допущены критические нарушения технологического режима.";
	const next = suggestNext(payload.scenarioId, verdict, payload.flags);
	if (!recs.length) recs.push("Повторите сценарий с фиксацией времени первой команды менее 8 секунд.");
	return {
		verdict,
		summary,
		errors,
		reaction: payload.reactionSec == null ? "Команд оператора не зафиксировано." : payload.reactionSec <= 8 ? `Реакция ${payload.reactionSec.toFixed(1)} с — в нормативе.` : `Реакция ${payload.reactionSec.toFixed(1)} с — медленнее норматива 8 с.`,
		sequence: missed.length === 0 ? "Последовательность совпала с эталоном." : `Отклонение от эталона: пропущены ${missed.map((s) => s.label).join(", ")}.`,
		recommendations: recs,
		nextScenarioId: next.id,
		nextScenarioReason: next.reason,
		source: "rules"
	};
}
function suggestNext(current, verdict, flags) {
	if (flags.some((f) => f.includes("прогар") || f.includes("Прогар"))) return {
		id: "break_pump_h1",
		reason: "Повторить отказ Н-1: отработать отсечение газа до потери циркуляции."
	};
	if (flags.some((f) => f.includes("давлен"))) return {
		id: "jam_pcv",
		reason: "Заклинивание PCV — отработать гашение печи при росте давления."
	};
	if (verdict === "сдал") return {
		id: current && {
			water_slug: "jam_pcv",
			break_avz: "jam_gas",
			gas_loss: "break_pump_h1",
			short_circuit: "demulsifier_fail",
			demulsifier_fail: "jam_pcv",
			break_pump_h1: "jam_pcv",
			jam_gas: "jam_pcv",
			jam_pcv: "break_pump_h1"
		}[current] || "jam_pcv",
		reason: "Сценарий зачтён. Следующий — смежный отказ с более жёстким таймингом."
	};
	return {
		id: current ?? "break_pump_h1",
		reason: "Повторить тот же отказ до стабильного выполнения эталона."
	};
}
var seq = 0;
function nid() {
	seq += 1;
	return `${Date.now()}-${seq}`;
}
function useSimulation() {
	const engineRef = (0, import_react.useRef)(null);
	if (!engineRef.current) engineRef.current = new SimulationEngine();
	const [state, setState] = (0, import_react.useState)(() => engineRef.current.getState());
	const [alarms, setAlarms] = (0, import_react.useState)([]);
	const [actions, setActions] = (0, import_react.useState)([]);
	const [scenarioId, setScenarioId] = (0, import_react.useState)(null);
	const [startedAt, setStartedAt] = (0, import_react.useState)(null);
	const [now, setNow] = (0, import_react.useState)(0);
	const [clock, setClock] = (0, import_react.useState)("--:--:--");
	const ingestAlarms = (0, import_react.useCallback)((list) => {
		if (!list.length) return;
		setAlarms((prev) => {
			const next = [...prev];
			for (const text of list) if (!next.some((a) => a.text === text && !a.ack)) next.unshift({
				id: nid(),
				time: (/* @__PURE__ */ new Date()).toLocaleTimeString("ru-RU"),
				text,
				ack: false
			});
			return next.slice(0, 80);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			const engine = engineRef.current;
			engine.update();
			const snap = engine.getState();
			setState(snap);
			setNow(Date.now());
			setClock((/* @__PURE__ */ new Date()).toLocaleTimeString("ru-RU"));
			ingestAlarms(snap.alarms);
		}, 1e3);
		return () => window.clearInterval(id);
	}, [ingestAlarms]);
	const cmd = (0, import_react.useCallback)((action, value = null) => {
		const engine = engineRef.current;
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
		setActions((prev) => [...prev, {
			id: nid(),
			t: Date.now(),
			tick: engine.tick,
			action,
			value,
			label
		}].slice(-80));
		return null;
	}, [ingestAlarms]);
	const reset = (0, import_react.useCallback)(() => {
		engineRef.current.reset();
		setState(engineRef.current.getState());
		setAlarms([]);
		setActions([]);
		setScenarioId(null);
		setStartedAt(null);
	}, []);
	const ackAlarm = (0, import_react.useCallback)((id) => {
		setAlarms((prev) => prev.map((a) => a.id === id ? {
			...a,
			ack: true
		} : a));
	}, []);
	return {
		state,
		alarms,
		actions,
		scenarioId,
		startedAt,
		now,
		clock,
		extrema: {
			maxTempP3: engineRef.current.maxTempP3,
			maxPressureK1: engineRef.current.maxPressureK1,
			minLevelK1: engineRef.current.minLevelK1,
			minLevelK2: engineRef.current.minLevelK2,
			maxVibH2: engineRef.current.maxVibH2,
			maxVibH3: engineRef.current.maxVibH3
		},
		coach: evaluateCoach(state, scenarioId, actions, startedAt, now),
		cmd,
		reset,
		ackAlarm
	};
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askTutor = createServerFn({ method: "POST" }).validator((input) => ({
	question: String(input.question ?? "").slice(0, 500),
	snapshot: String(input.snapshot ?? "").slice(0, 3500)
})).handler(createSsrRpc("d9b7f3703f538ded2869fe11aba11fd4ec12d6ef5cfab6bd9b736aa1a930f982"));
var generateDebrief = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("edb92658caa6dd02e38c36433371162880e57724894ae7871d23a095bc4d925a"));
function Dashboard() {
	const sim = useSimulation();
	const scadaRef = (0, import_react.useRef)(null);
	const [zoom, setZoom] = (0, import_react.useState)(.72);
	const [pan, setPan] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const startPos = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const [activePanel, setActivePanel] = (0, import_react.useState)(null);
	const [isMobile, setIsMobile] = (0, import_react.useState)(() => typeof window !== "undefined" && window.innerWidth <= 720);
	const [tab, setTab] = (0, import_react.useState)("ai");
	const [question, setQuestion] = (0, import_react.useState)("");
	const [chat, setChat] = (0, import_react.useState)([]);
	const [asking, setAsking] = (0, import_react.useState)(false);
	const [debriefing, setDebriefing] = (0, import_react.useState)(false);
	const [report, setReport] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const el = scadaRef.current;
		if (!el) return;
		const mq = window.matchMedia("(max-width: 720px)");
		const applyMq = () => setIsMobile(mq.matches);
		applyMq();
		mq.addEventListener("change", applyMq);
		const layout = () => {
			const mobile = mq.matches;
			const fit = Math.min(el.clientWidth / 2200, el.clientHeight / 1200);
			const z = mobile ? .52 : Math.round(Math.max(.42, Math.min(1.05, fit * 1.02)) * 100) / 100;
			setZoom(z);
			setPan({
				x: el.clientWidth / 2 - (mobile ? 1e3 : 1100) * z,
				y: el.clientHeight / 2 - (mobile ? 720 : 680) * z
			});
		};
		layout();
		const onWheel = (e) => {
			e.preventDefault();
			const delta = -e.deltaY * .0015;
			setZoom((prev) => Math.round(Math.min(Math.max(.35, prev + delta), 2.2) * 100) / 100);
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		window.addEventListener("resize", layout);
		return () => {
			el.removeEventListener("wheel", onWheel);
			window.removeEventListener("resize", layout);
			mq.removeEventListener("change", applyMq);
		};
	}, []);
	const beginPan = (x, y) => {
		setDragging(true);
		startPos.current = {
			x: x - pan.x,
			y: y - pan.y
		};
	};
	const onMapDown = (e) => {
		const t = e.target;
		if (t.closest(".eq-node") || t.closest(".valve-wrap")) return;
		beginPan(e.clientX, e.clientY);
	};
	const onMapMove = (e) => {
		if (!dragging) return;
		setPan({
			x: e.clientX - startPos.current.x,
			y: e.clientY - startPos.current.y
		});
	};
	const onTouchStart = (e) => {
		const t = e.target;
		if (t.closest(".eq-node") || t.closest(".valve-wrap")) return;
		const p = e.touches[0];
		if (p) beginPan(p.clientX, p.clientY);
	};
	const onTouchMove = (e) => {
		if (!dragging) return;
		const p = e.touches[0];
		if (p) setPan({
			x: p.clientX - startPos.current.x,
			y: p.clientY - startPos.current.y
		});
	};
	const snapshot = () => {
		const s = sim.state;
		return [
			`Сценарий: ${getScenario(sim.scenarioId)?.title ?? "штатный режим"}`,
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
			`Подсказка: ${sim.coach.message}`
		].join("\n");
	};
	const handleAsk = async () => {
		const q = question.trim();
		if (!q || asking) return;
		setAsking(true);
		setChat((c) => [...c, {
			role: "user",
			text: q
		}]);
		setQuestion("");
		try {
			const res = await askTutor({ data: {
				question: q,
				snapshot: snapshot()
			} });
			setChat((c) => [...c, {
				role: "assistant",
				text: res.ok ? res.text : res.error
			}]);
		} catch {
			setChat((c) => [...c, {
				role: "assistant",
				text: "Связь с ИИ-модулем потеряна."
			}]);
		} finally {
			setAsking(false);
		}
	};
	const handleDebrief = async () => {
		if (debriefing) return;
		setDebriefing(true);
		const payload = buildDebriefPayload(sim.state, sim.scenarioId, getScenario(sim.scenarioId)?.title ?? "Штатный режим", sim.actions, sim.startedAt, sim.now, sim.extrema, [...new Set(sim.alarms.map((a) => a.text))], sim.coach);
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
		setPan({
			x: 0,
			y: 0
		});
		setChat([]);
		setReport(null);
	};
	const handleScenario = (id) => {
		sim.cmd(id);
		setTab("ai");
		setReport(null);
	};
	const handleNext = (id) => {
		setReport(null);
		if (id) {
			sim.reset();
			setTimeout(() => sim.cmd(id), 50);
		}
	};
	if (sim.state.exploded) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shake-overlay flex min-h-dvh flex-col items-center justify-center bg-danger/50 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-3xl font-bold tracking-wide text-fg sm:text-5xl",
				children: "ВЗРЫВ КОЛОННЫ К-1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-[15px] text-fg/90",
				children: "Критическое превышение давления. Аппарат разрушен. Сформируйте отчёт или перезапустите тренажёр."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleDebrief,
					className: "rounded-md border border-fg/30 bg-bg/40 px-5 py-3 text-[13px] font-semibold text-fg",
					children: "Отчёт ИИ-модуля"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleReset,
					className: "rounded-md border border-ok/50 bg-ok/20 px-5 py-3 text-[13px] font-semibold text-ok",
					children: "Перезапуск тренажёра"
				})]
			}),
			report && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebriefDialog, {
				report,
				onClose: () => setReport(null),
				onNext: handleNext
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dashboard-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderBar, {
				clock: sim.clock,
				score: sim.state.score,
				online: true,
				onPaz: () => sim.cmd("paz")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scadaRef,
				className: cn("area-scada relative overflow-hidden rounded-lg border border-border", dragging ? "cursor-grabbing" : "cursor-grab"),
				onMouseDown: onMapDown,
				onMouseMove: onMapMove,
				onMouseUp: () => setDragging(false),
				onMouseLeave: () => setDragging(false),
				onTouchStart,
				onTouchMove,
				onTouchEnd: () => setDragging(false),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute top-3 left-3 z-10 rounded-sm border border-border bg-surface px-2 py-1 text-[10px] font-bold tracking-wider text-muted uppercase",
					children: "Мнемосхема АСУ ТП · колесо — масштаб"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScadaScheme, {
					state: sim.state,
					zoom,
					pan,
					activePanel,
					onEquipmentClick: (id) => {
						setActivePanel(id);
						setTab("props");
					}
				})]
			}),
			!isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "contents",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertiesPanel, {
						state: sim.state,
						active: activePanel,
						cmd: sim.cmd
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiPanel, {
						coach: sim.coach,
						scenarioId: sim.scenarioId,
						actions: sim.actions,
						question,
						setQuestion,
						chat,
						asking,
						onAsk: handleAsk,
						onDebrief: handleDebrief,
						debriefing
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiagPanel, { state: sim.state }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstructorPanel, {
						onScenario: handleScenario,
						onReset: handleReset
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlarmsPanel, {
						alarms: sim.alarms,
						onAck: sim.ackAlarm
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 grid grid-cols-4 gap-1",
					children: [
						["ai", "ИИ"],
						["props", "Объект"],
						["inst", "Сценарии"],
						["alarms", "Тревоги"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(id),
						className: cn("rounded-md border px-2 py-2 text-[11px] font-semibold", tab === id ? "border-accent text-accent" : "border-border text-muted"),
						children: label
					}, id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-[220px] flex-1",
					children: [
						tab === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiPanel, {
							coach: sim.coach,
							scenarioId: sim.scenarioId,
							actions: sim.actions,
							question,
							setQuestion,
							chat,
							asking,
							onAsk: handleAsk,
							onDebrief: handleDebrief,
							debriefing
						}),
						tab === "props" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertiesPanel, {
							state: sim.state,
							active: activePanel,
							cmd: sim.cmd
						}),
						tab === "inst" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstructorPanel, {
							onScenario: handleScenario,
							onReset: handleReset
						}),
						tab === "alarms" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlarmsPanel, {
							alarms: sim.alarms,
							onAck: sim.ackAlarm
						})
					]
				})]
			}),
			report && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebriefDialog, {
				report,
				onClose: () => setReport(null),
				onNext: handleNext
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {});
}
//#endregion
export { Home as component };
