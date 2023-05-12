import { gql } from "@apollo/client";

export const RANDOM_PROFILES = gql`
	query randomProfiles(
		$limit: Float
		$params: ParamsRandomProfileFilterInput
	) {
		randomProfiles(limit: $limit, params: $params) {
			uid
			imageUrl
			displayName
		}
	}
`;
