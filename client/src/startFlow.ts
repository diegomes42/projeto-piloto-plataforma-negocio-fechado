export type StartMode = "loading" | "login" | "works";

export function resolveStartMode(loading: boolean, hasUser: boolean): StartMode {
  if (loading) return "loading";
  return hasUser ? "works" : "login";
}
