import { gql } from "@apollo/client";

export const GET_ALL_SUB_CATEGORIES_BY_CATEGORY_ID = gql`
	query GetAllSubCategoriesByCategoryId($name: ID!) {
		category(name: $name) {
			name
			subCategories
		}
	}
`;
