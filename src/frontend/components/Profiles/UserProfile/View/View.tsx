import { Avatar, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { TypeProfile } from "@core/enums/TypeProfile.enum";
import IUserProfile from "@core/model/UserProfile";
import Ads from "@frontend/components/ads/Ads";
import useRandomAnnouncements from "@frontend/lib/apollo-client/hooks/announcement/useRandomAnnouncement";
import { useEffect } from "react";
import RandomProfiles from "../../RandomProfiles/RandomProfiles";
import Category from "./Category";
import Description from "./Description";
import GoogleMaps from "./GoogleMaps";
import NotesAndComments from "./NotesAndComments";
import ServiceInfo from "./ServiceInfo";
import SocialButtons from "./SocialMedia";
import Statistic from "./Statistic/Statistic";
import Testimonial from "./Testimonial/Testimonial";

interface ViewProps {
	userProfile: IUserProfile;
	previewImageUrl?: string;
}
function View({ previewImageUrl, userProfile }: ViewProps) {
	const {
		search,
		loading: loadingAds,
		getAdsImageUrl,
	} = useRandomAnnouncements();

	useEffect(() => {
		if (userProfile.typeProfile === TypeProfile.FREE) {
			search(2);
		}
	}, []);

	return (
		<Flex w="full" direction="column" align={"center"} justify={"center"}>
			<RandomProfiles
				title={"Veja também"}
				size={4}
				params={{ category: userProfile.category }}
			/>
			<Stack
				mt={2}
				spacing={2}
				rounded={"xl"}
				boxShadow={"lg"}
				w="full"
				p={2}
				bg="white"
				align="center"
				my={4}
			>
				<Text fontSize="2xl" fontWeight="extrabold">
					{userProfile?.displayName}
				</Text>
				<Divider />
				<Flex w="full" align="center" justify="center">
					<Flex w="60px"></Flex>
					<Avatar
						m="auto"
						size="2xl"
						src={previewImageUrl || userProfile.imageUrl}
						bg="rgba(51, 51, 51, 0)"
					/>

					<Flex w="60px" alignSelf="end">
						<Statistic
							uid={userProfile.uid as string}
							profileInfo={userProfile.profileInfo}
						/>
					</Flex>
				</Flex>
				<SocialButtons
					telephone={userProfile.telephone}
					whatsapp={userProfile.whatsapp}
					facebook={userProfile.facebook}
					instagram={userProfile.instagram}
					webSite={userProfile.webSite}
					email={userProfile.email}
					youtube={userProfile.youtube}
				/>
			</Stack>

			<NotesAndComments notesAndComments={userProfile.notesAndComments} />

			<Ads mb={2} isLoading={loadingAds} imageUrl={getAdsImageUrl(1)} />
			

			<Category
				category={userProfile.category as string}
				subCategory={userProfile.subCategory}
			/>

			<GoogleMaps address={userProfile.address} />

			<ServiceInfo
				services={userProfile.services || []}
				attendances={userProfile.attendances}
				my={2}
			/>
			<RandomProfiles title={"Veja também"} size={4} />

			<Description mt={2} description={userProfile.description} />

			<Ads mt={2} isLoading={loadingAds} imageUrl={getAdsImageUrl(2)} />
			<Testimonial
				mt={2}
				uid={userProfile.uid as string}
				typeProfile={userProfile.typeProfile || TypeProfile.FREE}
			/>
		</Flex>
	);
}

export default View;
