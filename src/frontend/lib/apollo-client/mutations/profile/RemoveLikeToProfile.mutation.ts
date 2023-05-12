import { gql } from "@apollo/client";

export const REMOVE_LIKE_TO_PROFILE = gql`
	mutation removeLike($uid: String!) {
		removeLike(uid: $uid)
	}
`;
