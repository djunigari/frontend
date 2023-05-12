import { IconButton } from "@chakra-ui/react";
import { BsChevronRight } from "react-icons/bs";

interface NextProps {
	onClick: () => void;
}

function Next({ onClick }: NextProps) {
	return (
		<IconButton
			size="xs"
			aria-label="Next Page"
			icon={<BsChevronRight />}
			onClick={onClick}
		/>
	);
}

export default Next;
