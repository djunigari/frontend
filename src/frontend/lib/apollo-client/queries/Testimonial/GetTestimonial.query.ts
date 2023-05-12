import { gql } from "@apollo/client";

export const GET_TESTIMONIAL = gql`
	query GetTestimonial($userId: String!, $profileUid: String!) {
		testimonial(userId: $userId, profileUid: $profileUid) {
			userId
			profileUid
			content
			status
			userName
		}
	}
`;
