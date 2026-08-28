import { describe, expect, it } from "vitest";
import { getDocumentedMaterialCost, summarizeMaterialReceipts } from "./materials";

describe("recebimentos de materiais", () => {
  it("consolida itens com a mesma especificação e unidade, mesmo sem custo informado", () => {
    const summary = summarizeMaterialReceipts([
      { id: "1", date: "2026-08-28", item: "Manilha", specification: "Ø 1000 mm", quantity: 18, unit: "un", supplier: "Fornecedor", frontId: "drn-01", location: "Trecho DRN-01", reference: "" },
      { id: "2", date: "2026-08-28", item: "manilha", specification: "Ø 1000 mm", quantity: 2, unit: "un", supplier: "Fornecedor", frontId: "drn-01", location: "Trecho DRN-01", reference: "" },
    ]);

    expect(summary).toEqual([{ label: "Manilha · Ø 1000 mm", quantity: 20, unit: "un", receipts: 2, pricedReceipts: 0, pricedQuantity: 0, totalCost: 0, averageUnitCost: undefined }]);
  });

  it("calcula custo total e custo médio ponderado somente com lançamentos precificados", () => {
    const receipts = [
      { id: "1", date: "2026-08-28", item: "Manilha", specification: "Ø 1000 mm", quantity: 18, unit: "un", supplier: "A", location: "DRN-01", reference: "", unitCost: 1250 },
      { id: "2", date: "2026-08-29", item: "Manilha", specification: "Ø 1000 mm", quantity: 2, unit: "un", supplier: "B", location: "DRN-01", reference: "", unitCost: 1300 },
      { id: "3", date: "2026-08-30", item: "Manilha", specification: "Ø 1000 mm", quantity: 3, unit: "un", supplier: "A", location: "DRN-01", reference: "" },
    ];
    const [summary] = summarizeMaterialReceipts(receipts);

    expect(summary.totalCost).toBe(25100);
    expect(summary.pricedQuantity).toBe(20);
    expect(summary.averageUnitCost).toBe(1255);
    expect(getDocumentedMaterialCost(receipts)).toBe(25100);
  });
});
