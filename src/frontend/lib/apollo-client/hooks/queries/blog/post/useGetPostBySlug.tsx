import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { IPost } from "@core/model/blog/Post";
import { GET_POST_BY_SLUG } from "@frontend/lib/apollo-client/queries/blog/post/GetPostBySlug.query";

interface useGetPostBySlugProps {
	callbackSuccess?: (post: IPost) => void;
	callbackFail?: () => void;
}
function useGetPostBySlug({
	callbackSuccess,
	callbackFail,
}: useGetPostBySlugProps) {
	const toast = useToast();

	const [search, { called, loading, refetch }] = useLazyQuery<{
		post: IPost;
	}>(GET_POST_BY_SLUG, {
		onCompleted: (data) => {
			callbackSuccess && callbackSuccess(data?.post);
		},
		onError: (error) => {
			console.error("GET_POST_BY_SLUG", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao buscar post",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetch = (slug: string) => {
		if (called) {
			refetch({ slug });
		} else {
			search({
				variables: { slug },
			});
		}
	};

	return {
		loading,
		fetch,
	};
}

export default useGetPostBySlug;
