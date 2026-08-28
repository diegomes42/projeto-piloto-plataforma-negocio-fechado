import { describe, expect, it } from "vitest";
import { summarizeMaterialReceipts } from "./materials";

describe("recebimentos de materiais", () => {
  it("consolida itens com a mesma especificação e unidade", () => {
    const summary = summarizeMaterialReceipts([
      { id: "1", date: "2026-08-28", item: "Manilha", specification: "Ø 1000 mm", quantity: 18, unit: "un", supplier: "Fornecedor", frontId: "drn-01", location: "Trecho DRN-01", reference: "" },
      { id: "2", date: "2026-08-28", item: "manilha", specification: "Ø 1000 mm", quantity: 2, unit: "un", supplier: "Fornecedor", frontId: "drn-01", location: "Trecho DRN-01", reference: "" },
    ]);

    expect(summary).toEqual([{ label: "Manilha · Ø 1000 mm", quantity: 20, unit: "un", receipts: 2 }]);
  });
});
