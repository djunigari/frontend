import {
	useDisclosure,
	Flex,
	Button,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
} from "@chakra-ui/react";
import React, { useRef } from "react";

interface EditButtonsProps {
	edit: () => void;
	remove: () => void;
	isLoading: boolean;
}

function EditButtons({ edit, remove, isLoading }: EditButtonsProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const deleteRef = useRef<HTMLButtonElement>(null);
	return (
		<>
			<Flex mt={2}>
				<Button size="xs" mr={2} onClick={edit}>
					Editar
				</Button>
				<Button
					size="xs"
					colorScheme="red"
					onClick={onOpen}
					isLoading={isLoading}
				>
					Excluir
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
							Confirmar exclusão do depoimento
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
								isLoading={isLoading}
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

export default EditButtons;
