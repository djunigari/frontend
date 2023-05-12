import { gql } from "@apollo/client";

export const GET_CITY_BY_ADM_AREA_CODE = gql`
	query searchCity($admAreaCode: String!) {
		searchCity(admAreaCode: $admAreaCode) {
			prefCode
			name
			nameJP
		}
	}
`;
