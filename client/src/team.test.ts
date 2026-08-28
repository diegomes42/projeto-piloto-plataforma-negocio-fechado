import { describe, expect, it } from "vitest";
import { getTeamDailyStatus } from "./team";
import type { LocalProject } from "./localStore";

const project: LocalProject = {
  name: "Jardim Planalto", location: "São Paulo", status: "Em execução", description: "Teste", fronts: [], actions: [], events: [], diaries: [], weeklyTargets: [], materialReceipts: [],
  teamMembers: [
    { id: "worker-1", name: "Ana", role: "Operadora", company: "Remígio", active: true },
    { id: "worker-2", name: "Bruno", role: "Ajudante", company: "Remígio", active: true },
  ],
  teamAssignments: [{ id: "assignment-1", date: "2026-08-28", memberId: "worker-1", frontId: "drn-01", status: "Alocado", note: "Drenagem" }],
};

describe("alocação diária da equipe", () => {
  it("indica colaboradores sem alocação sem classificá-los automaticamente como ociosos", () => {
    expect(getTeamDailyStatus(project, "2026-08-28").map((item) => item.state)).toEqual(["Alocado", "Sem alocação"]);
  });
});
