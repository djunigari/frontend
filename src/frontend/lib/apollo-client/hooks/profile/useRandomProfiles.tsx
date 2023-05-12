import { useLazyQuery } from "@apollo/client";
import IUserProfile from "@core/model/UserProfile";
import { RANDOM_PROFILES } from "@frontend/lib/apollo-client/queries/Profile/RandomProfiles.query";
import { IRandomProfileParams } from "@frontend/lib/apollo-client/queryParams/RandomProfileParams";
import { useState } from "react";

function useRandomProfiles() {
	const [profiles, setProfiles] = useState<IUserProfile[]>([]);
	const [loading, setLoading] = useState(false);

	const [loadProfiles, { called, refetch }] = useLazyQuery<{
		randomProfiles: IUserProfile[];
	}>(RANDOM_PROFILES, {
		onCompleted: (data) => {
			setProfiles(data.randomProfiles);
		},
		onError: (error) => console.log("RANDOM_PROFILES", error),
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const search = (limit?: number, params?: IRandomProfileParams) => {
		if (called) {
			setLoading(true);
			refetch({ limit, params });
		} else {
			setLoading(true);
			loadProfiles({
				variables: { limit, params },
			});
		}
	};

	return {
		search,
		loading,
		profiles,
	};
}

export default useRandomProfiles;
