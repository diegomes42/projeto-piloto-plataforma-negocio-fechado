import { useState } from "react";
import { useLocalProject } from "@/localStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Plus } from "lucide-react";
import { toast } from "sonner";

const Kicker = ({ children }: { children: React.ReactNode }) => <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#71756f]">{children}</p>;

export default function SetupPage() {
  const { project, addFront, addService } = useLocalProject();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [detail, setDetail] = useState("");
  const [planned, setPlanned] = useState("100");
  const [unit, setUnit] = useState("%");
  const [initialService, setInitialService] = useState("");
  const [serviceDrafts, setServiceDrafts] = useState<Record<string, string>>({});

  const save = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) { toast.error("Informe o nome da frente"); return; }
    const plannedValue = Math.max(1, Number(planned) || 100);
    addFront({ name: name.trim(), code: code.trim() || "SEM CÓDIGO", detail: detail.trim() || "Estado ainda não informado", progress: 0, status: "Planejada", executed: 0, planned: plannedValue, unit: unit.trim() || "%", services: initialService.trim() ? [initialService.trim()] : [] });
    setName(""); setCode(""); setDetail(""); setPlanned("100"); setUnit("%"); setInitialService(""); toast.success("Frente cadastrada localmente");
  };

  const saveService = (frontId: string) => {
    const value = serviceDrafts[frontId]?.trim();
    if (!value) return;
    addService(frontId, value);
    setServiceDrafts((current) => ({ ...current, [frontId]: "" }));
    toast.success("Serviço adicionado à frente");
  };

  return <div className="min-h-screen bg-[#ececea] p-5 sm:p-8 lg:p-12"><div className="mx-auto max-w-[1100px]"><Kicker>Configuração enxuta · uso próprio</Kicker><h1 className="mt-2 text-4xl font-black uppercase tracking-[-0.07em] sm:text-6xl">Cadastro rápido</h1><p className="mt-3 max-w-xl text-sm text-[#70756e]">Inclua novas frentes e serviços da {project.name} sem importar arquivos ou configurar servidor. Tudo fica salvo neste navegador.</p><div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><Card className="rounded-none border-0 bg-[#202321] text-white shadow-[5px_5px_0_#c7c9c2]"><CardHeader><Kicker>Nova frente</Kicker><CardTitle className="mt-2 text-2xl font-black uppercase">Adicionar</CardTitle></CardHeader><CardContent><form onSubmit={save} className="space-y-3"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da frente" className="border-white/15 bg-white/10 text-white placeholder:text-white/35" /><div className="grid gap-3 sm:grid-cols-2"><Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código, ex.: TER-03" className="border-white/15 bg-white/10 text-white placeholder:text-white/35" /><Input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unidade, ex.: m" className="border-white/15 bg-white/10 text-white placeholder:text-white/35" /></div><div className="grid gap-3 sm:grid-cols-2"><Input type="number" min="1" step="0.01" value={planned} onChange={(e) => setPlanned(e.target.value)} placeholder="Planejado" className="border-white/15 bg-white/10 text-white placeholder:text-white/35" /><Input value={initialService} onChange={(e) => setInitialService(e.target.value)} placeholder="Primeiro serviço (opcional)" className="border-white/15 bg-white/10 text-white placeholder:text-white/35" /></div><Textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Estado atual ou dependência" className="border-white/15 bg-white/10 text-white placeholder:text-white/35" /><Button type="submit" disabled={!name.trim()} className="w-full bg-[#b8d36a] text-[#202321] hover:bg-[#c9e27c]"><Plus className="mr-2 h-4 w-4" /> Salvar frente</Button></form></CardContent></Card><Card className="rounded-none border-0 bg-[#f6f6f3] shadow-[5px_5px_0_#d0d1cb]"><CardContent className="p-6"><div className="flex items-center gap-3"><Building2 className="h-5 w-5 text-[#8da65a]" /><div><Kicker>Obra ativa</Kicker><p className="mt-1 text-xl font-black uppercase">{project.name}</p></div></div><div className="mt-6 space-y-4">{project.fronts.map((front) => <div className="border-b border-black/10 pb-4" key={front.id}><div className="flex items-center justify-between gap-3 text-sm"><span className="font-semibold">{front.name}</span><span className="font-mono text-[10px] text-[#7d827a]">{front.code} · {front.progress}%</span></div><div className="mt-2 flex flex-wrap gap-1.5">{front.services.length ? front.services.map((item) => <span key={item} className="bg-[#e8e9e4] px-2 py-1 text-[10px]">{item}</span>) : <span className="text-[10px] text-[#858a82]">Sem serviços</span>}</div><div className="mt-2 flex gap-2"><Input value={serviceDrafts[front.id] ?? ""} onChange={(e) => setServiceDrafts((current) => ({ ...current, [front.id]: e.target.value }))} placeholder="Adicionar serviço" className="h-9 border-black/10 bg-white text-xs" /><Button type="button" size="sm" onClick={() => saveService(front.id)} className="h-9 bg-[#202321] text-white"><Plus className="h-3.5 w-3.5" /></Button></div></div>)}</div></CardContent></Card></div></div></div>;
}
