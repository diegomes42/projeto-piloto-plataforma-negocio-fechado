import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createAction, createAttachment, createDailyLog, createEvent, createProductionEntry, createProject, createService, createWorkFront, getProjectForOwner, listDailyLogs, listFronts, listProjectActions, listProjectDecisions, listProjectEvents, listProjectNotifications, listProjectServices, listProjects, updateActionStatus } from "./db";
import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

async function scopedProject(projectId: number, ownerId: number) { const project = await getProjectForOwner(projectId, ownerId); if (!project) throw new TRPCError({ code: "FORBIDDEN", message: "Obra não disponível para este usuário" }); return project; }
const projectInput = z.object({ projectId: z.number().int().positive() });
export const appRouter = router({
  system: systemRouter,
  auth: router({ me: publicProcedure.query(opts => opts.ctx.user), logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions = getSessionCookieOptions(ctx.req); ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 }); return { success: true } as const; }) }),
  projects: router({
    list: protectedProcedure.query(({ ctx }) => listProjects(ctx.user.id)),
    create: protectedProcedure.input(z.object({ name: z.string().min(2), client: z.string().optional(), location: z.string().optional(), description: z.string().optional() })).mutation(({ ctx, input }) => createProject({ ...input, ownerId: ctx.user.id })),
    createFront: protectedProcedure.input(z.object({ projectId: z.number().int().positive(), name: z.string().min(2), code: z.string().optional(), currentState: z.string().optional(), nextStep: z.string().optional() })).mutation(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return createWorkFront(input); }),
    createService: protectedProcedure.input(z.object({ projectId: z.number().int().positive(), frontId: z.number().int().positive(), name: z.string().min(2), unit: z.string().min(1), plannedQty: z.string().regex(/^\\d+(\\.\\d+)?$/) })).mutation(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return createService(input); }),
    fronts: protectedProcedure.input(projectInput).query(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return listFronts(input.projectId); }),
    services: protectedProcedure.input(projectInput).query(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return listProjectServices(input.projectId); }),
    decisions: protectedProcedure.input(projectInput).query(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return listProjectDecisions(input.projectId); }),
    notifications: protectedProcedure.input(projectInput).query(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return listProjectNotifications(input.projectId, ctx.user.id); }),
    actions: protectedProcedure.input(projectInput).query(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return listProjectActions(input.projectId); }),
    events: protectedProcedure.input(projectInput).query(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return listProjectEvents(input.projectId); }),
    dailyLogs: protectedProcedure.input(projectInput).query(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return listDailyLogs(input.projectId); }),
    createDailyLog: protectedProcedure.input(z.object({ projectId: z.number().int().positive(), summary: z.string().min(3), logDate: z.coerce.date(), weather: z.string().optional(), workforce: z.number().int().nonnegative().optional(), workedHours: z.string().optional() })).mutation(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return createDailyLog({ ...input, authorId: ctx.user.id }); }),
    createEvent: protectedProcedure.input(z.object({ projectId: z.number().int().positive(), title: z.string().min(3), description: z.string().optional(), category: z.string().min(2), severity: z.enum(["low", "medium", "high", "critical"]), impact: z.string().optional(), frontId: z.number().int().positive().optional() })).mutation(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return createEvent(input); }),
    createAction: protectedProcedure.input(z.object({ projectId: z.number().int().positive(), title: z.string().min(3), ownerName: z.string().optional(), dueAt: z.coerce.date().optional(), priority: z.enum(["low", "medium", "high", "critical"]) })).mutation(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return createAction(input); }),
    uploadAttachment: protectedProcedure.input(z.object({ projectId: z.number().int().positive(), dailyLogId: z.number().int().positive().optional(), fileName: z.string().min(1).max(255), mimeType: z.string().max(120).optional(), dataBase64: z.string().min(10) })).mutation(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); const data = Buffer.from(input.dataBase64, "base64"); const stored = await storagePut(`projects/${input.projectId}/evidence/${input.fileName}`, data, input.mimeType || "application/octet-stream"); return createAttachment({ projectId: input.projectId, dailyLogId: input.dailyLogId, fileName: input.fileName, mimeType: input.mimeType, fileKey: stored.key, fileUrl: stored.url }); }),
    createProduction: protectedProcedure.input(z.object({ projectId: z.number().int().positive(), frontId: z.number().int().positive(), serviceId: z.number().int().positive(), dailyLogId: z.number().int().positive().optional(), quantity: z.string().regex(/^\\d+(\\.\\d+)?$/), unit: z.string().min(1).max(20), entryDate: z.coerce.date() })).mutation(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return createProductionEntry(input); }),
    updateActionStatus: protectedProcedure.input(z.object({ projectId: z.number().int().positive(), actionId: z.number().int().positive(), status: z.enum(["open", "in_progress", "done", "overdue"]) })).mutation(async ({ ctx, input }) => { await scopedProject(input.projectId, ctx.user.id); return updateActionStatus(input.projectId, input.actionId, input.status); }),
  }),
});
export type AppRouter = typeof appRouter;
