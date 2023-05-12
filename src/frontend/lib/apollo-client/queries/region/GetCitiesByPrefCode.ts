import { gql } from "@apollo/client";

export const GET_CITIES_BY_PREFCODE = gql`
	query citiesFromPrefecture($prefCode: String!) {
		citiesFromPrefecture(prefCode: $prefCode) {
			admAreaCode
			prefCode
			name
			nameJP
		}
	}
`;
