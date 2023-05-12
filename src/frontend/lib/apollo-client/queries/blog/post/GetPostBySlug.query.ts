import { gql } from "@apollo/client";

export const GET_POST_BY_SLUG = gql`
	query post($slug: String!) {
		post(slug: $slug) {
			id
			slug
			title
			content
		}
	}
`;
