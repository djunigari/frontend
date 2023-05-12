import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		error?: string;
		accessToken?: string;
		accessTokenExpires?: number;
		user: {
			id?: string;
		} & DefaultSession["user"];
	}
}
