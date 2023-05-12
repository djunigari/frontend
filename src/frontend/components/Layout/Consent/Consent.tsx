import { Button, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import useCookiesConsent from "@frontend/hooks/useCookiesConsent";

function Consent() {
	const { consent, acceptCookie } = useCookiesConsent();

	if (consent === true) {
		return null;
	}

	return (
		<Flex w="full" position="fixed" bottom={5} p={2} zIndex={200}>
			<Flex
				flexGrow={1}
				direction={{ base: "column", md: "row" }}
				bg="white"
				shadow="md"
				borderRadius="md"
			>
				<Flex direction="column" p={2}>
					<Text fontWeight="bold" color="gray.600">
						Nós usamos cookies
					</Text>
					<Text color="gray.600" fontSize="sm">
						Eles são usados para aprimorar a sua experiência. Ao
						fechar este banner ou continuar na página, você concorda
						com o uso de cookies.{" "}
						<Link href="/r/politica-de-cookies" color="blue.400">
							Saber mais
						</Link>
					</Text>
				</Flex>
				<Spacer />
				<Flex
					justify={{ base: "none", md: "flex-end" }}
					align={{ base: "none", md: '"center"' }}
					alignSelf={{ base: "end", md: "center" }}
					p={2}
				>
					<Button
						fontWeight="bold"
						justifySelf="center"
						onClick={() => acceptCookie()}
					>
						Aceito
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Consent;
