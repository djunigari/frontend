import { Icon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import { FaMapSigns } from "react-icons/fa";
import { GiCat } from "react-icons/gi";

interface CategoryProps {
	category: string;
	subCategory?: string;
}

function Category({ category, subCategory }: CategoryProps) {
	return (
		<Flex
			boxShadow={"lg"}
			rounded={"xl"}
			w="full"
			bg="white"
			align="center"
			justify="center"
			mt={2}
		>
			<Icon as={FaMapSigns} mr={2} />
			<Text fontWeight="bold">{`${category} - ${subCategory}`}</Text>
		</Flex>
	);
}

export default Category;
