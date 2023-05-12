import { gql } from "@apollo/client";

export const GET_PREFECTURES = gql`
	query getPrefectures {
		prefectures {
			prefCode
			name
			nameJP
		}
	}
`;
