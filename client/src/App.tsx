import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/DashboardLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import OperationalPage from "@/pages/OperationalPage";
import SetupPage from "@/pages/SetupPage";
import NotFound from "@/pages/NotFound";
import BackupPage from "@/pages/BackupPage";
import WeeklyReportPage from "@/pages/WeeklyReportPage";
import { usePilotLocation } from "@/pilotRouting";

function AppRouter() {
  const [path] = usePilotLocation();
  const content = path === "/" ? <Home /> : path === "/diario" ? <OperationalPage mode="diario" /> : path === "/frentes" ? <OperationalPage mode="frentes" /> : path === "/eventos" ? <OperationalPage mode="eventos" /> : path === "/timeline" ? <OperationalPage mode="timeline" /> : path === "/cadastro" ? <SetupPage /> : path === "/dados" ? <BackupPage /> : path === "/relatorio" ? <WeeklyReportPage /> : <NotFound />;
  return <DashboardLayout>{content}</DashboardLayout>;
}

export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><AppRouter /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
