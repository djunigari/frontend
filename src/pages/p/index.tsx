import UserProfiles from "@frontend/components/Profiles/UserProfiles";
import { useRouter } from "next/router";

function ProfilesPage() {
	const router = useRouter();

	return <UserProfiles params={router.query} />;
}

export default ProfilesPage;
