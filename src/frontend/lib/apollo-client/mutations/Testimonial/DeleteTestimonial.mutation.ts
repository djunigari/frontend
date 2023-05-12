import gql from "graphql-tag";

export const DELETE_TESTIMONIAL = gql`
	mutation removeTestimonial($profileUid: String!) {
		removeTestimonial(profileUid: $profileUid)
	}
`;
