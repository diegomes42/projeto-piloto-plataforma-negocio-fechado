import { useCallback, useEffect, useState } from "react";

export type LocalAction = { id: string; title: string; owner: string; due: string; priority: "Crítica" | "Alta" | "Média"; done: boolean };
export type LocalDiary = { id: string; date: string; summary: string; occurrence: string; weather: string; workforce: number; hours: number; production: number; evidenceName?: string };
export type LocalFront = { id: string; name: string; code: string; progress: number; status: string; detail: string; executed: number; planned: number; unit: string };
export type LocalProject = { name: string; location: string; status: string; description: string; fronts: LocalFront[]; actions: LocalAction[]; diaries: LocalDiary[] };

const seed: LocalProject = {
  name: "Jardim Planalto",
  location: "São Paulo",
  status: "Em execução",
  description: "Loteamento em 2 etapas · cerca de 500 lotes",
  fronts: [
    { id: "drn-01", name: "Drenagem", code: "DRN-01", progress: 72, status: "Atenção", detail: "Solo saturado; assentamento bloqueado", executed: 310, planned: 430, unit: "m" },
    { id: "via-01", name: "Limpeza e abertura das vias", code: "VIA-01", progress: 0, status: "Aguardando", detail: "Depende da patrol da Niemeyer", executed: 0, planned: 100, unit: "%" },
    { id: "ter-02", name: "Terraplenagem e preparação viária", code: "TER-02", progress: 0, status: "Planejada", detail: "Topografia executiva a definir", executed: 0, planned: 100, unit: "%" },
    { id: "pav-01", name: "Pavimentação", code: "PAV-01", progress: 0, status: "Não iniciada", detail: "CBUQ após preparação da infraestrutura", executed: 0, planned: 100, unit: "%" },
    { id: "agu-03", name: "Água", code: "AGU-03", progress: 0, status: "Planejada", detail: "Projeto completo e aprovado", executed: 0, planned: 100, unit: "%" },
    { id: "ele-01", name: "Elétrica", code: "ELE-01", progress: 0, status: "Planejada", detail: "Projeto completo e aprovado", executed: 0, planned: 100, unit: "%" },
    { id: "amb-01", name: "Ambiental", code: "AMB-01", progress: 0, status: "Planejada", detail: "Projeto completo e aprovado", executed: 0, planned: 100, unit: "%" },
  ],
  actions: [
    "Executar dreno lateral abaixo da tubulação", "Mobilizar sistema de bombeamento", "Realizar bombeamento e rebaixamento", "Repor material com escavadeira", "Espalhar e regularizar com trator", "Aplicar camada drenante de rachinha", "Inspecionar e liberar o fundo", "Retomar assentamento da tubulação", "Registrar evidência fotográfica do trecho"
  ].map((title, index) => ({ id: `act-${index + 1}`, title, owner: index === 0 ? "Equipe Remígio" : "Não informado", due: "A definir", priority: "Crítica", done: false })),
  diaries: [],
};

const KEY = "obra-piloto-local-v1";
function load(): LocalProject { try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : seed; } catch { return seed; } }

export function useLocalProject() {
  const [project, setProject] = useState<LocalProject>(load);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(project)); }, [project]);
  const update = useCallback((fn: (current: LocalProject) => LocalProject) => setProject((current) => fn(current)), []);
  const addDiary = useCallback((entry: Omit<LocalDiary, "id">) => update((current) => ({ ...current, diaries: [{ ...entry, id: `diary-${Date.now()}` }, ...current.diaries], fronts: current.fronts.map((front, index) => index === 0 ? { ...front, executed: front.executed + entry.production, progress: Math.min(100, Math.round(((front.executed + entry.production) / Math.max(front.planned, 1)) * 100)), status: "Em execução" } : front) })), [update]);
  const toggleAction = useCallback((id: string) => update((current) => ({ ...current, actions: current.actions.map((action) => action.id === id ? { ...action, done: !action.done } : action) })), [update]);
  const addFront = useCallback((front: Omit<LocalFront, "id">) => update((current) => ({ ...current, fronts: [...current.fronts, { ...front, id: `front-${Date.now()}` }] })), [update]);
  return { project, addDiary, toggleAction, addFront };
}
