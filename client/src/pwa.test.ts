import { describe, expect, it } from "vitest";
import { getPwaRegistration } from "./pwa";

describe("registro do aplicativo instalável", () => {
  it("mantém o service worker dentro do subdiretório do GitHub Pages", () => {
    expect(getPwaRegistration("/projeto-piloto-plataforma-negocio-fechado/")).toEqual({
      url: "/projeto-piloto-plataforma-negocio-fechado/sw.js",
      scope: "/projeto-piloto-plataforma-negocio-fechado/",
    });
  });

  it("normaliza a barra final do caminho base", () => {
    expect(getPwaRegistration("/")).toEqual({ url: "/sw.js", scope: "/" });
  });
});
