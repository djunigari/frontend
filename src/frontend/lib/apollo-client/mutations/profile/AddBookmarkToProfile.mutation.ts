import { gql } from "@apollo/client";

export const ADD_BOOKMARK_TO_PROFILE = gql`
	mutation addBookmark($uid: String!) {
		addBookmark(uid: $uid)
	}
`;
