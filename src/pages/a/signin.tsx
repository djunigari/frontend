import { Button, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
	return (
		<Flex direction="column" borderRadius="md" bg="white" shadow="md" p={8}>
			<Text as="u" fontWeight="bold" fontSize="2xl" mb={2}>
				Entrar/Registrar como cliente
			</Text>
			<Text fontSize="xs" color="gray.600">
				Ao continuar, você está configurando uma conta no Catálogo Japão
				e concorda com os nossos
				<Link href="/r/termos-de-uso" color="blue.600" mx={1}>
					Termos de Uso
				</Link>
				e a nossa
				<Link href="/r/politica-de-privacidade" color="blue.600" mx={1}>
					Política de Privacidade.
				</Link>
			</Text>

			<Button
				mt={12}
				border="1px solid"
				borderColor="gray.300"
				borderRadius="full"
				onClick={() => signIn("google")}
				leftIcon={<Icon as={FcGoogle} />}
			>
				Com Google
			</Button>
			{/* <Button
				mt={2}
				border="1px solid"
				borderColor="gray.300"
				borderRadius="full"
				onClick={() => signIn("google")}
				leftIcon={<Icon as={FaFacebookSquare} color="blue.600" />}
			>
				Entrar com Facebook
			</Button> */}
		</Flex>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (!session) return { props: {} };

	return {
		redirect: {
			destination: "/",
			permanent: false,
		},
	};
};
