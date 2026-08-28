import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getInstallHelpMessage, isInstalledApp } from "@/installApp";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(() => isInstalledApp(window.matchMedia?.("(display-mode: standalone)").matches ?? false, (navigator as Navigator & { standalone?: boolean }).standalone === true));

  useEffect(() => {
    const capturePrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const handleInstalled = () => {
      setInstallPrompt(null);
      setInstalled(true);
      toast.success("Aplicativo instalado no dispositivo");
    };
    window.addEventListener("beforeinstallprompt", capturePrompt);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", capturePrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) {
      toast.message(getInstallHelpMessage(navigator.userAgent));
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    if (choice.outcome === "accepted") toast.success("Instalação iniciada");
  };

  if (installed) return null;
  return <Button type="button" variant="outline" onClick={() => void install()} className="h-10 border-black/15 bg-white text-xs font-bold uppercase tracking-[0.12em] hover:bg-white"><Download className="mr-2 h-4 w-4" />Instalar app</Button>;
}
