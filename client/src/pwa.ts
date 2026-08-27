export function getPwaRegistration(basePath: string) {
  const scope = basePath.endsWith("/") ? basePath : `${basePath}/`;
  return { url: `${scope}sw.js`, scope };
}
