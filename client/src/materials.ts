import type { LocalMaterialReceipt } from "@/localStore";

export type MaterialSummary = {
  label: string;
  quantity: number;
  unit: string;
  receipts: number;
};

export function summarizeMaterialReceipts(receipts: LocalMaterialReceipt[]): MaterialSummary[] {
  const grouped = new Map<string, MaterialSummary>();
  receipts.forEach((receipt) => {
    const label = `${receipt.item}${receipt.specification ? ` · ${receipt.specification}` : ""}`;
    const key = `${label.toLocaleLowerCase("pt-BR")}::${receipt.unit.toLocaleLowerCase("pt-BR")}`;
    const current = grouped.get(key) ?? { label, quantity: 0, unit: receipt.unit, receipts: 0 };
    grouped.set(key, { ...current, quantity: current.quantity + receipt.quantity, receipts: current.receipts + 1 });
  });
  return Array.from(grouped.values()).sort((a, b) => b.quantity - a.quantity || a.label.localeCompare(b.label, "pt-BR"));
}
