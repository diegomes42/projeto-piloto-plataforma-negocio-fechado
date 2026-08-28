import { describe, expect, it } from "vitest";
import { getWeeklyTargetSnapshots } from "./physicalPlanning";
import type { LocalProject } from "./localStore";

const project: LocalProject = {
  name: "Jardim Planalto",
  location: "São Paulo",
  status: "Em execução",
  description: "Teste",
  fronts: [{ id: "drn-01", name: "Drenagem", code: "DRN-01", progress: 20, status: "Atenção", detail: "Teste", executed: 20, planned: 100, unit: "m", services: [] }],
  actions: [], events: [],
  weeklyTargets: [{ id: "target-1", frontId: "drn-01", weekEnd: "2026-08-27", planned: 20, note: "Meta de drenagem" }],
  materialReceipts: [],
  teamMembers: [],
  teamAssignments: [],
  machines: [],
  machineLogs: [],
  diaries: [{ id: "diary-1", date: "2026-08-25T12:00:00.000Z", frontId: "drn-01", service: "Drenagem", summary: "Produção", occurrence: "", weather: "Seco", workforce: 4, hours: 8, production: 15 }],
};

describe("planejamento físico semanal", () => {
  it("compara a meta com a produção da semana correspondente", () => {
    const [snapshot] = getWeeklyTargetSnapshots(project, new Date("2026-08-26T12:00:00.000Z"));

    expect(snapshot).toMatchObject({ weekStart: "2026-08-21", actual: 15, variance: -5, progress: 75, status: "Em andamento" });
  });

  it("marca como atrasada uma meta passada que não foi atingida", () => {
    const [snapshot] = getWeeklyTargetSnapshots(project, new Date("2026-08-28T12:00:00.000Z"));

    expect(snapshot.status).toBe("Atrasada");
  });
});
