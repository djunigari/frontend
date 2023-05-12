import { gql } from "@apollo/client";

export const RANDOM_ANNOUNCEMENTS = gql`
	query randomAnnouncements(
		$params: ParamsRandomAnnouncementsFilterInput
		$limit: Float
	) {
		randomAnnouncements(limit: $limit, params: $params) {
			imageUrl
		}
	}
`;
