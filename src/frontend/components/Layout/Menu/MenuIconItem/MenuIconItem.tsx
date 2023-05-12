import { Flex, Icon, Tooltip } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import IconItem from "./IconItem";

interface MenuIconItemProps {
	tooltipLabel?: string;
	icon: IconType;
	iconColor?: string;
	onClick: () => void;
}

function MenuIconItem({
	tooltipLabel,
	icon,
	iconColor,
	onClick,
}: MenuIconItemProps) {
	return (
		<>
			{tooltipLabel ? (
				<Tooltip
					hasArrow
					label={tooltipLabel}
					bg="gray"
					color="gray.200"
				>
					<div>
						<IconItem
							icon={icon}
							iconColor={iconColor}
							onClick={onClick}
						/>
					</div>
				</Tooltip>
			) : (
				<IconItem icon={icon} iconColor={iconColor} onClick={onClick} />
			)}
		</>
	);
}

export default MenuIconItem;
