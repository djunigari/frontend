import { Button } from "@chakra-ui/react";
import React from "react";

interface PageItemProps {
	isActived: boolean;
	num: number;
	setStep: (value: number) => void;
}

function PageItem({ isActived, num, setStep }: PageItemProps) {
	return (
		<Button
			size="xs"
			isActive={isActived}
			_active={{
				bg: "#dddfe2",
				transform: "scale(0.98)",
				borderColor: "#bec3c9",
			}}
			onClick={() => setStep(num)}
		>
			{num}
		</Button>
	);
}

export default PageItem;
