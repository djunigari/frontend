import {
	Button,
	Flex,
	FlexProps,
	Grid,
	GridItem,
	Text,
} from "@chakra-ui/react";
import { TypeProfile } from "@core/enums/TypeProfile.enum";
import { testimonialsState } from "@frontend/atoms/testimonialsAtom";
import useGetProfileTestimonials from "@frontend/lib/apollo-client/hooks/testimonial/useGetProfileTestimonials";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import NewTestimonial from "./NewTestimonial";
import TestimonialItem from "./TestimonialItem";
import UpdateTestimonial from "./Update/UpdateTestimonial";

interface TestimonialProps extends FlexProps {
	uid: string;
	typeProfile: TypeProfile;
}

function Testimonial({ uid, typeProfile, ...restProps }: TestimonialProps) {
	const {
		testimonials,
		pageInfo,
		fetch,
		loading: loadingFetch,
	} = useGetProfileTestimonials();
	const [hasTestimonial, setHasTestimonial] = useState<boolean>(false);

	const profileUids = useRecoilValue(testimonialsState);

	useEffect(() => {
		setHasTestimonial(profileUids.includes(uid));
	}, []);

	useEffect(() => {
		fetch(uid, 1);
	}, []);

	const moreTestimonials = () => {
		fetch(uid, 1, pageInfo?.endCursor);
	};

	if(testimonials.length <= 0) return <></>
	return (
		<Flex direction="column" align="center" w="full" p={2} {...restProps}>
			<Text fontSize="lg" fontWeight="bold">
				Depoimentos
			</Text>
			<Grid
				mt={2}
				w="full"
				templateColumns={{
					base: "repeat(1, 1fr)",
					sm: "repeat(2, 1fr)",
				}}
				gap={2}
			>
				{testimonials?.map((t, i) => (
					<GridItem key={i} mt={2}>
						<TestimonialItem key={i} testimonial={t} />
					</GridItem>
				))}
			</Grid>

			<Text
				mt={2}
				fontSize="x-small"
				alignSelf="end"
			>{`Total de depoimento: ${pageInfo?.totalCount || 0}`}</Text>
			{pageInfo && pageInfo.hasNextPage && (
				<Button
					mt={2}
					bg="gray.300"
					_hover={{ bg: "gray.300" }}
					size="xs"
					onClick={moreTestimonials}
					isLoading={loadingFetch}
				>
					Ver mais
				</Button>
			)}
			{hasTestimonial ? (
				<UpdateTestimonial profileUid={uid} typeProfile={typeProfile} />
			) : (
				<NewTestimonial profileUid={uid} />
			)}
		</Flex>
	);
}

export default Testimonial;
