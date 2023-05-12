import { IconButton } from "@chakra-ui/react";
import { BsChevronLeft } from "react-icons/bs";

interface PreviousProps {
	onClick: () => void;
}

function Previous({ onClick }: PreviousProps) {
	return (
		<IconButton
			size="xs"
			aria-label="Previous Page"
			icon={<BsChevronLeft />}
			onClick={onClick}
		/>
	);
}

export default Previous;
