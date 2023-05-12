import { gql } from "@apollo/client";

export const GET_PREFECTURE_BY_PREF_CODE = gql`
	query searchPrefecture($prefCode: String!) {
		searchPrefecture(prefCode: $prefCode) {
			prefCode
			name
			nameJP
		}
	}
`;
