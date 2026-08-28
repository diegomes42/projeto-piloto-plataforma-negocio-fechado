import { describe, expect, it } from "vitest";
import { parseLocalBackup, serializeLocalProject, type LocalProject } from "./localStore";

const project: LocalProject = {
  name: "Jardim Planalto",
  location: "São Paulo",
  status: "Em execução",
  description: "Projeto de teste",
  fronts: [],
  actions: [],
  events: [],
  weeklyTargets: [],
  materialReceipts: [],
  teamMembers: [],
  teamAssignments: [],
  machines: [],
  machineLogs: [],
  diaries: [
    {
      id: "diary-1",
      date: "2026-08-27T12:00:00.000Z",
      frontId: "drn-01",
      service: "Drenagem",
      summary: "Registro com evidência",
      occurrence: "",
      weather: "Nublado",
      workforce: 4,
      hours: 8,
      production: 10,
      evidenceName: "trecho.jpg",
      evidenceDataUrl: "data:image/jpeg;base64,abc",
      evidenceType: "image/jpeg",
    },
  ],
};

describe("backup local do piloto", () => {
  it("serializa e restaura registros com evidência", () => {
    const restored = parseLocalBackup(serializeLocalProject(project));

    expect(restored.name).toBe("Jardim Planalto");
    expect(restored.diaries[0]).toMatchObject({
      evidenceName: "trecho.jpg",
      evidenceDataUrl: "data:image/jpeg;base64,abc",
      evidenceType: "image/jpeg",
    });
    expect(restored.actions.length).toBeGreaterThan(0);
  });

  it("rejeita backup sem as coleções operacionais obrigatórias", () => {
    expect(() => parseLocalBackup(JSON.stringify({ name: "incompleto" }))).toThrow("Backup incompleto");
  });

  it("rejeita conteúdo que não seja JSON de objeto", () => {
    expect(() => parseLocalBackup("não é json")).toThrow();
    expect(() => parseLocalBackup(JSON.stringify([]))).toThrow("Backup incompleto");
  });

  it("corrige a localização legada do Jardim Planalto para Remígio/PB", () => {
    const restored = parseLocalBackup(serializeLocalProject(project));

    expect(restored.location).toBe("Remígio/PB");
  });
});
