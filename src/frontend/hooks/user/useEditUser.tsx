import useDeleteUserAccount from "@frontend/lib/apollo-client/hooks/user/useDeleteUserAccount";
import userChangeUserImage from "@frontend/lib/apollo-client/hooks/user/userChangeUserImage";
import userChangeUserName from "@frontend/lib/apollo-client/hooks/user/userChangeUserName";
import { useSession } from "next-auth/react";

function useEditUser() {
	const { data: session } = useSession();

	const { change: changeUserName } = userChangeUserName({});
	const { change: changeUserImage } = userChangeUserImage({});
	const { remove: removeUser } = useDeleteUserAccount({});

	const changeName = (newName: string) => {
		if (!session?.accessToken) return;
		changeUserName(newName, session?.accessToken);
	};

	const changeImage = (newImageUrl: string) => {
		if (!session?.accessToken) return;
		changeUserImage(newImageUrl, session?.accessToken);
	};

	const remove = () => {
		if (!session?.accessToken) return;
		removeUser(session?.accessToken);
	};

	return { changeName, changeImage, remove };
}

export default useEditUser;
