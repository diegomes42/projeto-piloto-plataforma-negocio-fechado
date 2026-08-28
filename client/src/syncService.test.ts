import { describe, expect, it, vi } from "vitest";
import { readRemoteSnapshot, writeRemoteSnapshot } from "@/syncService";
import { supabase } from "@/supabaseClient";

vi.mock("@/supabaseClient", () => ({
  supabase: { from: vi.fn() },
}));

const project = { name: "Jardim Planalto", location: "Remígio/PB" } as never;

describe("syncService", () => {
  it("lê o snapshot individual usando o identificador do usuário", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({ data: { project, updated_at: "2026-08-28T00:00:00.000Z" }, error: null });
    const eq = vi.fn().mockReturnValue({ maybeSingle });
    const select = vi.fn().mockReturnValue({ eq });
    vi.mocked(supabase.from).mockReturnValue({ select } as never);

    await expect(readRemoteSnapshot("user-1")).resolves.toEqual({ project, updatedAt: "2026-08-28T00:00:00.000Z" });
    expect(eq).toHaveBeenCalledWith("user_id", "user-1");
  });

  it("grava o snapshot com conflito resolvido pelo usuário", async () => {
    const upsert = vi.fn().mockResolvedValue({ error: null });
    vi.mocked(supabase.from).mockReturnValue({ upsert } as never);

    await expect(writeRemoteSnapshot("user-1", project)).resolves.toBeUndefined();
    expect(upsert).toHaveBeenCalledWith({ user_id: "user-1", project, version: 1 }, { onConflict: "user_id" });
  });
});
