import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import theme from "@frontend/chakra/theme";
import Layout from "@frontend/components/Layout/Layout";
import RefreshAccessTokenHandler from "@frontend/components/Layout/RefreshAccessTokenHandler";
import apolloClient from "@frontend/lib/apollo-client/apollo";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useState } from "react";
import { RecoilRoot } from "recoil";

function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{
	session: Session;
}>) {
	const [refetchInterval, setRefetchInterval] = useState<number>(1 * 60 * 60);
	const [loadingUserInfoStates, setLoadingUserInfoStates] =
		useState<boolean>(false);

	return (
		<>
			<Head>
				<title>Catálogo Japão</title>
				<meta
					name="facebook-domain-verification"
					content="kcky4urflgikowiyyk2hs5z10zjw6v"
				/>
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
			</Head>

			{/* https://dev.to/mabaranowski/nextjs-authentication-jwt-refresh-token-rotation-with-nextauthjs-5696 */}
			<SessionProvider
				session={session}
				refetchInterval={refetchInterval}
			>
				<RecoilRoot>
					<ApolloProvider client={apolloClient}>
						<ChakraProvider theme={theme}>
							<Layout>
								<RefreshAccessTokenHandler
									setRefetchInterval={setRefetchInterval}
									setLoading={setLoadingUserInfoStates}
								/>
								{loadingUserInfoStates ? (
									<Flex
										w="full"
										h="full"
										align="center"
										justify="center"
									>
										<Spinner />
									</Flex>
								) : (
									<Component {...pageProps} />
								)}
							</Layout>
						</ChakraProvider>
					</ApolloProvider>
				</RecoilRoot>
			</SessionProvider>
		</>
	);
}

export default MyApp;
