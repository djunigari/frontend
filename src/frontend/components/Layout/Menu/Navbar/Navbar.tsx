import { Flex, Spacer } from "@chakra-ui/react";
import Logo from "./Logo";
import Menu from "./Menu";

function Navbar() {
	return (
		<Flex bg="gray.300" position="static" py={2} px={8}>
			<Logo />
			<Spacer />
			<Menu />
		</Flex>
	);
}

export default Navbar;
