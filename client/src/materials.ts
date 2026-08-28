import type { LocalMaterialReceipt } from "@/localStore";

export type MaterialSummary = {
  label: string;
  quantity: number;
  unit: string;
  receipts: number;
  pricedReceipts: number;
  pricedQuantity: number;
  totalCost: number;
  averageUnitCost?: number;
};

export function summarizeMaterialReceipts(receipts: LocalMaterialReceipt[]): MaterialSummary[] {
  const grouped = new Map<string, MaterialSummary>();
  receipts.forEach((receipt) => {
    const label = `${receipt.item}${receipt.specification ? ` · ${receipt.specification}` : ""}`;
    const key = `${label.toLocaleLowerCase("pt-BR")}::${receipt.unit.toLocaleLowerCase("pt-BR")}`;
    const current = grouped.get(key) ?? { label, quantity: 0, unit: receipt.unit, receipts: 0, pricedReceipts: 0, pricedQuantity: 0, totalCost: 0 };
    const hasCost = typeof receipt.unitCost === "number" && Number.isFinite(receipt.unitCost) && receipt.unitCost > 0;
    const pricedQuantity = hasCost ? receipt.quantity : 0;
    const totalCost = hasCost ? receipt.quantity * receipt.unitCost! : 0;
    const next = {
      ...current,
      quantity: current.quantity + receipt.quantity,
      receipts: current.receipts + 1,
      pricedReceipts: current.pricedReceipts + (hasCost ? 1 : 0),
      pricedQuantity: current.pricedQuantity + pricedQuantity,
      totalCost: current.totalCost + totalCost,
    };
    grouped.set(key, { ...next, averageUnitCost: next.pricedQuantity > 0 ? next.totalCost / next.pricedQuantity : undefined });
  });
  return Array.from(grouped.values()).sort((a, b) => b.totalCost - a.totalCost || b.quantity - a.quantity || a.label.localeCompare(b.label, "pt-BR"));
}

export function getDocumentedMaterialCost(receipts: LocalMaterialReceipt[]) {
  return receipts.reduce((total, receipt) => total + (typeof receipt.unitCost === "number" && receipt.unitCost > 0 ? receipt.unitCost * receipt.quantity : 0), 0);
}
