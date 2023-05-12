import { Avatar, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import { useRouter } from "next/router";
import { AiFillLike } from "react-icons/ai";

interface ProfileItemProps {
	profile: IUserProfile;
}

function ProfileItem({ profile }: ProfileItemProps) {
	const router = useRouter();
	return (
		<Flex
			w="full"
			onClick={() => router.push(`/p/${profile.uid}`)}
			_hover={{ bg: "gray.300" }}
			cursor="pointer"
			align="center"
		>
			<Avatar
				alignSelf="center"
				size={{ base: "sm", md: "md" }}
				src={profile.imageUrl as string}
				mr={2}
				bg="rgba(51, 51, 51, 0)"
			/>

			<Flex direction="column">
				<Text
					fontSize={{ base: "x-small", md: "sm" }}
					fontWeight="extrabold"
				>
					{profile.displayName}
				</Text>
				<Flex>
					<Text fontSize={{ base: "xx-small", md: "xs" }}>
						Curtidas: {profile.profileInfo?.likes.total || 0}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default ProfileItem;
