import { describe, expect, it } from "vitest";
import { getOperationalAttention } from "./operationalInsights";
import type { LocalProject } from "./localStore";

const baseProject: LocalProject = {
  name: "Obra de teste",
  location: "São Paulo",
  status: "Em execução",
  description: "Teste",
  fronts: [{ id: "front-1", name: "Drenagem", code: "DRN-01", progress: 45, status: "Atenção", detail: "Em execução", executed: 45, planned: 100, unit: "m", services: [] }],
  actions: [
    { id: "action-1", title: "Ação vencida", owner: "Equipe", due: "2026-08-26", priority: "Alta", done: false },
    { id: "action-2", title: "Ação próxima", owner: "Equipe", due: "2026-09-01", priority: "Média", done: false },
  ],
  events: [{ id: "event-1", title: "Evento crítico", description: "Teste", date: "2026-08-20T12:00:00.000Z", impact: "Impacto", decision: "Decisão", priority: "Crítica", status: "Aberto" }],
  weeklyTargets: [],
  materialReceipts: [],
  teamMembers: [],
  teamAssignments: [],
  diaries: [],
};

describe("centro de atenção operacional", () => {
  it("identifica vencimentos, prazos próximos, eventos críticos e frentes sem atualização", () => {
    const items = getOperationalAttention(baseProject, new Date("2026-08-27T12:00:00.000Z"));

    expect(items.map((item) => item.id)).toEqual(["overdue-actions", "critical-events", "upcoming-actions", "stale-fronts"]);
    expect(items.map((item) => item.count)).toEqual([1, 1, 1, 1]);
  });

  it("não sinaliza frente atualizada nos últimos sete dias", () => {
    const items = getOperationalAttention({ ...baseProject, diaries: [{ id: "diary-1", date: "2026-08-26T12:00:00.000Z", frontId: "front-1", service: "Drenagem", summary: "Atualização", occurrence: "", weather: "Seco", workforce: 3, hours: 8, production: 5 }] }, new Date("2026-08-27T12:00:00.000Z"));

    expect(items.some((item) => item.id === "stale-fronts")).toBe(false);
  });
});
