import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { ICity } from "@core/model/City";
import { GET_CITY_BY_ADM_AREA_CODE } from "@frontend/lib/apollo-client/queries/region/GetCityByAdmAreaCode";

interface useSearchCityByAdmAreaCodeProps {
	callbackSuccess: (value?: ICity) => void;
	callbackFail?: () => void;
}

function useSearchCityByAdmAreaCode({
	callbackSuccess,
	callbackFail,
}: useSearchCityByAdmAreaCodeProps) {
	const toast = useToast();

	const [searchCity, { called, loading, refetch }] = useLazyQuery<{
		searchCity: ICity;
	}>(GET_CITY_BY_ADM_AREA_CODE, {
		onCompleted: (data) => callbackSuccess(data.searchCity),
		onError: (error) => {
			console.error("GET_CITY_BY_ADM_AREA_CODE", error.graphQLErrors);
			toast({
				title: "Ocorreu um erro ao buscar cidade",
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

	const fetch = (admAreaCode: string) => {
		if (called) {
			refetch({ admAreaCode });
		} else {
			searchCity({ variables: { admAreaCode } });
		}
	};

	return {
		loading,
		fetch,
	};
}

export default useSearchCityByAdmAreaCode;
