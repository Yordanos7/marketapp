import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../db";

export const auth = betterAuth<BetterAuthOptions>({
	socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	trustedOrigins: [process.env.CORS_ORIGIN || ""],
	emailAndPassword: {
		enabled: true,
	},
	advanced: {
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			httpOnly: true,
		},
	},
});


// here to know about this code file you can  read  the doc down here

// betterAuth initializes the authentication system.

// prismaAdapter(prisma, { provider: "postgresql" }) links Better Auth with your Prisma client instance, using PostgreSQL as the database.

// trustedOrigins configures allowed origins for security (e.g., for CORS).

// emailAndPassword.enabled: true enables email/password based login.

// advanced.defaultCookieAttributes sets attributes for cookies used for session management to improve security.

// What Does This Enable?
// User authentication backed by your Prisma database.

// Secure session cookies with proper cross-site settings.

// Email/password login as an authentication method.

// Easy extension to add social login or other auth features if needed.