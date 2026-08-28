import { useMemo, useState, type FormEvent } from "react";
import { CircleHelp, Plus, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLocalProject, type LocalTeamAssignmentStatus } from "@/localStore";
import { getTeamDailyStatus } from "@/team";

const Kicker = ({ children }: { children: React.ReactNode }) => <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#71756f]">{children}</p>;
const today = () => new Date().toISOString().slice(0, 10);
const statusStyle: Record<string, string> = { Alocado: "bg-[#e5efd0] text-[#617a31]", Ocioso: "bg-[#f1dfc5] text-[#a56c1e]", Folga: "bg-[#dedfda] text-[#626760]", Outro: "bg-[#e4e8ed] text-[#52626f]", "Sem alocação": "bg-[#f4d7d3] text-[#b84f42]" };

export default function TeamPage() {
  const { project, addTeamMember, upsertTeamAssignment } = useLocalProject();
  const [date, setDate] = useState(today);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [memberId, setMemberId] = useState("");
  const [frontId, setFrontId] = useState("");
  const [status, setStatus] = useState<LocalTeamAssignmentStatus>("Alocado");
  const [note, setNote] = useState("");
  const dailyTeam = useMemo(() => getTeamDailyStatus(project, date), [project, date]);
  const allocated = dailyTeam.filter((item) => item.state === "Alocado").length;
  const unallocated = dailyTeam.filter((item) => item.state === "Sem alocação").length;
  const idle = dailyTeam.filter((item) => item.state === "Ocioso").length;

  const saveMember = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !role.trim()) { toast.error("Informe o nome e a função do colaborador."); return; }
    addTeamMember({ name: name.trim(), role: role.trim(), company: company.trim() || "Não informado", active: true });
    setName(""); setRole(""); setCompany(""); toast.success("Colaborador cadastrado neste navegador");
  };
  const saveAssignment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!memberId) { toast.error("Selecione um colaborador."); return; }
    if (status === "Alocado" && !frontId) { toast.error("Selecione a frente para um colaborador alocado."); return; }
    upsertTeamAssignment({ date, memberId, frontId: status === "Alocado" ? frontId : undefined, status, note: note.trim() });
    setNote(""); toast.success("Situação do colaborador atualizada");
  };

  return <div className="min-h-screen bg-[#ececea] px-4 py-8 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl"><header className="border-b border-black/10 pb-6"><Kicker>Controle de pessoas</Kicker><h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.08em]">Equipe</h1><p className="mt-3 max-w-2xl text-sm text-[#70756e]">Cadastre a equipe uma vez e defina apenas a situação de cada pessoa no dia. “Sem alocação” é um alerta para confirmar — não significa ociosidade automaticamente.</p></header><div className="mt-6 grid gap-3 sm:grid-cols-3"><Card className="rounded-none border-0 bg-[#f6f6f3] shadow-[5px_5px_0_#d0d1cb]"><CardContent className="p-5"><Kicker>Equipe ativa</Kicker><p className="mt-4 text-4xl font-black tracking-[-0.08em]">{String(dailyTeam.length).padStart(2, "0")}</p><p className="mt-1 text-xs text-[#70756e]">Colaboradores cadastrados</p></CardContent></Card><Card className="rounded-none border-0 bg-[#f6f6f3] shadow-[5px_5px_0_#d0d1cb]"><CardContent className="p-5"><Kicker>Alocados no dia</Kicker><p className="mt-4 text-4xl font-black tracking-[-0.08em] text-[#789249]">{String(allocated).padStart(2, "0")}</p><p className="mt-1 text-xs text-[#70756e]">Com frente definida</p></CardContent></Card><Card className="rounded-none border-0 bg-[#f6f6f3] shadow-[5px_5px_0_#d0d1cb]"><CardContent className="p-5"><Kicker>Requer confirmação</Kicker><p className="mt-4 text-4xl font-black tracking-[-0.08em] text-[#b84f42]">{String(unallocated).padStart(2, "0")}</p><p className="mt-1 text-xs text-[#70756e]">{idle} marcado(s) como ocioso(s)</p></CardContent></Card></div><div className="mt-8 grid gap-5 lg:grid-cols-2"><Card className="rounded-none border-0 bg-[#202321] text-white shadow-[5px_5px_0_#c7c9c2]"><CardContent className="p-6"><div className="flex items-center gap-2"><UserPlus className="h-4 w-4 text-[#b8d36a]" /><Kicker>Novo colaborador</Kicker></div><form onSubmit={saveMember} className="mt-5 space-y-3"><Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome completo *" className="border-white/15 bg-white/10 text-white placeholder:text-white/35" /><Input value={role} onChange={(event) => setRole(event.target.value)} placeholder="Função * Ex.: Operador de escavadeira" className="border-white/15 bg-white/10 text-white placeholder:text-white/35" /><Input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Empresa ou equipe (opcional)" className="border-white/15 bg-white/10 text-white placeholder:text-white/35" /><Button type="submit" className="h-12 w-full bg-[#b8d36a] text-[#202321] hover:bg-[#c9e27c]"><Plus className="mr-2 h-4 w-4" />Adicionar colaborador</Button></form></CardContent></Card><Card className="rounded-none border-0 bg-[#f6f6f3] shadow-[5px_5px_0_#d0d1cb]"><CardContent className="p-6"><Kicker>Situação do dia</Kicker><form onSubmit={saveAssignment} className="mt-5 space-y-3"><Input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="border-black/10 bg-white" /><select value={memberId} onChange={(event) => setMemberId(event.target.value)} className="h-10 w-full border border-black/10 bg-white px-3 text-sm"><option value="">Selecione o colaborador</option>{project.teamMembers.filter((member) => member.active).map((member) => <option key={member.id} value={member.id}>{member.name} · {member.role}</option>)}</select><div className="grid grid-cols-2 gap-3"><select value={status} onChange={(event) => setStatus(event.target.value as LocalTeamAssignmentStatus)} className="h-10 border border-black/10 bg-white px-3 text-sm"><option>Alocado</option><option>Ocioso</option><option>Folga</option><option>Outro</option></select><select value={frontId} onChange={(event) => setFrontId(event.target.value)} disabled={status !== "Alocado"} className="h-10 border border-black/10 bg-white px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"><option value="">{status === "Alocado" ? "Frente *" : "Sem frente"}</option>{project.fronts.map((front) => <option key={front.id} value={front.id}>{front.code} · {front.name}</option>)}</select></div><Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Observação opcional" className="min-h-20 border-black/10 bg-white" /><Button type="submit" disabled={!project.teamMembers.length} className="h-12 w-full bg-[#202321] text-white disabled:opacity-40">Salvar situação</Button></form></CardContent></Card></div><section className="mt-8"><div className="mb-3 flex flex-wrap items-end justify-between gap-3"><div><Kicker>Quadro do dia</Kicker><h2 className="mt-1 text-xl font-black uppercase tracking-[-0.04em]">Onde está cada pessoa</h2></div><Input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="h-10 w-40 border-black/10 bg-white" /></div><div className="space-y-3">{dailyTeam.map(({ member, assignment, state }) => <Card key={member.id} className="rounded-none border-0 bg-[#f6f6f3] shadow-[4px_4px_0_#d0d1cb]"><CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div><Kicker>{member.role} · {member.company}</Kicker><h3 className="mt-1 text-base font-black uppercase">{member.name}</h3>{assignment?.note && <p className="mt-2 text-xs text-[#70756e]">{assignment.note}</p>}</div><div className="flex flex-wrap items-center gap-2"><span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${statusStyle[state]}`}>{state}</span>{assignment?.frontId && <span className="text-xs font-semibold text-[#5b6059]">{project.fronts.find((front) => front.id === assignment.frontId)?.code ?? "Frente não localizada"}</span>}</div></CardContent></Card>)}{dailyTeam.length === 0 && <Card className="rounded-none border-0 border-l-4 border-l-[#8da65a] bg-[#f6f6f3] shadow-[5px_5px_0_#d0d1cb]"><CardContent className="flex gap-4 p-6"><span className="grid h-11 w-11 shrink-0 place-items-center bg-[#e5efd0] text-[#789249]"><CircleHelp className="h-5 w-5" /></span><div><Kicker>Comece simples</Kicker><p className="mt-1 text-sm leading-6 text-[#70756e]">Cadastre os colaboradores que você acompanha e informe a situação de cada um apenas quando necessário.</p></div></CardContent></Card>}</div></section></div></div>;
}
