import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/DashboardLayout";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { useEffect, useState } from "react";

function usePilotHashLocation() {
  const read = () => window.location.hash.replace(/^#/, "") || "/";
  const [location, setLocation] = useState(read);
  useEffect(() => { const onHashChange = () => setLocation(read()); window.addEventListener("hashchange", onHashChange); return () => window.removeEventListener("hashchange", onHashChange); }, []);
  return [location, (to: string) => { window.location.hash = to; }] as const;
}
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import OperationalPage from "@/pages/OperationalPage";
import SetupPage from "@/pages/SetupPage";

function Placeholder({ title, eyebrow, description }: { title: string; eyebrow: string; description: string }) {
  return <div className="min-h-screen bg-[#ececea] p-8 lg:p-12"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#71756f]">{eyebrow}</p><h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.07em]">{title}</h1><p className="mt-4 max-w-xl text-[#70756e]">{description}</p><div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">{["Estado vivo", "Histórico", "Próximas ações"].map((item) => <div className="border-l-4 border-[#b8d36a] bg-[#f6f6f3] p-5 shadow-[4px_4px_0_#d0d1cb]" key={item}><p className="text-sm font-bold uppercase">{item}</p><p className="mt-2 text-xs text-[#858a82]">Módulo conectado ao contexto da obra ativa.</p></div>)}</div></div>;
}

function AppRouter() {
  return <WouterRouter hook={usePilotHashLocation}><DashboardLayout><Switch><Route path="/" component={Home} /><Route path="/diario"><OperationalPage mode="diario" /></Route><Route path="/frentes"><OperationalPage mode="frentes" /></Route><Route path="/eventos"><OperationalPage mode="eventos" /></Route><Route path="/timeline"><OperationalPage mode="timeline" /></Route><Route path="/cadastro" component={SetupPage} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></DashboardLayout></WouterRouter>;
}

export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><AppRouter /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
