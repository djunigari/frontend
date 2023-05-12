import { useToast } from "@chakra-ui/react";
import { likesState } from "@frontend/atoms/likesAtom";
import useAddLikeToProfile from "@frontend/lib/apollo-client/hooks/profile/useAddLikeToProfile";
import useRemoveLikeToProfile from "@frontend/lib/apollo-client/hooks/profile/useRemoveLikeToProfile";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

interface useLikesOfProfileProps {
	profileUid: string;
	setTotalLike: (value: number) => void;
}

function useLikesOfProfile({
	profileUid,
	setTotalLike,
}: useLikesOfProfileProps) {
	const { data: session } = useSession();
	const token = session?.accessToken;
	const toast = useToast();

	const [profileLikes, setProfileLikes] = useRecoilState(likesState);

	const isLiked = profileLikes.includes(profileUid);

	const addProfileState = () => {
		setProfileLikes((prev) => [...prev, profileUid]);
		setTotalLike(1);
	};

	const removeProfileState = () => {
		setProfileLikes((prev) => prev.filter((i) => i !== profileUid));
		setTotalLike(-1);
	};

	const { add, loading: addLoading } = useAddLikeToProfile({
		callbackFail: removeProfileState,
	});

	const { remove, loading: removeLoading } = useRemoveLikeToProfile({
		callbackFail: addProfileState,
	});

	const loading = addLoading || removeLoading;

	const likeOrDislike = () => {
		if (!token) {
			toast({
				title: "Usuário não logado!",
				status: "warning",
				duration: 9000,
				isClosable: true,
			});
			return;
		}

		if (isLiked) {
			removeProfileState();
			remove(profileUid, token);
		} else {
			addProfileState();
			add(profileUid, token);
		}
	};

	return {
		isLiked,
		likeOrDislike,
		loading,
	};
}

export default useLikesOfProfile;
