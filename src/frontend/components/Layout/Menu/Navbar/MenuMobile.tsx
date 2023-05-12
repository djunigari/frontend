import { useSession } from "next-auth/react";
import React from "react";
import MenuIcons from "./MenuIcons";
import UserMenuIcons from "./UserMenuIcons";

interface Props {
	onClose: () => void;
}

function MenuMobile({ onClose }: Props) {
	const { data: session } = useSession();

	if (!session?.user) return <MenuIcons onClose={onClose} />;

	return <UserMenuIcons onClose={onClose} />;
}

export default MenuMobile;
