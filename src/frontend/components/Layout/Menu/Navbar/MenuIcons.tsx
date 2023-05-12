import { Divider, Flex, Icon, Link, Text, VStack } from "@chakra-ui/react";
import Login from "@frontend/components/auth/Login";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineContactSupport, MdOutlinePersonSearch } from "react-icons/md";

interface MenuOption {
	icon: IconType;
	iconColor?: string;
	onClick: () => void;
	name: string;
}

interface Props {
	onClose: () => void;
}

function MenuIcons({ onClose }: Props) {
	const router = useRouter();

	const menuOptions: MenuOption[] = [
		{
			name: "Página inicial",
			icon: FaHome,
			iconColor: "gray.600",
			onClick: () => {
				onClose();
				router.push("/");
			},
		},
		{
			name: "Suporte",
			icon: MdOutlineContactSupport,
			iconColor: "red.600",
			onClick: () => {
				onClose();
				router.push("/r/suporte");
			},
		},
	];

	return (
		<VStack align="start">
			{menuOptions.map((o) => (
				<Flex key={o.name} onClick={o.onClick} cursor="pointer">
					<Icon as={o.icon} color={o.iconColor} mr={2} />
					<Text fontWeight="semibold" fontSize="sm">
						{o.name}
					</Text>
				</Flex>
			))}
			<Divider />
			<Text fontWeight="semibold" fontSize="md">
				Login/Cadastro
			</Text>
			<Flex
				onClick={() => {
					onClose();
					router.push("/a/signin");
				}}
				cursor="pointer"
				direction="column"
				w="full"
				p={4}
				borderRadius="sm"
				border="1px solid"
				borderColor="blue.50"
				shadow="md"
				_hover={{
					borderColor: "blue.100",
					bg: "gray.50",
				}}
				_active={{
					borderColor: "blue.100",
				}}
			>
				<Flex>
					<Icon
						as={MdOutlinePersonSearch}
						boxSize={6}
						borderRadius="full"
						bg="blue.50"
						color="blue.700"
					/>
					<Text color="blue.700" fontSize="xs" fontWeight="semibold">
						(Cliente)
					</Text>
				</Flex>
				<Text
					mt={2}
					color="blue.300"
					fontWeight="semibold"
					fontSize="xs"
				>
					Estou buscando profissionais e empresas.
				</Text>
			</Flex>

			<Link
				w="full"
				href="https://empresa.catalogojapao.com/a/signin"
				_hover={{ textDecoration: "none" }}
				isExternal
			>
				<Flex
					cursor="pointer"
					direction="column"
					w="full"
					p={4}
					borderRadius="sm"
					border="1px solid"
					borderColor="blue.50"
					shadow="md"
					_hover={{
						borderColor: "blue.100",
						bg: "gray.50",
					}}
					_active={{
						borderColor: "blue.100",
					}}
				>
					<Flex>
						<Icon
							as={IoStorefrontOutline}
							boxSize={6}
							borderRadius="full"
							bg="blue.50"
							color="blue.700"
						/>
						<Text
							color="blue.700"
							fontSize="xs"
							fontWeight="semibold"
						>
							(Profissional/Empresa)
						</Text>
					</Flex>

					<Text
						mt={2}
						color="blue.300"
						fontWeight="semibold"
						fontSize="xs"
					>
						Quero adicionar meus contatos e serviços que ofereço.
					</Text>
				</Flex>
			</Link>
		</VStack>
	);
}

export default MenuIcons;
