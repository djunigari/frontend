import { useToast } from "@chakra-ui/react";
import { bookmarksState } from "@frontend/atoms/bookmarksAtom";

import useAddBookmarkToProfile from "@frontend/lib/apollo-client/hooks/profile/useAddBookmarkToProfile";
import useRemoveBookmarkToProfile from "@frontend/lib/apollo-client/hooks/profile/useRemoveBookmarkToProfile";

import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

interface useBookmarksOfProfileProps {
	profileUid: string;
	setTotalBookmark: (value: number) => void;
}

function useBookmarksOfProfile({
	profileUid,
	setTotalBookmark,
}: useBookmarksOfProfileProps) {
	const { data: session } = useSession();
	const token = session?.accessToken;

	const toast = useToast();
	const [profileBookmarks, setProfileBookmarks] =
		useRecoilState(bookmarksState);

	const isBookmarked = profileBookmarks.includes(profileUid);

	const addProfileState = () => {
		setProfileBookmarks((prev) => [...prev, profileUid]);
		setTotalBookmark(1);
	};

	const removeProfileState = () => {
		setProfileBookmarks((prev) => prev.filter((i) => i !== profileUid));
		setTotalBookmark(-1);
	};

	const { add, loading: addLoading } = useAddBookmarkToProfile({
		callbackFail: removeProfileState,
	});

	const { remove, loading: removeLoading } = useRemoveBookmarkToProfile({
		callbackFail: addProfileState,
	});

	const loading = addLoading || removeLoading;

	const saveOrUnsave = () => {
		if (!token) {
			toast({
				title: "Usuário não logado!",
				status: "warning",
				duration: 9000,
				isClosable: true,
			});
			return;
		}

		if (isBookmarked) {
			removeProfileState();
			remove(profileUid, token);
		} else {
			addProfileState();
			add(profileUid, token);
		}
	};

	return {
		isBookmarked,
		saveOrUnsave,
		loading,
	};
}

export default useBookmarksOfProfile;
