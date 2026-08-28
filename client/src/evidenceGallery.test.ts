import { describe, expect, it } from "vitest";
import { collectEvidence, filterEvidence } from "./evidenceGallery";
import type { LocalProject } from "./localStore";

const project: LocalProject = {
  name: "Jardim Planalto", location: "São Paulo", status: "Em execução", description: "Teste", fronts: [], actions: [], events: [], weeklyTargets: [], materialReceipts: [], teamMembers: [], teamAssignments: [], machines: [], machineLogs: [],
  diaries: [
    { id: "diary-photo", date: "2026-08-27T12:00:00.000Z", frontId: "drn-01", service: "Drenagem", summary: "Com foto", occurrence: "", weather: "Seco", workforce: 3, hours: 8, production: 5, evidenceName: "dreno.jpg", evidenceDataUrl: "data:image/jpeg;base64,abc", evidenceType: "image/jpeg" },
    { id: "diary-file", date: "2026-08-26T12:00:00.000Z", frontId: "via-01", service: "Limpeza", summary: "Com evidência", occurrence: "", weather: "Seco", workforce: 2, hours: 8, production: 2, evidenceName: "via.jpg" },
    { id: "diary-none", date: "2026-08-25T12:00:00.000Z", frontId: "drn-01", service: "Drenagem", summary: "Sem anexo", occurrence: "", weather: "Seco", workforce: 2, hours: 8, production: 2 },
  ],
};

describe("galeria de evidências", () => {
  it("coleta apenas os diários com evidência e ordena os mais recentes primeiro", () => {
    expect(collectEvidence(project).map((item) => item.id)).toEqual(["diary-photo", "diary-file"]);
  });

  it("filtra evidências por frente e serviço", () => {
    const records = collectEvidence(project);
    expect(filterEvidence(records, "drn-01", "Todos")).toHaveLength(1);
    expect(filterEvidence(records, "Todos", "Limpeza")).toHaveLength(1);
  });
});
