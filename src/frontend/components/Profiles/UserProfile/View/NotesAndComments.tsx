import { Flex, FlexProps, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import ResizeTextarea from "react-textarea-autosize";

interface Props extends FlexProps {
	notesAndComments?: string;
}

function NotesAndComments({ notesAndComments, ...restProps }: Props) {
	if (!notesAndComments) return <></>
	return (
		<Flex
			direction="column"
			w="full"
			bg="white"
			rounded={"xl"}
			boxShadow={"lg"}
			p={2}
			align="center"
			{...restProps}
		>
			<Text fontSize="lg" fontWeight="bold" alignSelf="center">
				Observaçōes
			</Text>
			<Textarea
				isReadOnly
				border="none"
				value={notesAndComments || ""}
				resize="none"
				as={ResizeTextarea}
			/>
		</Flex>
	);
}

export default NotesAndComments;
