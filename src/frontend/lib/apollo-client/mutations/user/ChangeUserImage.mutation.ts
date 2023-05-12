import { gql } from "@apollo/client";

export const CHANGE_USER_IMAGE = gql`
	mutation changeUserImage($imageUrl: String!) {
		changeUserImage(imageUrl: $imageUrl)
	}
`;
