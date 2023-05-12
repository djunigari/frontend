import { useLazyQuery } from "@apollo/client";
import { IPageInfo } from "@core/model/PageInfo";
import IUserProfile from "@core/model/UserProfile";
import useUserIP from "@frontend/hooks/utils/useUserIP";
import { SEARCH_PROFILES } from "@frontend/lib/apollo-client/queries/Profile/SearchProfiles.query";
import { ISearchUserProfileParams } from "@frontend/lib/apollo-client/queryParams/SearchUserProfileParams";
import { useState } from "react";

interface useSearchProfilesProps {
	params: ISearchUserProfileParams;
	take?: number;
}

function useSearchProfiles({ params, take = 10 }: useSearchProfilesProps) {
	const [pageInfo, setPageInfo] = useState<IPageInfo>();
	const [resultList, setResultList] = useState<IUserProfile[]>([]);
	const { getIp } = useUserIP();

	const [loadSearchUserProfiles, { called, refetch, loading }] =
		useLazyQuery<{
			searchProfiles: {
				pageInfo: IPageInfo;
				list: IUserProfile[];
			};
		}>(SEARCH_PROFILES, {
			onCompleted: (data) => {
				setPageInfo(data.searchProfiles?.pageInfo);
				setResultList(data.searchProfiles?.list);
			},
			onError: (error) => error,
			fetchPolicy: "network-only",
			notifyOnNetworkStatusChange: true,
		});

	const search = async (current: number = 0) => {
		let skip = 0;
		if (current > 0) skip = current * take;

		const ip = await getIp();

		setResultList([]);
		if (called) {
			refetch({ take, skip, params, ip });
		} else {
			loadSearchUserProfiles({
				variables: { take, skip, params, ip },
			});
		}
	};

	return {
		search,
		loading,
		resultList,
		pageInfo,
	};
}

export default useSearchProfiles;
