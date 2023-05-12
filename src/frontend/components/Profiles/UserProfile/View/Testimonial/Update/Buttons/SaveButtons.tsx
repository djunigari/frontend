import { Flex, Button } from "@chakra-ui/react";
import React from "react";

interface SaveButtonsProps {
	isLoading: boolean;
	save: () => void;
	cancel: () => void;
}
function SaveButtons({ isLoading, save, cancel }: SaveButtonsProps) {
	return (
		<Flex mt={2}>
			<Button
				size="xs"
				mr={2}
				onClick={save}
				isLoading={isLoading}
				colorScheme="blue"
			>
				Salvar
			</Button>
			<Button size="xs" onClick={cancel} colorScheme="red">
				Cancelar
			</Button>
		</Flex>
	);
}

export default SaveButtons;
