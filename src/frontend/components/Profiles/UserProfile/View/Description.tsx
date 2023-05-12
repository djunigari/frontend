import { Flex, FlexProps, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import ResizeTextarea from "react-textarea-autosize";

interface Props extends FlexProps {
	description?: string;
}

function Description({ description, ...restProps }: Props) {
	if(!description) return <></>
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
				Descrição
			</Text>
			<Textarea
				isReadOnly
				border="none"
				value={description || ""}
				resize="none"
				as={ResizeTextarea}
			/>
		</Flex>
	);
}

export default Description;
