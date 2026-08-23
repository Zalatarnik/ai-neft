import type { PlantState } from "./types";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

class PIDController {
  kp: number;
  ki: number;
  outMin: number;
  outMax: number;
  integral = 0;

  constructor(kp: number, ki: number, outMin = 0, outMax = 100) {
    this.kp = kp;
    this.ki = ki;
    this.outMin = outMin;
    this.outMax = outMax;
  }

  reset() {
    this.integral = 0;
  }

  compute(sp: number, pv: number) {
    const error = sp - pv;
    this.integral = clamp(this.integral + error, -50, 50);
    return clamp(this.kp * error + this.ki * this.integral, this.outMin, this.outMax);
  }
}

export class SimulationEngine {
  pump_H1_on = true;
  pump_H2_on = true;
  pump_H3_on = true;
  auto_mode = true;
  sp_temp = 335;
  pid = new PIDController(2.5, 0.5);
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
  alarms: string[] = [];
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
    this.pid = new PIDController(2.5, 0.5);
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

  apply(action: string, value: number | null) {
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
        if (!this.auto_mode && !this.gas_stuck && !this.gas_loss) {
          this.valve_gas = clamp(v, 0, 100);
        }
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
      case "demulsifier_fail":
        this.demulsifier_feed = 0;
        break;
      default:
        break;
    }
  }

  update() {
    if (this.exploded) return;
    this.tick += 1;
    this.alarms = [];

    const flow_H1 = this.pump_H1_on ? 150 : 0;
    // Steady at default drain 30% with H-1 running.
    this.water_level_E1 += (flow_H1 * 0.03 - (this.valve_drain_E1 / 100) * 15) * 0.1;
    this.water_level_E1 = clamp(this.water_level_E1 + rand(-0.1, 0.1), 0, 100);

    if (this.water_level_E1 > 80 && this.voltage_E1 > 0) {
      this.voltage_E1 = 0;
      this.alarms.push("[ПАЗ] Короткое замыкание Э-1. Высокий уровень воды.");
      this.score -= 10;
    }

    const flow_to_K1 = flow_H1 * (this.valve_feed / 100);
    const flow_H3 = this.pump_H3_on ? 120 : 0;

    if ((this.voltage_E1 < 2 || this.demulsifier_feed < 5) && flow_to_K1 > 0) {
      this.pressure_K1 += rand(0.05, 0.15);
      this.alarms.push("НАРУШЕНИЕ ОБЕССОЛИВАНИЯ: вода поступает в К-1.");
    }

    this.level_K1 += (flow_to_K1 - flow_H3) * 0.05 + rand(-0.1, 0.1);
    this.level_K1 = clamp(this.level_K1, 0, 100);

    this.vib_H1 = this.pump_H1_on ? 2.1 + rand(-0.1, 0.1) : 0;

    if (this.pump_H3_on) {
      if (this.level_K1 < 15) {
        this.vib_H3 = Math.min(12, this.vib_H3 + 0.4 + rand(0, 0.2));
        this.alarms.push(`КАВИТАЦИЯ Н-3. Вибрация ${this.vib_H3.toFixed(1)} мм/с`);
      } else {
        this.vib_H3 = Math.max(1.9, this.vib_H3 - 0.5) + rand(-0.1, 0.1);
      }
    } else {
      this.vib_H3 = 0;
    }

    if (this.vib_H3 > 9 && this.pump_H3_on) {
      this.alarms.push("[ПАЗ] Разрушение Н-3.");
      this.pump_H3_on = false;
      this.score -= 20;
    }

    if (this.gas_loss) {
      this.valve_gas = 0;
      this.alarms.push("ОБРЫВ ПЛАМЕНИ П-3. Нет давления в топливной сети.");
    } else if (this.auto_mode && !this.gas_stuck) {
      this.valve_gas = this.pid.compute(this.sp_temp, this.temp_p3_out);
    }

    const heat_in = (this.valve_gas / 100) * 3000;
    let target_temp = flow_H3 > 0 ? 200 + (heat_in / flow_H3) * 6.47 : 900;
    if (flow_H3 === 0 && heat_in > 0) {
      target_temp = 900;
      this.alarms.push("ОПАСНОСТЬ ПРОГАРА ТРУБ П-3. Нет циркуляции.");
    }
    this.temp_p3_out += (target_temp - this.temp_p3_out) / 4;

    const vapor_gen = Math.max(0, (this.temp_p3_out - 200) * 0.02);
    const relief = (this.pcv_221 / 100) * 6.75;
    this.pressure_K1 = Math.max(
      1,
      this.pressure_K1 + (vapor_gen - relief) * 0.1 + rand(-0.02, 0.02),
    );

    const cooling = this.avz_broken ? 0 : (this.avz_1 / 100) * 50;
    this.temp_top_K1 += (Math.max(20, this.temp_p3_out * 0.537 - cooling) - this.temp_top_K1) / 3;

    const flow_H2 = this.pump_H2_on ? 120 : 0;
    this.level_K2 += (flow_H3 - flow_H2) * 0.05 + rand(-0.1, 0.1);
    this.level_K2 = clamp(this.level_K2, 0, 100);
    this.temp_K2 += (this.temp_p3_out * 0.8 - this.temp_K2) / 5;
    this.pressure_K2 = 1 + Math.max(0, (this.temp_K2 - 200) * 0.01);

    if (this.pump_H2_on) {
      if (this.level_K2 < 15) {
        this.vib_H2 = Math.min(12, this.vib_H2 + 0.4 + rand(0, 0.2));
        this.alarms.push(`КАВИТАЦИЯ Н-2. Вибрация ${this.vib_H2.toFixed(1)} мм/с`);
      } else {
        this.vib_H2 = Math.max(1.8, this.vib_H2 - 0.5) + rand(-0.1, 0.1);
      }
    } else {
      this.vib_H2 = 0;
    }

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

  getState(): PlantState {
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
      tick: this.tick,
    };
  }
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}
