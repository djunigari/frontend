import { gql } from "@apollo/client";

export const CHANGE_USER_NAME = gql`
	mutation changeUserName($name: String!) {
		changeUserName(name: $name)
	}
`;
