import { describe, expect, it } from "vitest";
import { applyProduction, productionProgress, sameLabel } from "./localRules";

describe("regras locais do piloto", () => {
  it("calcula o avanço da frente com limite de 100%", () => {
    expect(productionProgress(310, 430)).toBe(72);
    expect(productionProgress(322.5, 430)).toBe(75);
    expect(productionProgress(120, 100)).toBe(100);
    expect(productionProgress(20, 0)).toBe(0);
  });

  it("aplica produção diária e muda o status da frente", () => {
    expect(applyProduction({ executed: 310, planned: 430, progress: 72, status: "Atenção" }, 12.5)).toMatchObject({ executed: 322.5, progress: 75, status: "Em execução" });
    expect(applyProduction({ executed: 90, planned: 100, progress: 90, status: "Em execução" }, 20).status).toBe("Concluída");
    expect(applyProduction({ executed: 10, planned: 100, progress: 10, status: "Aguardando" }, 0).status).toBe("Aguardando");
  });

  it("compara serviços ignorando espaços e maiúsculas", () => {
    expect(sameLabel(" Assentamento ", "assentamento")).toBe(true);
    expect(sameLabel("Escavação", "Reaterro")).toBe(false);
  });
});
