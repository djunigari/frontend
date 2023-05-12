import { Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { bookmarksState } from "@frontend/atoms/bookmarksAtom";
import { likesState } from "@frontend/atoms/likesAtom";
import { testimonialsState } from "@frontend/atoms/testimonialsAtom";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { AiOutlineHeart, AiOutlineLike } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { FaPowerOff, FaUserCircle } from "react-icons/fa";
import { MdOutlineArticle, MdOutlineContactSupport } from "react-icons/md";
import { useSetRecoilState } from "recoil";

interface MenuOption {
	icon: IconType;
	iconColor?: string;
	onClick: () => void;
	name: string;
}

interface Props {
	onClose: () => void;
}

function UserMenuIcons({ onClose }: Props) {
	const router = useRouter();
	const { data: session } = useSession();
	const setBookmarkState = useSetRecoilState(bookmarksState);
	const setLikeState = useSetRecoilState(likesState);
	const setTestimonialState = useSetRecoilState(testimonialsState);

	const menuOptions: MenuOption[] = [
		{
			name: "Meus Favoritos",
			icon: AiOutlineHeart,
			iconColor: "red.600",
			onClick: () => router.push("/a/favoritos"),
		},
		{
			name: "Minhas Curtidas",
			icon: AiOutlineLike,
			iconColor: "blue.600",
			onClick: () => router.push("/a/curtidas"),
		},
		{
			name: "Meus Depoimentos",
			icon: MdOutlineArticle,
			iconColor: "blue.600",
			onClick: () => router.push("/a/depoimentos"),
		},
		{
			name: "Suporte",
			icon: MdOutlineContactSupport,
			iconColor: "orange.600",
			onClick: () => router.push("/r/suporte"),
		},
		{
			name: "Configuração",
			icon: BsGear,
			iconColor: "gray.600",
			onClick: () => router.push("/a/config"),
		},
		{
			name: "Logout",
			icon: FaPowerOff,
			iconColor: "red.400",
			onClick: () => {
				signOut();
				setBookmarkState([]);
				setLikeState([]);
				setTestimonialState([]);
			},
		},
	];

	return (
		<VStack align="start">
			<Flex align="center" alignSelf="center">
				<Icon as={FaUserCircle} mr={1} />
				<Text fontSize="xs" fontWeight="semibold" mr={1}>
					Bem vindo!
				</Text>
				<Text noOfLines={1} fontSize="xs" fontWeight="semibold" as="u">
					{session?.user?.name || session?.user.email?.split("@")[0]}
				</Text>
			</Flex>
			{menuOptions.map((o) => (
				<Flex
					key={o.name}
					onClick={() => {
						onClose();
						o.onClick();
					}}
					cursor="pointer"
				>
					<Icon as={o.icon} color={o.iconColor} mr={2} />
					<Text fontWeight="semibold" fontSize="sm">
						{o.name}
					</Text>
				</Flex>
			))}
		</VStack>
	);
}

export default UserMenuIcons;
