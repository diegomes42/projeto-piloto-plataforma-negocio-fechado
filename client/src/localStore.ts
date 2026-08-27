import { useCallback, useEffect, useState } from "react";
import { applyProduction, sameLabel } from "@/localRules";

export type LocalPriority = "Crítica" | "Alta" | "Média" | "Baixa";
export type LocalEventStatus = "Aberto" | "Em tratamento" | "Resolvido";

export type LocalAction = {
  id: string;
  title: string;
  owner: string;
  due: string;
  priority: LocalPriority;
  done: boolean;
  eventId?: string;
  frontId?: string;
};

export type LocalEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: string;
  decision: string;
  priority: LocalPriority;
  status: LocalEventStatus;
  frontId?: string;
};

export type LocalDiary = {
  id: string;
  date: string;
  frontId: string;
  service: string;
  summary: string;
  occurrence: string;
  weather: string;
  workforce: number;
  hours: number;
  production: number;
  evidenceName?: string;
  evidenceDataUrl?: string;
  evidenceType?: string;
};

export type LocalFront = {
  id: string;
  name: string;
  code: string;
  progress: number;
  status: string;
  detail: string;
  executed: number;
  planned: number;
  unit: string;
  services: string[];
};

export type LocalProject = {
  name: string;
  location: string;
  status: string;
  description: string;
  fronts: LocalFront[];
  actions: LocalAction[];
  events: LocalEvent[];
  diaries: LocalDiary[];
};

const seed: LocalProject = {
  name: "Jardim Planalto",
  location: "São Paulo",
  status: "Em execução",
  description: "Loteamento em 2 etapas · cerca de 500 lotes",
  fronts: [
    {
      id: "drn-01",
      name: "Drenagem",
      code: "DRN-01",
      progress: 72,
      status: "Atenção",
      detail: "Solo saturado; assentamento bloqueado",
      executed: 310,
      planned: 430,
      unit: "m",
      services: ["Escavação", "Assentamento de tubulação", "Reaterro", "Bombeamento"],
    },
    {
      id: "via-01",
      name: "Limpeza e abertura das vias",
      code: "VIA-01",
      progress: 0,
      status: "Aguardando",
      detail: "Depende da patrol da Niemeyer",
      executed: 0,
      planned: 100,
      unit: "%",
      services: ["Limpeza", "Abertura de caixa", "Regularização"],
    },
    {
      id: "ter-02",
      name: "Terraplenagem e preparação viária",
      code: "TER-02",
      progress: 0,
      status: "Planejada",
      detail: "Topografia executiva a definir",
      executed: 0,
      planned: 100,
      unit: "%",
      services: ["Corte", "Aterro", "Compactação"],
    },
    {
      id: "pav-01",
      name: "Pavimentação",
      code: "PAV-01",
      progress: 0,
      status: "Não iniciada",
      detail: "CBUQ após preparação da infraestrutura",
      executed: 0,
      planned: 100,
      unit: "%",
      services: ["Base", "Imprimação", "CBUQ"],
    },
    {
      id: "agu-03",
      name: "Água",
      code: "AGU-03",
      progress: 0,
      status: "Planejada",
      detail: "Projeto completo e aprovado",
      executed: 0,
      planned: 100,
      unit: "%",
      services: ["Rede de água", "Ligações"],
    },
    {
      id: "ele-01",
      name: "Elétrica",
      code: "ELE-01",
      progress: 0,
      status: "Planejada",
      detail: "Projeto completo e aprovado",
      executed: 0,
      planned: 100,
      unit: "%",
      services: ["Infraestrutura elétrica", "Postes"],
    },
    {
      id: "amb-01",
      name: "Ambiental",
      code: "AMB-01",
      progress: 0,
      status: "Planejada",
      detail: "Projeto completo e aprovado",
      executed: 0,
      planned: 100,
      unit: "%",
      services: ["Controle ambiental", "Mitigação"],
    },
  ],
  events: [
    {
      id: "event-1",
      title: "Solo saturado no trecho de drenagem",
      description: "Presença de água abaixo da região de assentamento no trecho DRN-01.",
      date: "2026-08-27T12:00:00.000Z",
      impact: "Assentamento da tubulação bloqueado até o rebaixamento.",
      decision: "Executar bombeamento, estabilizar o fundo e liberar após inspeção.",
      priority: "Crítica",
      status: "Em tratamento",
      frontId: "drn-01",
    },
  ],
  actions: [
    "Executar dreno lateral abaixo da tubulação",
    "Mobilizar sistema de bombeamento",
    "Realizar bombeamento e rebaixamento",
    "Repor material com escavadeira",
    "Espalhar e regularizar com trator",
    "Aplicar camada drenante de rachinha",
    "Inspecionar e liberar o fundo",
    "Retomar assentamento da tubulação",
    "Registrar evidência fotográfica do trecho",
  ].map((title, index) => ({
    id: `act-${index + 1}`,
    title,
    owner: index === 0 ? "Equipe Remígio" : "Não informado",
    due: "A definir",
    priority: "Crítica" as LocalPriority,
    done: false,
    eventId: "event-1",
    frontId: "drn-01",
  })),
  diaries: [],
};

