import apolloClient from "@frontend/lib/apollo-client/apollo";
import { CREATE_CLIENT } from "@frontend/lib/apollo-client/mutations/client/CreateClient.mutation";
import { GET_CLIENT } from "@frontend/lib/apollo-client/queries/Client/GetClient.query";
import clientPromise from "@frontend/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
	try {
		const url =
			"https://oauth2.googleapis.com/token?" +
			new URLSearchParams({
				client_id: process.env.GOOGLE_CLIENT_ID as string,
				client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
				grant_type: "refresh_token",
				refresh_token: token.refreshToken as string,
			});

		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "POST",
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() / 1000 + refreshedTokens.expires_in,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
		};
	} catch (error) {
		console.log("RefreshAccessTokenError", error);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		}),
	],
	adapter: MongoDBAdapter(clientPromise),
	secret: process.env.SECRET,
	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `strategy` should be set to 'jwt' if no database is used.
		strategy: "jwt",

		// Seconds - How long until an idle session expires and is no longer valid.
		// maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		// updateAge: 24 * 60 * 60, // 24 hours
	},
	jwt: {
		// A secret to use for key generation (you should set this explicitly)
		secret: process.env.SECRET,
		// Set to true to use encryption (default: false)
		// encryption: true,
		// You can define your own encode/decode functions for signing and encryption
		// if you want to override the default behaviour.
		// encode: async ({ secret, token, maxAge }) => {},
		// decode: async ({ secret, token, maxAge }) => {},
	},
	pages: {
		signIn: "/a/signin", // Displays signin buttons
		// signOut: '/auth/signout', // Displays form with sign out button
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // Used for check email page
		// newUser: null // If set, new users will be directed here on first sign in
	},
	callbacks: {
		// async signIn({ user, account, profile, email, credentials }) {return true;},
		// async redirect({ url, baseUrl }) { return baseUrl },
		// async jwt({ token, user, account, profile, isNewUser }) { return token }
		// async session({ session, token, user }) { return session },

		async jwt({ token, account, isNewUser, user }) {
			//for test
			// token.accessTokenExpires = Date.now() / 1000 + 60;
			if (isNewUser && account) {
				try {
					const { data } = await apolloClient.mutate({
						mutation: CREATE_CLIENT,
						context: {
							headers: {
								authorization: `Bearer ${account.access_token}`,
							},
						},
					});
					token.client = data.createClient;
				} catch (error) {
					console.log("isNewUser", error);
				}
			}

			// Initial sign in
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					accessTokenExpires: account.expires_at,
					refreshToken: account.refresh_token,
				};
			}

			// Return previous token if the access token has not expired yet
			if (Date.now() < Number(token.accessTokenExpires) * 1000) {
				return Promise.resolve(token);
			}

			// Access token has expired, try to update it
			const res = refreshAccessToken(token);

			return Promise.resolve(res);
		},
		async session({ session, token }) {
			session.accessTokenExpires = token.accessTokenExpires as number;
			session.user.id = token.sub;
			session.accessToken = token.accessToken as string;
			session.error = token.error as string;
			return Promise.resolve(session);
		},
	},
};

export default NextAuth(authOptions);
