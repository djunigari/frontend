import {
	Button,
	Icon,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaHouseUser, FaRegNewspaper } from "react-icons/fa";
import { IoStorefrontSharp } from "react-icons/io5";

interface ChoiceLoginTypeModalProps {
	isOpen: boolean;
	onClose: () => void;
}

function ChoiceLoginTypeModal({ isOpen, onClose }: ChoiceLoginTypeModalProps) {
	const router = useRouter();
	return (
		<Modal
			isCentered
			isOpen={isOpen}
			onClose={onClose}
			scrollBehavior="inside"
		>
			<ModalOverlay
				bg="none"
				backdropFilter="auto"
				backdropInvert="80%"
				backdropBlur="2px"
			/>
			<ModalContent>
				<ModalBody m={4}>
					<VStack>
						<Text fontWeight="bold" fontSize="2xl">
							Entrar/Registrar como:
						</Text>
						<Button
							w="full"
							border="1px solid"
							borderColor="gray.300"
							onClick={() => {
								router.push("/a/signin");
								onClose();
							}}
							leftIcon={<Icon as={FaHouseUser} />}
							colorScheme="blue"
						>
							Cliente
						</Button>
						<Link
							w="full"
							href="https://empresa.catalogojapao.com/a/signin"
							_hover={{ textDecoration: "none" }}
							// isExternal
						>
							<Button
								w="full"
								border="1px solid"
								borderColor="gray.300"
								leftIcon={<Icon as={IoStorefrontSharp} />}
								colorScheme="purple"
							>
								Empresa/Profissional
							</Button>
						</Link>
						<Button
							w="full"
							border="1px solid"
							borderColor="gray.300"
							onClick={() => signIn("facebook")}
							leftIcon={<Icon as={FaRegNewspaper} />}
							colorScheme="orange"
						>
							Anunciente
						</Button>
						<Button
							w="full"
							border="1px solid"
							borderColor="gray.300"
							onClick={onClose}
							colorScheme="gray"
						>
							Fechar
						</Button>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default ChoiceLoginTypeModal;
