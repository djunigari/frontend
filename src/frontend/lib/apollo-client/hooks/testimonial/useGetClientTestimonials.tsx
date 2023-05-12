import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { ITestimonial } from "@core/model/client/Testimonial";
import { IPageInfo } from "@core/model/PageInfo";
import { useState } from "react";
import { GET_CLIENT_TESTIMONIALS } from "../../queries/Testimonial/GetClientTestimonials.query";

function useGetClientTestimonials() {
	const toast = useToast();
	const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
	const [pageInfo, setPageInfo] = useState<IPageInfo>();

	const [search, { called, loading, refetch }] = useLazyQuery<{
		clientTestimonials: {
			pageInfo: IPageInfo;
			list: ITestimonial[];
		};
	}>(GET_CLIENT_TESTIMONIALS, {
		onCompleted: (data) => {
			setPageInfo(data.clientTestimonials?.pageInfo);
			setTestimonials((prev) => [
				...prev,
				...data.clientTestimonials?.list,
			]);
		},
		onError: (error) => {
			console.error("GET_CLIENT_TESTIMONIALS", error.graphQLErrors);
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

	const fetch = (userId: string, take: number = 0, skip: number = 0) => {
		if (called) {
			refetch({ userId, take, skip });
		} else {
			search({ variables: { userId, take, skip } });
		}
	};

	return {
		pageInfo,
		testimonials,
		loading,
		fetch,
	};
}

export default useGetClientTestimonials;
