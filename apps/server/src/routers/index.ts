import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { todoRouter } from "./todo";
import { marketplaceRouter } from "./marketplace";
import { fidaRouter } from "./fida";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	todo: todoRouter,
	marketplace: marketplaceRouter,
	fida:fidaRouter, // i just add this line for fida router
});
export type AppRouter = typeof appRouter;


// This code defines the main API router for your tRPC backend, organizing and exposing your API endpoints with both public and protected access.