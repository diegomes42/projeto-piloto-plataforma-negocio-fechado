import type { LocalDiary, LocalProject } from "@/localStore";

export type EvidenceRecord = Pick<LocalDiary, "id" | "date" | "frontId" | "service" | "evidenceName" | "evidenceDataUrl" | "evidenceType">;

export function collectEvidence(project: LocalProject): EvidenceRecord[] {
  return project.diaries.filter((diary) => Boolean(diary.evidenceName || diary.evidenceDataUrl)).map(({ id, date, frontId, service, evidenceName, evidenceDataUrl, evidenceType }) => ({ id, date, frontId, service, evidenceName, evidenceDataUrl, evidenceType })).sort((a, b) => b.date.localeCompare(a.date));
}

export function filterEvidence(records: EvidenceRecord[], frontId: string, service: string) {
  return records.filter((record) => (frontId === "Todos" || record.frontId === frontId) && (service === "Todos" || record.service === service));
}
