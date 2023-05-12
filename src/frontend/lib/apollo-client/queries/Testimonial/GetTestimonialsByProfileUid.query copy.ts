import { gql } from "@apollo/client";

export const GET_TESTIMONIALS_BY_PROFILE_UID = gql`
	query GetTestimonialsByProfileUid(
		$profileUid: String
		$take: Float
		$skip: Float
	) {
		testimonials(profileUid: $profileUid, take: $take, skip: $skip) {
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
				userId
				content
				status
				userName
			}
		}
	}
`;
