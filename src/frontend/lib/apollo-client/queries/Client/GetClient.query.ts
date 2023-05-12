import { gql } from "@apollo/client";

export const GET_CLIENT = gql`
	query GetClient {
		client {
			likes {
				uid
				imageUrl
				displayName
			}
			bookmarks {
				uid
				imageUrl
				displayName
			}
			testimonials {
				uid
				imageUrl
				displayName
			}
		}
	}
`;
