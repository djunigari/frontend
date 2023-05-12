import { useMutation } from "@apollo/client";
import { REMOVE_BOOKMARK_TO_PROFILE } from "../../mutations/profile/RemoveBookmarkToProfile.mutation";

interface useRemoveBookmarkToProfileProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}
function useRemoveBookmarkToProfile({
	callbackSuccess,
	callbackFail,
}: useRemoveBookmarkToProfileProps) {
	const [removeBookmark, { loading }] = useMutation(
		REMOVE_BOOKMARK_TO_PROFILE,
		{
			onCompleted: () => {
				callbackSuccess && callbackSuccess();
			},
			onError: (error) => {
				console.error(
					"REMOVE_BOOKMARK_TO_PROFILE",
					error.graphQLErrors
				);
				callbackFail && callbackFail();
			},
		}
	);

	const remove = async (uid: string, token: string) => {
		await removeBookmark({
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

export default useRemoveBookmarkToProfile;
