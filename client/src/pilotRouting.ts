import { useCallback, useEffect, useState } from "react";

export function readPilotPath() { return window.location.hash.replace(/^#/, "") || "/"; }
export function usePilotLocation() {
  const [path, setPath] = useState(readPilotPath);
  useEffect(() => { const onChange = () => setPath(readPilotPath()); window.addEventListener("hashchange", onChange); return () => window.removeEventListener("hashchange", onChange); }, []);
  const navigate = useCallback((next: string) => { window.location.hash = next; }, []);
  return [path, navigate] as const;
}
