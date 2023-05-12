import { Flex, ListItem, OrderedList, Spinner, Text } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import { default as ProfileView } from "@frontend/components/Profiles/UserProfile/View/View";
import useGetProfile from "@frontend/lib/apollo-client/hooks/profile/useGetProfile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProfilePage() {
	const router = useRouter();
	const [profile, setProfile] = useState<IUserProfile>();
	const { fetch, loading } = useGetProfile({
		callbackSuccess: setProfile,
	});

	useEffect(() => {
		if (!router.isReady) return;
		const { profileId } = router.query;
		if (profileId) {
			fetch(profileId as string);
		}
	}, [router.isReady]);

	if (!router.isReady || loading)
		return (
			<Flex w="full" h="full" align="center" justify="center">
				<Spinner />
			</Flex>
		);

	if (!profile)
		return (
			<Flex
				direction="column"
				w="full"
				h="full"
				align="center"
				justify="center"
			>
				<Text>
					Este perfil encontra-se desativado no momento por algum dos
					motivos abaixo
				</Text>
				<OrderedList>
					<ListItem>Desativado a pedido do cliente</ListItem>
					<ListItem>Perfil não existe</ListItem>
				</OrderedList>
			</Flex>
		);

	return <ProfileView userProfile={profile} />;
}

export default ProfilePage;
