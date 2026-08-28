import type { LocalProject, LocalTeamAssignment, LocalTeamMember } from "@/localStore";

export type TeamDailyStatus = {
  member: LocalTeamMember;
  assignment?: LocalTeamAssignment;
  state: "Alocado" | "Ocioso" | "Folga" | "Outro" | "Sem alocação";
};

export function getTeamDailyStatus(project: LocalProject, date: string): TeamDailyStatus[] {
  const assignmentsByMember = new Map(project.teamAssignments.filter((assignment) => assignment.date === date).map((assignment) => [assignment.memberId, assignment]));
  return project.teamMembers.filter((member) => member.active).map((member) => {
    const assignment = assignmentsByMember.get(member.id);
    const state: TeamDailyStatus["state"] = assignment?.status ?? "Sem alocação";
    return { member, assignment, state };
  }).sort((a, b) => a.member.name.localeCompare(b.member.name, "pt-BR"));
}
