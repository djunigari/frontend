import { Grid, GridItem, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { IProfileResume } from "@core/model/client/ProfileResume";
import Paginator from "@frontend/components/Layout/Paginator/Paginator";
import usePaginator from "@frontend/hooks/utils/usePaginator";
import { useEffect, useState } from "react";
import ProfileShortCard from "../ProfileShortCard";
import ProfileResumeFilter from "./ProfileResumeFilter";

interface ProfileResumesProps {
	profiles: IProfileResume[];
}

function ProfileResumes({ profiles }: ProfileResumesProps) {
	const [listAfterFilter, setListAfterFilter] = useState<IProfileResume[]>(
		[]
	);
	const take = 10;
	const {
		pagesQuantity,
		currentPage,
		setCurrentPage,
		setTotal,
		getSliceOfList,
	} = usePaginator({ take });

	useEffect(() => {
		setCurrentPage(1);
		setTotal(profiles.length || 0);
		setListAfterFilter(profiles);
	}, [profiles]);

	return (
		<VStack direction="column" w="full">
			<HStack w="full">
				<Text
					fontSize="xs"
					fontWeight="semibold"
					borderRadius="md"
					p={1}
					bg="white"
					alignSelf="start"
					w="auto"
				>
					Total: ({profiles?.length || 0})
				</Text>
				<Spacer />
				<Paginator
					pagesQuantity={pagesQuantity}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</HStack>
			<ProfileResumeFilter
				profiles={profiles}
				setProfiles={setListAfterFilter}
			/>

			<Grid
				mt={2}
				w="full"
				templateColumns={{
					base: "repeat(4, 1fr)",
					sm: "repeat(8, 1fr)",
				}}
			>
				{getSliceOfList(listAfterFilter).map(
					({ uid, displayName, imageUrl }) => (
						<GridItem key={uid}>
							<ProfileShortCard
								uid={uid}
								displayName={displayName}
								imageUrl={imageUrl}
							/>
						</GridItem>
					)
				)}
			</Grid>
		</VStack>
	);
}

export default ProfileResumes;
