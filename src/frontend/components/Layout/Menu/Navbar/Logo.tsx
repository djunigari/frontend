import { HStack, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaDog } from "react-icons/fa";
import { GiDogBowl } from "react-icons/gi";

function Logo() {
	const router = useRouter();
	return (
		<HStack
			spacing={1}
			cursor="pointer"
			onClick={() => router.push("/")}
			color="gray"
			justify="center"
		>
			<Icon as={FaDog} />
			<Text
				fontSize={{ base: "md", md: "lg" }}
				fontWeight="bold"
				fontFamily="cursive"
			>
				Catálogo
			</Text>
			<Text
				fontSize={{ base: "md", md: "lg" }}
				fontWeight="bold"
				fontFamily="cursive"
				color="red.600"
			>
				Japão
			</Text>

			<Icon as={GiDogBowl} />
		</HStack>
	);
}

export default Logo;
