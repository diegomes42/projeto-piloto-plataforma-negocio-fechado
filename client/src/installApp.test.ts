import { describe, expect, it } from "vitest";
import { getInstallHelpMessage, isInstalledApp } from "./installApp";

describe("instalação do aplicativo", () => {
  it("identifica quando o aplicativo já está aberto no modo instalado", () => {
    expect(isInstalledApp(true)).toBe(true);
    expect(isInstalledApp(false, true)).toBe(true);
    expect(isInstalledApp(false, false)).toBe(false);
  });

  it("orienta a instalação manual em navegadores sem o convite nativo", () => {
    expect(getInstallHelpMessage("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)")).toContain("Compartilhar");
    expect(getInstallHelpMessage("Mozilla/5.0 (X11; Linux x86_64) Chrome/140")).toContain("Instalar aplicativo");
  });
});
