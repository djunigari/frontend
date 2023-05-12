import { Flex, FlexProps, Image, Spinner } from "@chakra-ui/react";
import React from "react";

interface AdsProps extends FlexProps {
	isLoading: boolean;
	imageUrl?: string;
}

function Ads({ isLoading, imageUrl, ...props }: AdsProps) {
	if (!imageUrl) return <></>;
	if (isLoading) return <Spinner />;
	return (
		<Flex
			w="full"
			align="center"
			justify="center"
			maxW="720px"
			h="100px"
			{...props}
		>
			<Image src={imageUrl} alt="Propaganda" />
		</Flex>
	);
}

export default Ads;