const KEY = "obra-piloto-local-v1";

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeProject(raw: Partial<LocalProject>): LocalProject {
  return {
    ...seed,
    ...raw,
    fronts: (raw.fronts ?? seed.fronts).map((front) => ({
      ...front,
      services: Array.isArray(front.services) && front.services.length > 0 ? front.services : seed.fronts.find((item) => item.id === front.id)?.services ?? [],
    })),
    actions: raw.actions ?? seed.actions,
    events: raw.events ?? seed.events,
    diaries: raw.diaries ?? [],
  };
}

function load(): LocalProject {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? normalizeProject(JSON.parse(raw) as Partial<LocalProject>) : seed;
  } catch {
    return seed;
  }
}

export function useLocalProject() {
  const [project, setProject] = useState<LocalProject>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(project));
  }, [project]);

  const update = useCallback((fn: (current: LocalProject) => LocalProject) => {
    setProject((current) => fn(current));
  }, []);

  const addDiary = useCallback(
    (entry: Omit<LocalDiary, "id">) =>
      update((current) => ({
        ...current,
        diaries: [{ ...entry, id: makeId("diary") }, ...current.diaries],
        fronts: current.fronts.map((front) => {
          if (front.id !== entry.frontId) return front;
          return { ...front, ...applyProduction(front, entry.production) };
        }),
      })),
    [update],
  );

  const addEvent = useCallback((event: Omit<LocalEvent, "id">) => update((current) => ({ ...current, events: [{ ...event, id: makeId("event") }, ...current.events] })), [update]);

  const setEventStatus = useCallback(
    (id: string, status: LocalEventStatus) => update((current) => ({ ...current, events: current.events.map((event) => (event.id === id ? { ...event, status } : event)) })),
    [update],
  );

  const addAction = useCallback((action: Omit<LocalAction, "id">) => update((current) => ({ ...current, actions: [{ ...action, id: makeId("action") }, ...current.actions] })), [update]);

  const toggleAction = useCallback((id: string) => update((current) => ({ ...current, actions: current.actions.map((action) => (action.id === id ? { ...action, done: !action.done } : action)) })), [update]);

  const addFront = useCallback((front: Omit<LocalFront, "id">) => update((current) => ({ ...current, fronts: [...current.fronts, { ...front, id: makeId("front") }] })), [update]);

  const addService = useCallback(
    (frontId: string, service: string) =>
      update((current) => ({
        ...current,
        fronts: current.fronts.map((front) => (front.id === frontId && !front.services.some((item) => sameLabel(item, service)) ? { ...front, services: [...front.services, service] } : front)),
      })),
    [update],
  );

  return { project, addDiary, addEvent, setEventStatus, addAction, toggleAction, addFront, addService };
}
