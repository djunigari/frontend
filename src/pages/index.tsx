import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import SearchButton from "@frontend/components/Layout/Search/SearchButton";
import AdBanner from "@frontend/components/ads/AdBanner";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const Home = () => {
	const { data: session } = useSession();
	const [query, setQuery] = useState("");

	return (
		<Flex direction="column" w="full" h="full" align="center">
			<SearchButton mb={2} query={query} setQuery={setQuery} />
			{session?.user && (
				<Text alignSelf="start" mb={2} fontWeight="semibold">
					{`${session.user.name}, Seja Bem vindo!`}
				</Text>
			)}
			{!session?.user && (
				<>
					<Text borderRadius="md" bg="white" shadow="md" p={2} mb={2}>
						Bem-vindo ao nosso catálogo online! Aqui você encontrará
						uma ampla seleção de produtos e serviços especialmente
						selecionados para a comunidade brasileira no Japão.
						Estamos felizes em tê-lo como parte da nossa comunidade!
					</Text>
					<AdBanner />

					<Link
						w="full"
						href="https://empresa.catalogojapao.com/a/signin"
						_hover={{ textDecoration: "none" }}
						isExternal
					>
						<Flex
							cursor="pointer"
							direction="column"
							w="full"
							p={4}
							mb={2}
							borderRadius="sm"
							border="1px solid"
							borderColor="blue.50"
							shadow="md"
							_hover={{
								borderColor: "blue.100",
								bg: "gray.50",
							}}
							_active={{
								borderColor: "blue.100",
							}}
						>
							<Flex>
								<Icon
									as={IoStorefrontOutline}
									boxSize={10}
									borderRadius="full"
									bg="blue.50"
									color="blue.700"
									p={2}
								/>
								<Text
									color="blue.700"
									fontSize="xs"
									fontWeight="semibold"
								>
									(Profissional/Empresa)
								</Text>
							</Flex>

							<Text mt={2} color="blue.300" fontWeight="semibold">
								Quero adicionar meus contatos e serviços que
								ofereço.
							</Text>
						</Flex>
					</Link>
				</>
			)}
			<Text
				fontSize="xs"
				fontWeight="semibold"
				bg="white"
				borderRadius="md"
				mb={2}
				p={2}
			>
				Precisa de ajuda ou tem alguma dúvida? Entre em contato conosco
				através do nosso instagram{" "}
				<Link href="https://www.instagram.com/catalogojapao">
					@catalogojapao
				</Link>
			</Text>
		</Flex>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 1 * 60 * 60, // In seconds
	};
};
