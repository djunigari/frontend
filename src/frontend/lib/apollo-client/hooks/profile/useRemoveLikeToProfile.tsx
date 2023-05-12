import { useMutation } from "@apollo/client";
import { REMOVE_LIKE_TO_PROFILE } from "@frontend/lib/apollo-client/mutations/profile/RemoveLikeToProfile.mutation";

interface useRemoveLikeToProfileProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}
function useRemoveLikeToProfile({
	callbackSuccess,
	callbackFail,
}: useRemoveLikeToProfileProps) {
	const [removeLike, { loading }] = useMutation(REMOVE_LIKE_TO_PROFILE, {
		onCompleted: () => {
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("REMOVE_LIKE_TO_PROFILE", error.graphQLErrors);
			callbackFail && callbackFail();
		},
	});

	const remove = async (uid: string, token: string) => {
		await removeLike({
			variables: { uid },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return { remove, loading };
}

export default useRemoveLikeToProfile;
