import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import { GET_PROFILE } from "../../queries/Profile/GetProfile.query";

interface useGetProfileProps {
	callbackSuccess?: (profile: IUserProfile) => void;
	callbackFail?: () => void;
}

function useGetProfile({ callbackSuccess, callbackFail }: useGetProfileProps) {
	const toast = useToast();

	const [search, { called, loading, refetch }] = useLazyQuery<{
		profile: IUserProfile;
	}>(GET_PROFILE, {
		onCompleted: (data) => {
			callbackSuccess && callbackSuccess(data?.profile);
		},
		onError: (error) => {
			console.error("GET_PROFILE", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao buscar perfil",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetch = (uid: string) => {
		if (called) {
			refetch({ uid });
		} else {
			search({
				variables: { uid },
			});
		}
	};

	return {
		loading,
		fetch,
	};
}

export default useGetProfile;
