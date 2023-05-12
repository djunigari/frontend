import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import useRandomProfiles from "@frontend/lib/apollo-client/hooks/profile/useRandomProfiles";
import { IRandomProfileParams } from "@frontend/lib/apollo-client/queryParams/RandomProfileParams";
import { useEffect } from "react";
import ProfileShortCard from "../ProfileShortCard";

interface RandomProfilesProps {
	title: string;
	size?: number;
	params?: IRandomProfileParams;
}

function RandomProfiles({ title, size, params }: RandomProfilesProps) {
	const { profiles, search } = useRandomProfiles();

	useEffect(() => {
		search(size, params);
	}, []);

	return (
		<Flex direction="column" w="full" align="center">
			<Text mb={2} fontWeight="bold">
				{title}
			</Text>
			<Grid
				templateColumns={{
					base: "repeat(6, 1fr)",
					// sm: "repeat(8, 1fr)",
				}}
			>
				{profiles?.map(({ uid, displayName, imageUrl }) => (
					<GridItem key={uid}>
						<ProfileShortCard
							uid={uid as string}
							displayName={displayName}
							imageUrl={imageUrl}
						/>
					</GridItem>
				))}
			</Grid>
		</Flex>
	);
}

export default RandomProfiles;
