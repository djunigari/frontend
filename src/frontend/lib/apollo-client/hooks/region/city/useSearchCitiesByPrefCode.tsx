import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { ICity } from "@core/model/City";
import { GET_CITIES_BY_PREFCODE } from "@frontend/lib/apollo-client/queries/region/GetCitiesByPrefCode";

interface useSearchCitiesByPrefCodeProps {
	callbackSuccess: (value: ICity[]) => void;
	callbackFail?: () => void;
}

function useSearchCitiesByPrefCode({
	callbackSuccess,
	callbackFail,
}: useSearchCitiesByPrefCodeProps) {
	const toast = useToast();

	const [loadCities, { called, loading, refetch }] = useLazyQuery<{
		citiesFromPrefecture: ICity[];
	}>(GET_CITIES_BY_PREFCODE, {
		onCompleted: (data) => callbackSuccess(data.citiesFromPrefecture),
		onError: (error) => {
			console.error("GET_CITIES_BY_PREFCODE", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao buscar cidades",
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
			loadCities({ variables: { prefCode } });
		}
	};

	return {
		loading,
		fetch,
	};
}

export default useSearchCitiesByPrefCode;
