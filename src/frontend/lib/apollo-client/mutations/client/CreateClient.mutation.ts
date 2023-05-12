import { gql } from "@apollo/client";

export const CREATE_CLIENT = gql`
	mutation createClient {
		createClient {
			userId
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
		}
	}
`;
