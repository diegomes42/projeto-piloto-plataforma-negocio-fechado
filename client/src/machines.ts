import type { LocalMachine, LocalMachineLog, LocalProject } from "@/localStore";

export type MachineDailyStatus = {
  machine: LocalMachine;
  log?: LocalMachineLog;
  condition: LocalMachineLog["condition"] | "Sem lançamento";
  hours: number;
};

export function calculateMachineHours(start?: number, end?: number) {
  if (start === undefined || end === undefined || end < start) return 0;
  return end - start;
}

export function getMachineDailyStatus(project: LocalProject, date: string): MachineDailyStatus[] {
  const logsByMachine = new Map(project.machineLogs.filter((log) => log.date === date).map((log) => [log.machineId, log]));
  return project.machines.filter((machine) => machine.active).map((machine) => {
    const log = logsByMachine.get(machine.id);
    const condition: MachineDailyStatus["condition"] = log?.condition ?? "Sem lançamento";
    return { machine, log, condition, hours: calculateMachineHours(log?.hourmeterStart, log?.hourmeterEnd) };
  }).sort((a, b) => a.machine.name.localeCompare(b.machine.name, "pt-BR"));
}
