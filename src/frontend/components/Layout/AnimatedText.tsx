import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
	colorScheme: string;
	children: any;
}

function AnimatedText({ colorScheme, children, ...restProps }: Props) {
	return (
		<Text
			p={2}
			w="full"
			cursor="pointer"
			borderRadius="md"
			align="center"
			fontWeight="semibold"
			color="white"
			bg={`${colorScheme}.500`}
			transition="all 0.2s ease-in-out"
			_hover={{
				bg: `${colorScheme}.600`,
			}}
			_focus={{
				boxShadow: "outline",
			}}
			_active={{
				bg: `${colorScheme}.700`,
			}}
			{...restProps}
		>
			{children}
		</Text>
	);
}

export default AnimatedText;
