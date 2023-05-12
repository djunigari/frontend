import { Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";

interface StatisticItemProps {
	value?: number;
	icon: IconType;
	iconFill?: IconType;
	isActived?: boolean;
	onClick?: () => void;
	isLoading?: boolean;
}

function StatisticItem({
	value,
	icon,
	iconFill,
	isActived,
	onClick,
	isLoading,
}: StatisticItemProps) {
	//https://stackoverflow.com/questions/55271855/react-material-ui-ssr-warning-prop-d-did-not-match-server-m-0-0-h-24-v-2
	const [loaded, setLoaded] = useState(false);
	useEffect(() => setLoaded(true), []);

	if (!loaded) return <Spinner size="xs" />;

	return (
		<Flex direction="column" align="center">
			<Icon
				cursor={onClick && "pointer"}
				as={isActived ? iconFill || icon : icon}
				color="gray.600"
				onClick={() => !isLoading && onClick && onClick()}
			/>
			<Text fontSize="xs" fontWeight="semibold">
				{value || 0}
			</Text>
		</Flex>
	);
}

export default StatisticItem;
