import { gql } from "@apollo/client";

export const ADD_LIKE_TO_PROFILE = gql`
	mutation addLike($uid: String!) {
		addLike(uid: $uid)
	}
`;
