import { gql } from "@apollo/client";

export const REMOVE_BOOKMARK_TO_PROFILE = gql`
	mutation removeBookmark($uid: String!) {
		removeBookmark(uid: $uid)
	}
`;
