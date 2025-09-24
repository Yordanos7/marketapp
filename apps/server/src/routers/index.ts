import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { todoRouter } from "./todo";
import { marketplaceRouter } from "./marketplace";

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
});
export type AppRouter = typeof appRouter;


// This code defines the main API router for your tRPC backend, organizing and exposing your API endpoints with both public and protected access.