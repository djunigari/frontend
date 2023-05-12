import { useMutation } from "@apollo/client";
import { CHANGE_USER_NAME } from "../../mutations/user/ChangeUserName.mutation";
interface userChangeUserNameProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}
function userChangeUserName({
	callbackSuccess,
	callbackFail,
}: userChangeUserNameProps) {
	const [changeName, { loading }] = useMutation(CHANGE_USER_NAME, {
		onCompleted: () => {
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("CHANGE_USER_NAME", error.graphQLErrors);
			callbackFail && callbackFail();
		},
	});

	const change = async (name: string, token: string) => {
		await changeName({
			variables: { name },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return { change, loading };
}

export default userChangeUserName;
