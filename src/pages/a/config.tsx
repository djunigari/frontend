import { authOptions } from "@api/auth/[...nextauth]";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	Input,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import useEditUser from "@frontend/hooks/user/useEditUser";
import { GetServerSideProps } from "next";
import { unstable_getServerSession, User } from "next-auth";
import { useRef, useState } from "react";

interface ProfilePageProps {
	user: User;
}
function ProfilePage({ user }: ProfilePageProps) {
	return (
		<Flex
			w="full"
			h="full"
			justify="center"
			align="center"
			p={4}
			direction="column"
		>
			Bem vindo!
		</Flex>
	);
	const [newName, setNewName] = useState<string>("");
	const [newImage, setNewImage] = useState<string>("");
	const { changeName, changeImage, remove } = useEditUser();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const deleteRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<Flex
				w="full"
				h="full"
				justify="center"
				align="center"
				p={4}
				direction="column"
			>
				<Text fontWeight="bold">
					Bem Vindo {user.name || user.email}!
				</Text>

				{/* <Flex>
					<Input
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
					/>
					<Button>Editar</Button>
				</Flex> */}

				<Button colorScheme="red" onClick={onOpen}>
					Excluir Conta
				</Button>
			</Flex>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={deleteRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Confirmar exclusão da conta
						</AlertDialogHeader>

						<AlertDialogFooter>
							<Button ref={deleteRef} onClick={onClose}>
								Cancelar
							</Button>
							<Button
								colorScheme="red"
								onClick={() => {
									remove();
									onClose();
								}}
								ml={3}
								// isLoading={isLoading}
							>
								Excluir
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (session?.user) return { props: { user: session.user } };

	return {
		redirect: {
			destination: "/a/signin",
			permanent: false,
		},
	};
};
