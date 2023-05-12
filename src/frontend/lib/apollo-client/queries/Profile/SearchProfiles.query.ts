import { gql } from "@apollo/client";

export const SEARCH_PROFILES = gql`
	query searchProfiles(
		$isAdmin: Boolean
		$ip: String
		$params: ParamsProfileFilterInput
		$take: Float
		$skip: Float
	) {
		searchProfiles(
			take: $take
			skip: $skip
			params: $params
			ip: $ip
			isAdmin: $isAdmin
		) {
			pageInfo {
				totalCount
				startCursor
				endCursor
				take
				skip
				hasNextPage
				hasPreviousPage
			}
			list {
				uid
				imageUrl
				displayName
				profileInfo {
					totalViews
					likes {
						total
					}
					bookmarks {
						total
					}
				}
			}
		}
	}
`;
