import { describe, expect, it } from "vitest";
import { resolveStartMode } from "./startFlow";

describe("resolveStartMode", () => {
  it("mantém a tela de carregamento enquanto a sessão é verificada", () => {
    expect(resolveStartMode(true, false)).toBe("loading");
  });

  it("leva usuários sem sessão para o login", () => {
    expect(resolveStartMode(false, false)).toBe("login");
  });

  it("leva usuários autenticados para a seleção de obras", () => {
    expect(resolveStartMode(false, true)).toBe("works");
  });
});
