import { Box, Flex, Hide, Show } from "@chakra-ui/react";
import MobileMenuAds from "@frontend/components/ads/MobileMenuAds";
import { User } from "next-auth";

interface FooterbarProps {
	user?: User;
}

function Footerbar({ user }: FooterbarProps) {
	return (
		<Show breakpoint="(max-width: 767px)">
			<Box
				display="block"
				w="full"
				h="60px"
				left={0}
				bottom={0}
				px={2}
				bg="gray.100"
			/>
			<Flex
				position="fixed"
				zIndex={200}
				left={0}
				bottom={0}
				bg="gray.300"
				w="full"
				justify="space-between"
				align="center"
				h="60px"
				px={2}
			>
				{/* <MobileMenuAds /> */}
			</Flex>
		</Show>
	);
}

export default Footerbar;
