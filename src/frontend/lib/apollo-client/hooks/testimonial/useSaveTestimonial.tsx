import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { SAVE_TESTIMONIAL } from "../../mutations/Testimonial/SaveTestimonial.mutation";

interface useSaveTestimonialProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}
function useSaveTestimonial({
	callbackSuccess,
	callbackFail,
}: useSaveTestimonialProps) {
	const { data: session } = useSession();
	const toast = useToast();
	const [saveTestimonial, { loading }] = useMutation(SAVE_TESTIMONIAL, {
		onCompleted: () => {
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("SAVE_TESTIMONIAL", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao buscar depoimentos",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const save = (profileUid: string, content: string) => {
		saveTestimonial({
			variables: { profileUid, content },
			context: {
				headers: {
					authorization: `Bearer ${session?.accessToken}`,
				},
			},
		});
	};

	return { save, loading };
}

export default useSaveTestimonial;
