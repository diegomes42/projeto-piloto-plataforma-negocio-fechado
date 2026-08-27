export function productionProgress(executed: number, planned: number) {
  if (planned <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((executed / planned) * 100)));
}

export function productionBalance(executed: number, planned: number) {
  return Math.max(0, planned - executed);
}

export function actionUrgency(priority: "low" | "medium" | "high" | "critical", dueAt?: Date, now = new Date()) {
  if (dueAt && dueAt.getTime() < now.getTime()) return "overdue" as const;
  if (priority === "critical") return "critical" as const;
  if (priority === "high") return "high" as const;
  return "standard" as const;
}
