import { useMutation } from "@apollo/client";
import { ADD_BOOKMARK_TO_PROFILE } from "../../mutations/profile/AddBookmarkToProfile.mutation";

interface useAddBookmarkToProfileProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}
function useAddBookmarkToProfile({
	callbackSuccess,
	callbackFail,
}: useAddBookmarkToProfileProps) {
	const [addBookmark, { loading }] = useMutation(ADD_BOOKMARK_TO_PROFILE, {
		onCompleted: () => {
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("ADD_BOOKMARK_TO_PROFILE", error.graphQLErrors);
			callbackFail && callbackFail();
		},
	});

	const add = async (uid: string, token: string) => {
		await addBookmark({
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

export default useAddBookmarkToProfile;
