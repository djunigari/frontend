import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { IPrefecture } from "@core/model/Prefecture";
import { GET_PREFECTURE_BY_PREF_CODE } from "@frontend/lib/apollo-client/queries/region/GetPrefectureByPrefCode";

interface useGetPrefectureProps {
	callbackSuccess: (value?: IPrefecture) => void;
	callbackFail?: () => void;
}

function useGetPrefecture({
	callbackSuccess,
	callbackFail,
}: useGetPrefectureProps) {
	const toast = useToast();

	const [loadPrefecture, { called, loading, refetch }] = useLazyQuery<{
		searchPrefecture: IPrefecture;
	}>(GET_PREFECTURE_BY_PREF_CODE, {
		onCompleted: (data) => callbackSuccess(data.searchPrefecture),
		onError: (error) => {
			console.error("GET_PREFECTURE_BY_PREF_CODE", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao buscar prefeitura",
				description: `${error.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetch = (prefCode: string) => {
		if (called) {
			refetch({ prefCode });
		} else {
			loadPrefecture({ variables: { prefCode } });
		}
	};

	return {
		loading,
		fetch,
	};
}

export default useGetPrefecture;
