import { useMutation } from "@apollo/client";
import { ADD_LIKE_TO_PROFILE } from "@frontend/lib/apollo-client/mutations/profile/AddLikeToProfile.mutation";

interface useAddLikeToProfileProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}
function useAddLikeToProfile({
	callbackSuccess,
	callbackFail,
}: useAddLikeToProfileProps) {
	const [addLike, { loading }] = useMutation(ADD_LIKE_TO_PROFILE, {
		onCompleted: () => {
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("ADD_LIKE_TO_PROFILE", error.graphQLErrors);
			callbackFail && callbackFail();
		},
	});

	const add = async (uid: string, token: string) => {
		await addLike({
			variables: { uid },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return { add, loading };
}

export default useAddLikeToProfile;
