import { Box, Image } from "@chakra-ui/react";
import React from "react";

interface MobileMenuAdsProps {
	imageUrl?: string;
}

function MobileMenuAds({ imageUrl }: MobileMenuAdsProps) {
	return (
		<Box w="200px" h="30px">
			<Image src={imageUrl} alt="Propaganda" />
		</Box>
	);
}

export default MobileMenuAds;
