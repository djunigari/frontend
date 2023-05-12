import { Button, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ChoiceLoginTypeModal from "./ChoiceLoginTypeModal";

function Login() {
	const { status } = useSession();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(status === "loading");
	}, [status]);

	return (
		<>
			<ChoiceLoginTypeModal isOpen={isOpen} onClose={onClose} />
			<Flex
				cursor="pointer"
				fontSize={{ base: "xs", md: "sm" }}
				fontWeight="semibold"
				borderColor="green"
				borderRadius="md"
				bg="gray.100"
				py={1}
				px={2}
				_hover={{ bg: "green.50" }}
				onClick={onOpen}
			>
				{loading ? <Spinner /> : <Text>Entrar/Registrar</Text>}
			</Flex>
		</>
	);
}

export default Login;
