import type { LocalFront, LocalProject, LocalWeeklyTarget } from "@/localStore";

export type WeeklyTargetSnapshot = {
  target: LocalWeeklyTarget;
  front: LocalFront | undefined;
  actual: number;
  variance: number;
  progress: number;
  status: "Meta atingida" | "Em andamento" | "Atrasada";
  weekStart: string;
};

function shiftUtcDay(day: string, days: number) {
  const date = new Date(`${day}T12:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function diaryInWeek(date: string, startDate: string, endDate: string) {
  const day = date.slice(0, 10);
  return day >= startDate && day <= endDate;
}

export function getWeeklyTargetSnapshots(project: LocalProject, referenceDate = new Date()): WeeklyTargetSnapshot[] {
  const today = referenceDate.toISOString().slice(0, 10);
  return project.weeklyTargets.map((target) => {
    const weekStart = shiftUtcDay(target.weekEnd, -6);
    const actual = project.diaries.filter((diary) => diary.frontId === target.frontId && diaryInWeek(diary.date, weekStart, target.weekEnd)).reduce((sum, diary) => sum + diary.production, 0);
    const progress = target.planned > 0 ? Math.min(100, Math.round((actual / target.planned) * 100)) : 0;
    const status: WeeklyTargetSnapshot["status"] = actual >= target.planned ? "Meta atingida" : target.weekEnd < today ? "Atrasada" : "Em andamento";
    return { target, front: project.fronts.find((front) => front.id === target.frontId), actual, variance: actual - target.planned, progress, status, weekStart };
  }).sort((a, b) => b.target.weekEnd.localeCompare(a.target.weekEnd));
}
