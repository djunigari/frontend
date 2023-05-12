import { VStack } from "@chakra-ui/react";
import IProfileInfo from "@core/model/profile/ProfileInfo";
import useBookmarksOfProfile from "@frontend/hooks/profile/useBookmarksOfProfile";
import useLikesOfProfile from "@frontend/hooks/profile/useLikesOfProfile";
import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import StatisticItem from "./StatisticItem";

interface StatisticProps {
	uid: string;
	profileInfo?: IProfileInfo;
}

function Statistic({ uid, profileInfo }: StatisticProps) {
	const [totalLike, setTotalLike] = useState<number>(
		profileInfo?.likes.total || 0
	);
	const [totalBookmark, setTotalBookmark] = useState<number>(
		profileInfo?.bookmarks.total || 0
	);
	const {
		isLiked,
		likeOrDislike,
		loading: likeLoading,
	} = useLikesOfProfile({
		profileUid: uid,
		setTotalLike: (value: number) =>
			setTotalLike((prev) => (prev + value > 0 ? prev + value : 0)),
	});

	const {
		isBookmarked,
		saveOrUnsave,
		loading: bookmarkLoading,
	} = useBookmarksOfProfile({
		profileUid: uid,
		setTotalBookmark: (value: number) =>
			setTotalBookmark((prev) => (prev + value > 0 ? prev + value : 0)),
	});

	return (
		<VStack w="full" direction="column" align="center">
			<StatisticItem value={profileInfo?.totalViews} icon={FaEye} />

			<StatisticItem
				value={totalLike}
				icon={AiOutlineLike}
				iconFill={AiFillLike}
				onClick={likeOrDislike}
				isLoading={likeLoading}
				isActived={isLiked}
			/>

			<StatisticItem
				value={totalBookmark}
				icon={BsBookmark}
				iconFill={BsBookmarkFill}
				onClick={saveOrUnsave}
				isLoading={bookmarkLoading}
				isActived={isBookmarked}
			/>
		</VStack>
	);
}

export default Statistic;
