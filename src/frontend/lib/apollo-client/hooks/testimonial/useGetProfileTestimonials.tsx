import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { ITestimonial } from "@core/model/client/Testimonial";
import { IPageInfo } from "@core/model/PageInfo";
import { useState } from "react";
import { GET_TESTIMONIALS_BY_PROFILE_UID } from "../../queries/Testimonial/GetTestimonialsByProfileUid.query copy";

function useGetProfileTestimonials() {
	const toast = useToast();
	const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
	const [pageInfo, setPageInfo] = useState<IPageInfo>();

	const [search, { called, loading, refetch }] = useLazyQuery<{
		testimonials: {
			pageInfo: IPageInfo;
			list: ITestimonial[];
		};
	}>(GET_TESTIMONIALS_BY_PROFILE_UID, {
		onCompleted: (data) => {
			setPageInfo(data.testimonials?.pageInfo);
			setTestimonials((prev) => [...prev, ...data.testimonials?.list]);
		},
		onError: (error) => {
			console.error(
				"GET_TESTIMONIALS_BY_PROFILE_UID",
				error.graphQLErrors
			);
			toast({
				title: "Ocorreu um erro ao buscar depoimentos",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetch = (profileUid: string, take: number = 0, skip: number = 0) => {
		if (called) {
			refetch({ profileUid, take, skip });
		} else {
			search({ variables: { profileUid, take, skip } });
		}
	};

	return {
		pageInfo,
		testimonials,
		loading,
		fetch,
	};
}

export default useGetProfileTestimonials;
