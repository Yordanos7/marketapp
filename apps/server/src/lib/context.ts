import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";
import prisma from "../db";
export async function createContext(opts: CreateExpressContextOptions) {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(opts.req.headers),
	});
	return {
		session,
		db: prisma,
	};
}

export type Context = Awaited<ReturnType<typeof createContext >> & {
	db: typeof prisma;
};



// This code sets up a "context" function for tRPC when using an Express.js backend, linking authentication session data from Better Auth to every tRPC request.