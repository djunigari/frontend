import { gql } from "@apollo/client";

export const GET_CLIENT_TESTIMONIALS = gql`
	query GetClientTestimonials($take: Float, $skip: Float){
		clientTestimonials(take: $take, skip: $skip)
			userId
			profileUid
			content
			status
			createdAt
			updatedAt
			userImageUrl
			userName
		}
	}
`;
