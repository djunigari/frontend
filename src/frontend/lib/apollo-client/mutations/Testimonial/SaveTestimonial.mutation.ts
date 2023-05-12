import { gql } from "@apollo/client";

export const SAVE_TESTIMONIAL = gql`
	mutation saveTestimonial($profileUid: String!, $content: String!) {
		saveTestimonial(profileUid: $profileUid, content: $content) {
			userId
			profileUid
			content
			status
			userName
		}
	}
`;
