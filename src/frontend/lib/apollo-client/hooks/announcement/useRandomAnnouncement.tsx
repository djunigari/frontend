import { useLazyQuery } from "@apollo/client";
import { IAnnouncement } from "@core/model/Announcement/Announcement";
import { useState } from "react";
import { RANDOM_ANNOUNCEMENTS } from "../../queries/Announcement/RandomAnnouncements.query";
import { IRandomAnnouncementParams } from "../../queryParams/RandomAnnouncementParams";

function useRandomAnnouncements() {
	const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);

	const [fetch, { called, refetch, loading }] = useLazyQuery<{
		randomAnnouncements: IAnnouncement[];
	}>(RANDOM_ANNOUNCEMENTS, {
		onCompleted: (data) => {
			setAnnouncements(data.randomAnnouncements);
		},
		onError: (error) => console.log("RANDOM_ANNOUNCEMENTS", error),
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const search = (limit: number, params?: IRandomAnnouncementParams) => {
		if (called) {
			refetch({ limit, params });
		} else {
			fetch({
				variables: { limit, params },
			});
		}
	};

	const getAdsImageUrl = (index: number) => {
		if (announcements.length === 0) return "";
		if (index > announcements.length) {
			// Selecione um índice aleatório da lista de anúncios
			const randomIndex = Math.floor(
				Math.random() * announcements.length
			);
			return announcements[randomIndex].imageUrl;
		}
		return announcements[index - 1].imageUrl;
	};

	return {
		search,
		loading,
		announcements,
		getAdsImageUrl,
	};
}

export default useRandomAnnouncements;
