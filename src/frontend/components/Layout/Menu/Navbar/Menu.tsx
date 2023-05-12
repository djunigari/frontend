import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	Show,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import MenuMobile from "./MenuMobile";

function Menu() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button colorScheme="gray" onClick={onOpen}>
				<Icon boxSize={8} as={MdMenu} />
				<Show breakpoint="(min-width: 400px)">
					<Text mx={2}>Menu</Text>
				</Show>
			</Button>

			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">
						Catálogo Japão
					</DrawerHeader>
					<DrawerBody>
						<MenuMobile onClose={onClose} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Menu;
