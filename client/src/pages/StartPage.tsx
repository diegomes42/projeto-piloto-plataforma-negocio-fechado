import { useEffect, useState, type FormEvent } from "react";
import { Building2, Cloud, Loader2, LogIn, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCurrentUser, signInWithPassword, signUpWithPassword } from "@/syncService";
import { supabase } from "@/supabaseClient";
import { useLocalProject } from "@/localStore";
import { usePilotLocation } from "@/pilotRouting";
import { resolveStartMode } from "@/startFlow";

const BRAND = "Plataforma Negócio Fechado";

function BrandMark({ small = false }: { small?: boolean }) {
  return <div className={`flex items-center justify-center rounded-2xl bg-[#202321] font-black text-[#b8d36a] ${small ? "h-14 w-14 text-3xl" : "h-20 w-20 text-5xl"}`}>O</div>;
}

function LoadingScreen() {
  return <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f6f3]"><div className="flex flex-col items-center gap-6"><BrandMark /><div className="text-center"><p className="text-xl font-bold tracking-tight text-[#202321]">MÓDULO: OBRAS</p><p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#71756f]">{BRAND}</p></div><Loader2 className="h-6 w-6 animate-spin text-[#789249]" /></div></div>;
}

function LoginScreen({ onContinue }: { onContinue: () => void }) {
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || password.length < 6) { toast.error("Informe um e-mail e uma senha com pelo menos 6 caracteres."); return; }
    setBusy(true);
    try {
      const user = creating ? await signUpWithPassword(email.trim(), password) : await signInWithPassword(email.trim(), password);
      if (creating && user && !user.email_confirmed_at) toast.success("Conta criada. Confirme seu e-mail para entrar.");
      else { toast.success("Acesso sincronizado."); onContinue(); }
      setPassword("");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Não foi possível acessar o ambiente sincronizado."); }
    finally { setBusy(false); }
  };

  return <div className="flex min-h-screen items-center justify-center bg-[#f6f6f3] p-5"><div className="w-full max-w-md space-y-8"><div className="flex flex-col items-center gap-5 text-center"><BrandMark small /><div><h1 className="text-2xl font-bold tracking-tight text-[#202321]">MÓDULO: OBRAS</h1><p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#71756f]">{BRAND}</p></div></div><Card className="rounded-none border-0 bg-white shadow-[5px_5px_0_#d0d1cb]"><CardContent className="p-6"><div className="flex items-center gap-2"><Cloud className="h-4 w-4 text-[#789249]" /><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#71756f]">Entrar no ambiente sincronizado</p></div><p className="mt-3 text-sm leading-6 text-[#70756e]">Use a mesma conta no celular e no computador para manter suas obras e registros disponíveis nos dois aparelhos.</p><form onSubmit={submit} className="mt-6 space-y-3"><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Seu e-mail" autoComplete="email" className="h-11 border-black/10 bg-[#f6f6f3]" /><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Senha (mínimo 6 caracteres)" autoComplete={creating ? "new-password" : "current-password"} className="h-11 border-black/10 bg-[#f6f6f3]" /><Button type="submit" disabled={busy} className="h-11 w-full bg-[#202321] text-white">{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}{creating ? "Criar conta" : "Entrar"}</Button><button type="button" className="w-full text-xs font-semibold text-[#596b36] underline-offset-4 hover:underline" onClick={() => setCreating((value) => !value)}>{creating ? "Já tenho uma conta" : "Ainda não tenho conta"}</button></form></CardContent></Card><div className="text-center"><button type="button" onClick={onContinue} className="text-xs font-semibold text-[#71756f] underline-offset-4 hover:text-[#202321] hover:underline">Continuar somente neste dispositivo</button><p className="mt-3 text-[11px] leading-5 text-[#71756f]">Você poderá ativar a sincronização depois em Preferências.</p></div></div></div>;
}

function WorksScreen() {
  const { project } = useLocalProject();
  const [, setLocation] = usePilotLocation();
  return <div className="flex min-h-screen flex-col bg-[#f6f6f3] p-5 md:p-10"><div className="mx-auto w-full max-w-3xl"><div className="flex items-center gap-4"><BrandMark small /><div><p className="text-xl font-bold tracking-tight text-[#202321]">MÓDULO: OBRAS</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#71756f]">{BRAND}</p></div></div><div className="mt-12 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#71756f]">Ambiente sincronizado</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-[#202321] md:text-4xl">Suas obras</h1></div><span className="hidden text-xs text-[#71756f] md:block">Selecione uma obra para continuar</span></div><div className="mt-7 grid gap-5 md:grid-cols-2"><Card className="rounded-none border-0 bg-white shadow-[5px_5px_0_#d0d1cb] transition-all hover:shadow-[5px_5px_0_#b8d36a]"><CardContent className="p-6"><div className="flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center bg-[#f6f6f3] text-[#202321]"><Building2 className="h-6 w-6" /></div><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#789249]">Ativa</span></div><h2 className="mt-7 text-xl font-bold text-[#202321]">{project.name}</h2><p className="mt-1 text-sm text-[#70756e]">{project.location} · {project.status}</p><p className="mt-4 line-clamp-2 text-xs leading-5 text-[#71756f]">{project.description}</p><Button onClick={() => setLocation("/hoje")} className="mt-6 h-11 w-full bg-[#202321] text-white">Abrir obra</Button></CardContent></Card><button type="button" onClick={() => toast.info("A criação de novas obras será liberada em uma próxima etapa.")} className="flex min-h-[260px] flex-col items-center justify-center rounded-none border border-dashed border-black/20 bg-transparent p-6 text-center text-[#71756f] transition hover:border-[#789249] hover:bg-white"><span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15"><Plus className="h-5 w-5" /></span><span className="mt-5 text-sm font-bold text-[#202321]">Adicionar nova obra</span><span className="mt-2 max-w-[210px] text-xs leading-5">Prepare o próximo espaço de trabalho sem misturar os registros desta obra.</span></button></div></div></div>;
}

export default function StartPage() {
  const [phase, setPhase] = useState<"loading" | "login" | "works">("loading");
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => { void getCurrentUser().then((user) => { if (active) setPhase(user ? "works" : "login"); }).catch(() => { if (active) setPhase("login"); }); }, 800);
    const { data } = supabase.auth.onAuthStateChange((_event, session) => { if (active && session) setPhase("works"); });
    return () => { active = false; clearTimeout(timer); data.subscription.unsubscribe(); };
  }, []);
  const mode = resolveStartMode(phase === "loading", phase === "works");
  if (mode === "loading") return <LoadingScreen />;
  if (mode === "login") return <LoginScreen onContinue={() => setPhase("works")} />;
  return <WorksScreen />;
}
