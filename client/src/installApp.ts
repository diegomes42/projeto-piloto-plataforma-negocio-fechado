export function isInstalledApp(isStandaloneDisplay: boolean, iosStandalone = false) {
  return isStandaloneDisplay || iosStandalone;
}

export function getInstallHelpMessage(userAgent: string) {
  const isAppleMobile = /iPad|iPhone|iPod/i.test(userAgent);
  return isAppleMobile
    ? "No Safari, toque em Compartilhar e escolha Adicionar à Tela de Início."
    : "Abra o menu do navegador e escolha Instalar aplicativo ou Adicionar à tela inicial.";
}
