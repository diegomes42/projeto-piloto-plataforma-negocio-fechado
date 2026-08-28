import { useEffect, useState, type FormEvent } from "react";
import { Cloud, LogIn, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInWithPassword, signOut, signUpWithPassword } from "@/syncService";
import { supabase } from "@/supabaseClient";

const Kicker = ({ children }: { children: React.ReactNode }) => <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#71756f]">{children}</p>;

type SyncPanelProps = {
  syncStatus: "local" | "syncing" | "synced" | "offline";
  syncNow: () => Promise<void>;
};

export default function SyncPanel({ syncStatus, syncNow }: SyncPanelProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data }) => { if (active) setUserEmail(data.user?.email ?? null); });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUserEmail(session?.user?.email ?? null));
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || password.length < 6) {
      toast.error("Informe um e-mail e uma senha com pelo menos 6 caracteres.");
      return;
    }
    setBusy(true);
    try {
      const user = creating ? await signUpWithPassword(email.trim(), password) : await signInWithPassword(email.trim(), password);
      if (creating && user && !user.email_confirmed_at) {
        toast.success("Conta criada. Confirme o e-mail para ativar a sincronização.");
      } else {
        await syncNow();
        toast.success("Sincronização ativada neste dispositivo.");
      }
      setPassword("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível acessar a sincronização.");
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    setBusy(true);
    try { await signOut(); toast.success("Sincronização desativada neste dispositivo."); }
    catch { toast.error("Não foi possível sair da conta."); }
    finally { setBusy(false); }
  };

  const statusLabel = syncStatus === "synced" ? "Sincronizado" : syncStatus === "syncing" ? "Sincronizando…" : syncStatus === "offline" ? "Sem conexão com a nuvem" : "Somente neste navegador";

  return <Card className="rounded-none border-0 bg-[#f6f6f3] shadow-[5px_5px_0_#d0d1cb]"><CardContent className="p-6"><div className="flex items-center gap-2"><Cloud className="h-4 w-4 text-[#789249]" /><Kicker>Sincronização</Kicker></div><p className="mt-3 text-sm leading-6 text-[#70756e]">Use a mesma conta no celular e no computador para manter os registros da obra disponíveis nos dois aparelhos.</p>{userEmail ? <div className="mt-5 space-y-3"><div className="border border-black/10 bg-white p-3"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#71756f]">Conta conectada</p><p className="mt-1 truncate text-sm font-semibold">{userEmail}</p><p className="mt-2 text-xs text-[#70756e]">Estado: <strong>{statusLabel}</strong></p></div><div className="flex gap-2"><Button type="button" onClick={() => void syncNow()} disabled={busy} className="h-10 flex-1 bg-[#202321] text-white"><RefreshCw className="mr-2 h-4 w-4" />Sincronizar agora</Button><Button type="button" variant="outline" onClick={() => void logout()} disabled={busy} className="h-10 border-black/15 bg-white px-3" aria-label="Sair da conta"><LogOut className="h-4 w-4" /></Button></div></div> : <form onSubmit={submit} className="mt-5 space-y-3"><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Seu e-mail" autoComplete="email" className="h-11 border-black/10 bg-white" /><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Senha (mínimo 6 caracteres)" autoComplete={creating ? "new-password" : "current-password"} className="h-11 border-black/10 bg-white" /><Button type="submit" disabled={busy} className="h-11 w-full bg-[#202321] text-white"><LogIn className="mr-2 h-4 w-4" />{creating ? "Criar conta e sincronizar" : "Entrar e sincronizar"}</Button><button type="button" className="w-full text-xs font-semibold text-[#596b36] underline-offset-4 hover:underline" onClick={() => setCreating((value) => !value)}>{creating ? "Já tenho uma conta" : "Ainda não tenho conta"}</button></form>}<p className="mt-4 text-[11px] leading-5 text-[#71756f]">Se ficar sem internet, o app continua salvando neste navegador e tenta sincronizar quando você conectar novamente.</p></CardContent></Card>;
}
