import { useCallback, useEffect, useState } from "react";

export function readPilotPath() {
  const hashPath = window.location.hash.replace(/^#/, "");
  if (hashPath) return hashPath;
  const pathname = window.location.pathname.replace(/\/$/, "");
  const base = "/projeto-piloto-plataforma-negocio-fechado";
  if (pathname === base || pathname === "") return "/";
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || "/";
  return pathname || "/";
}
export function usePilotLocation() {
  const [path, setPath] = useState(readPilotPath);
  useEffect(() => { const onChange = () => setPath(readPilotPath()); window.addEventListener("hashchange", onChange); return () => window.removeEventListener("hashchange", onChange); }, []);
  const navigate = useCallback((next: string) => { window.location.hash = next; }, []);
  return [path, navigate] as const;
}
