import { describe, expect, it } from "vitest";
import { buildWeeklyReport } from "./weeklyReport";
import type { LocalProject } from "./localStore";

const project: LocalProject = {
  name: "Jardim Planalto",
  location: "São Paulo",
  status: "Em execução",
  description: "Teste",
  fronts: [{ id: "drn-01", name: "Drenagem", code: "DRN-01", progress: 30, status: "Atenção", detail: "Teste", executed: 30, planned: 100, unit: "m", services: [] }],
  actions: [
    { id: "action-in", title: "Ação da semana", owner: "Equipe", due: "2026-08-27", priority: "Alta", done: false },
    { id: "action-out", title: "Ação futura", owner: "Equipe", due: "2026-09-10", priority: "Alta", done: false },
  ],
  events: [{ id: "event-in", title: "Evento semanal", description: "Teste", date: "2026-08-25T12:00:00.000Z", impact: "Impacto", decision: "Decisão", priority: "Média", status: "Aberto" }],
  diaries: [
    { id: "diary-in", date: "2026-08-26T12:00:00.000Z", frontId: "drn-01", service: "Drenagem", summary: "Produção", occurrence: "Solo úmido", weather: "Nublado", workforce: 5, hours: 8, production: 12 },
    { id: "diary-out", date: "2026-08-19T12:00:00.000Z", frontId: "drn-01", service: "Drenagem", summary: "Anterior", occurrence: "", weather: "Seco", workforce: 2, hours: 8, production: 3 },
  ],
};

describe("relatório semanal", () => {
  it("resume apenas os registros da janela de sete dias", () => {
    const report = buildWeeklyReport(project, "2026-08-27");

    expect(report.startDate).toBe("2026-08-21");
    expect(report.diaries).toHaveLength(1);
    expect(report.totalProduction).toBe(12);
    expect(report.totalHours).toBe(8);
    expect(report.averageWorkforce).toBe(5);
    expect(report.occurrences).toHaveLength(1);
    expect(report.events).toHaveLength(1);
    expect(report.actionsDue).toHaveLength(1);
  });

  it("consolida produção e horas por frente", () => {
    const report = buildWeeklyReport(project, "2026-08-27");

    expect(report.frontProduction).toEqual([expect.objectContaining({ production: 12, hours: 8, diaries: 1 })]);
  });
});
