import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { DELETE_TESTIMONIAL } from "../../mutations/Testimonial/DeleteTestimonial.mutation";

interface useRemoveTestimonialProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useRemoveTestimonial({
	callbackSuccess,
	callbackFail,
}: useRemoveTestimonialProps) {
	const { data: session } = useSession();
	const toast = useToast();
	const [removeTestimonial, { loading }] = useMutation(DELETE_TESTIMONIAL, {
		onCompleted: () => {
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("DELETE_TESTIMONIAL", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao excluir depoimento",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const remove = (profileUid: string) => {
		removeTestimonial({
			variables: { profileUid },
			context: {
				headers: {
					authorization: `Bearer ${session?.accessToken}`,
				},
			},
		});
	};
	return { remove, loading };
}

export default useRemoveTestimonial;
