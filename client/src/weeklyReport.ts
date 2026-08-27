import type { LocalAction, LocalDiary, LocalEvent, LocalFront, LocalProject } from "@/localStore";

export type WeeklyReport = {
  startDate: string;
  endDate: string;
  diaries: LocalDiary[];
  events: LocalEvent[];
  actionsDue: LocalAction[];
  occurrences: LocalDiary[];
  totalProduction: number;
  totalHours: number;
  averageWorkforce: number;
  frontProduction: Array<{ front: LocalFront; production: number; hours: number; diaries: number }>;
};

function dayOf(value: string) {
  return value.slice(0, 10);
}

function shiftUtcDay(day: string, days: number) {
  const date = new Date(`${day}T12:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function inRange(value: string, startDate: string, endDate: string) {
  const day = dayOf(value);
  return day >= startDate && day <= endDate;
}

export function buildWeeklyReport(project: LocalProject, endDate: string): WeeklyReport {
  const end = /^\d{4}-\d{2}-\d{2}$/.test(endDate) ? endDate : new Date().toISOString().slice(0, 10);
  const startDate = shiftUtcDay(end, -6);
  const diaries = project.diaries.filter((diary) => inRange(diary.date, startDate, end)).sort((a, b) => b.date.localeCompare(a.date));
  const events = project.events.filter((event) => inRange(event.date, startDate, end)).sort((a, b) => b.date.localeCompare(a.date));
  const actionsDue = project.actions.filter((action) => !action.done && action.due !== "A definir" && action.due >= startDate && action.due <= end).sort((a, b) => a.due.localeCompare(b.due));
  const totalProduction = diaries.reduce((sum, diary) => sum + diary.production, 0);
  const totalHours = diaries.reduce((sum, diary) => sum + diary.hours, 0);
  const workforceRecords = diaries.filter((diary) => diary.workforce > 0);
  const averageWorkforce = workforceRecords.length ? workforceRecords.reduce((sum, diary) => sum + diary.workforce, 0) / workforceRecords.length : 0;

  return {
    startDate,
    endDate: end,
    diaries,
    events,
    actionsDue,
    occurrences: diaries.filter((diary) => diary.occurrence.trim().length > 0),
    totalProduction,
    totalHours,
    averageWorkforce,
    frontProduction: project.fronts.map((front) => {
      const frontDiaries = diaries.filter((diary) => diary.frontId === front.id);
      return { front, production: frontDiaries.reduce((sum, diary) => sum + diary.production, 0), hours: frontDiaries.reduce((sum, diary) => sum + diary.hours, 0), diaries: frontDiaries.length };
    }).filter((item) => item.diaries > 0),
  };
}
