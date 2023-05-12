import { useMutation } from "@apollo/client";
import { DELETE_USER_ACCOUNT } from "../../mutations/user/DeleteUserAccount.mutation";
interface useDeleteUserAccountProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}
function useDeleteUserAccount({
	callbackSuccess,
	callbackFail,
}: useDeleteUserAccountProps) {
	const [removeUser, { loading }] = useMutation(DELETE_USER_ACCOUNT, {
		onCompleted: () => {
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("DELETE_USER_ACCOUNT", error.graphQLErrors);
			callbackFail && callbackFail();
		},
	});

	const remove = async (token: string) => {
		await removeUser({
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};

	return { remove, loading };
}

export default useDeleteUserAccount;
