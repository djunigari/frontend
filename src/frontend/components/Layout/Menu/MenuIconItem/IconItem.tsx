import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface IconItemProps {
	icon: IconType;
	iconColor?: string;
	onClick: () => void;
}

function IconItem({ icon, iconColor, onClick }: IconItemProps) {
	return (
		<Flex
			padding={1}
			color={iconColor}
			cursor="pointer"
			borderRadius="md"
			_hover={{ bg: "gray.200" }}
			onClick={onClick}
		>
			<Icon as={icon} />
		</Flex>
	);
}

export default IconItem;
