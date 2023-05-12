import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { IPrefecture } from "@core/model/Prefecture";
import { GET_PREFECTURES } from "@frontend/lib/apollo-client/queries/region/GetPrefectures";

interface useGetPrefecturesProps {
	callbackSuccess: (value: IPrefecture[]) => void;
	callbackFail?: () => void;
}

function useGetPrefectures({
	callbackSuccess,
	callbackFail,
}: useGetPrefecturesProps) {
	const toast = useToast();

	const [loadPrefectures, { called, loading, refetch }] = useLazyQuery<{
		prefectures: IPrefecture[];
	}>(GET_PREFECTURES, {
		onCompleted: (data) => callbackSuccess(data.prefectures),
		onError: (error) => {
			console.error("GET_PREFECTURES", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao buscar prefeituras",
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

	const fetch = () => {
		if (called) {
			refetch();
		} else {
			loadPrefectures();
		}
	};

	return {
		loading,
		fetch,
	};
}

export default useGetPrefectures;
