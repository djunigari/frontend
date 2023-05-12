import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

interface ProfileShortCardProps {
	uid: string;
	displayName?: string;
	imageUrl?: string;
}

function ProfileShortCard({
	uid,
	displayName,
	imageUrl,
}: ProfileShortCardProps) {
	return (
		<Link href={`/p/${uid}`} _hover={{ textDecoration: "none" }}>
			<Flex direction="column" align="center">
				<Avatar
					alignSelf="center"
					size={{ base: "sm", md: "md" }}
					src={imageUrl as string}
					mr={2}
					bg="rgba(51, 51, 51, 0)"
				/>

				<Text
					fontSize={{ base: "x-small", md: "sm" }}
					fontWeight="extrabold"
					noOfLines={1}
				>
					{displayName}
				</Text>
			</Flex>
		</Link>
	);
}

export default ProfileShortCard;
