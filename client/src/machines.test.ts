import { describe, expect, it } from "vitest";
import { calculateMachineHours, getMachineDailyStatus } from "./machines";
import type { LocalProject } from "./localStore";

const project: LocalProject = {
  name: "Jardim Planalto", location: "São Paulo", status: "Em execução", description: "Teste", fronts: [], actions: [], events: [], diaries: [], weeklyTargets: [], materialReceipts: [], teamMembers: [], teamAssignments: [],
  machines: [{ id: "machine-1", name: "Escavadeira", type: "Escavadeira hidráulica", identifier: "EX-01", active: true }, { id: "machine-2", name: "Rolo", type: "Rolo compactador", identifier: "RC-01", active: true }],
  machineLogs: [{ id: "log-1", date: "2026-08-28", machineId: "machine-1", frontId: "drn-01", operator: "Ana", condition: "Trabalhando", hourmeterStart: 120.5, hourmeterEnd: 128, note: "" }],
};

describe("controle de máquinas", () => {
  it("calcula as horas do horímetro e evita resultado negativo", () => {
    expect(calculateMachineHours(120.5, 128)).toBe(7.5);
    expect(calculateMachineHours(128, 120.5)).toBe(0);
  });

  it("destaca equipamento sem lançamento no quadro diário", () => {
    expect(getMachineDailyStatus(project, "2026-08-28").map((item) => [item.machine.identifier, item.condition, item.hours])).toEqual([["EX-01", "Trabalhando", 7.5], ["RC-01", "Sem lançamento", 0]]);
  });
});
