import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import type, { Profile as GoogleProfile } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */

	interface User {
		role?: string;
	}

	interface Session {
		user: {
			/** The user's postal address. */
			role?: string;
		} & DefaultSession["user"];
	}

	interface Profile extends GoogleProfile {
		email_verified?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		role?: string;
	}
}
