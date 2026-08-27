import { useRef, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Download, FileJson, ShieldCheck, Upload } from "lucide-react";
import { parseLocalBackup, serializeLocalProject, useLocalProject, type LocalProject } from "@/localStore";

const Kicker = ({ children }: { children: React.ReactNode }) => <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#71756f]">{children}</p>;

function downloadText(filename: string, contents: string) {
  const blob = new Blob([contents], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function BackupPage() {
  const { project, replaceProject } = useLocalProject();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingBackup, setPendingBackup] = useState<LocalProject | null>(null);
  const [pendingFileName, setPendingFileName] = useState("");

  const evidenceCount = project.diaries.filter((diary) => Boolean(diary.evidenceDataUrl)).length;
  const exportBackup = () => {
    try {
      const stamp = new Date().toISOString().slice(0, 10);
      downloadText(`obra-piloto-backup-${stamp}.json`, serializeLocalProject(project));
      toast.success("Backup baixado");
    } catch {
      toast.error("Não foi possível criar o backup");
    }
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const parsed = parseLocalBackup(await file.text());
      setPendingBackup(parsed);
      setPendingFileName(file.name);
      toast.success("Backup validado. Confirme a restauração para aplicar os dados.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível ler o backup");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const closeRestore = () => {
    setPendingBackup(null);
    setPendingFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const confirmRestore = () => {
    if (!pendingBackup) return;
    replaceProject(pendingBackup);
    closeRestore();
    toast.success("Backup restaurado neste navegador");
  };

  return <div className="min-h-screen bg-[#ececea] px-4 py-8 sm:px-8 lg:px-12"><div className="mx-auto max-w-5xl"><Kicker>Segurança operacional · uso local</Kicker><h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.08em]">Backup dos dados</h1><p className="mt-3 max-w-2xl text-sm text-[#70756e]">Proteja os registros da obra antes de trocar de dispositivo, limpar o navegador ou iniciar uma nova etapa.</p><div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_.85fr]"><Card className="rounded-none border-0 bg-[#202321] text-white shadow-[5px_5px_0_#c7c9c2]"><CardContent className="p-6"><div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center bg-[#b8d36a] text-[#202321]"><ShieldCheck className="h-5 w-5" /></div><div><Kicker>Recomendado</Kicker><h2 className="mt-2 text-2xl font-black uppercase">Baixe uma cópia</h2><p className="mt-3 max-w-lg text-sm leading-6 text-white/65">O arquivo JSON inclui frentes, serviços, produção, diários, fotos compactadas, eventos e ações. Guarde-o em um local seguro.</p></div></div><Button onClick={exportBackup} className="mt-6 bg-[#b8d36a] text-[#202321] hover:bg-[#c9e27c]"><Download className="mr-2 h-4 w-4" />Baixar backup JSON</Button></CardContent></Card><Card className="rounded-none border-0 bg-[#f6f6f3] shadow-[5px_5px_0_#d0d1cb]"><CardContent className="p-6"><Kicker>Dados atuais</Kicker><div className="mt-5 grid grid-cols-2 gap-4"><div><p className="text-2xl font-black">{project.diaries.length}</p><p className="text-[10px] uppercase tracking-[0.12em] text-[#858a82]">Diários</p></div><div><p className="text-2xl font-black">{evidenceCount}</p><p className="text-[10px] uppercase tracking-[0.12em] text-[#858a82]">Evidências</p></div><div><p className="text-2xl font-black">{project.events.length}</p><p className="text-[10px] uppercase tracking-[0.12em] text-[#858a82]">Eventos</p></div><div><p className="text-2xl font-black">{project.actions.length}</p><p className="text-[10px] uppercase tracking-[0.12em] text-[#858a82]">Ações</p></div></div></CardContent></Card></div><Card className="mt-5 rounded-none border-0 bg-[#f6f6f3] shadow-[5px_5px_0_#d0d1cb]"><CardContent className="p-6"><div className="flex flex-wrap items-start justify-between gap-5"><div className="max-w-2xl"><Kicker>Restaurar dados</Kicker><h2 className="mt-2 text-2xl font-black uppercase">Trazer um backup</h2><p className="mt-3 text-sm leading-6 text-[#70756e]">Selecione um arquivo JSON exportado pelo piloto. O conteúdo será validado antes de substituir os dados atuais deste navegador.</p></div><div className="relative"><Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="rounded-none border-black/15 bg-white"><Upload className="mr-2 h-4 w-4" />Selecionar backup</Button><input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={(event) => void handleFile(event.target.files?.[0])} /></div></div><div className="mt-5 flex items-center gap-2 border-t border-black/10 pt-4 text-xs text-[#70756e]"><FileJson className="h-4 w-4" />A restauração pede confirmação antes de substituir o estado atual.</div></CardContent></Card><p className="mt-6 text-xs leading-5 text-[#858a82]">Este backup é local e não é enviado para nenhum servidor. Para transportar a obra, baixe o arquivo e restaure-o no outro dispositivo.</p><RestoreConfirmation open={Boolean(pendingBackup)} fileName={pendingFileName} onCancel={closeRestore} onConfirm={confirmRestore} /></div></div>;
}

export function RestoreConfirmation({ open, fileName, onCancel, onConfirm }: { open: boolean; fileName: string; onCancel: () => void; onConfirm: () => void }) {
  return <AlertDialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onCancel(); }}><AlertDialogContent className="rounded-none border-black/10 bg-[#f6f6f3]"><AlertDialogHeader><AlertDialogTitle className="font-black uppercase tracking-[-0.03em]">Restaurar este backup?</AlertDialogTitle><AlertDialogDescription>O arquivo <strong>{fileName}</strong> foi validado. A restauração substituirá os dados atuais deste navegador pelo conteúdo do arquivo.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel><AlertDialogAction onClick={onConfirm} className="bg-[#202321] text-white">Restaurar dados</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>;
}
