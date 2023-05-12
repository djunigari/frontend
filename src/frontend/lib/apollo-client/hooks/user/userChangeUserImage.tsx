import { useMutation } from "@apollo/client";
import { CHANGE_USER_IMAGE } from "../../mutations/user/ChangeUserImage.mutation";
interface userChangeUserImageProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}
function userChangeUserImage({
	callbackSuccess,
	callbackFail,
}: userChangeUserImageProps) {
	const [changeImage, { loading }] = useMutation(CHANGE_USER_IMAGE, {
		onCompleted: () => {
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("CHANGE_USER_IMAGE", error.graphQLErrors);
			callbackFail && callbackFail();
		},
	});

	const change = async (imageUrl: string, token: string) => {
		await changeImage({
			variables: { imageUrl },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return { change, loading };
}

export default userChangeUserImage;
