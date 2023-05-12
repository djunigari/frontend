import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { ITestimonial } from "@core/model/client/Testimonial";
import { profile } from "console";
import { useSession } from "next-auth/react";
import { GET_TESTIMONIAL } from "../../queries/Testimonial/GetTestimonial.query";

interface useGetMyTestimonialOfProfileProps {
	profileUid: string;
	callbackSuccess?: (testimonial: ITestimonial) => void;
	callbackFail?: () => void;
}

function useGetMyTestimonialOfProfile({
	callbackSuccess,
	callbackFail,
}: useGetMyTestimonialOfProfileProps) {
	const toast = useToast();

	const [search, { called, loading, refetch }] = useLazyQuery<{
		testimonial: ITestimonial;
	}>(GET_TESTIMONIAL, {
		onCompleted: (data) => {
			callbackSuccess && callbackSuccess(data?.testimonial);
		},
		onError: (error) => {
			console.error("GET_TESTIMONIAL", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao buscar depoimentos",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetch = (userId: string, profileUid: string) => {
		if (called) {
			refetch({ userId, profileUid });
		} else {
			search({
				variables: { userId, profileUid },
			});
		}
	};

	return {
		loading,
		fetch,
	};
}

export default useGetMyTestimonialOfProfile;
