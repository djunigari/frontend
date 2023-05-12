import { useLazyQuery } from "@apollo/client";
import { IClient } from "@core/model/client/Client";
import { GET_CLIENT } from "@frontend/lib/apollo-client/queries/Client/GetClient.query";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface useClientProps {
	callbackSuccess?: (client: IClient) => void;
	callbackFail?: () => void;
}

function useClient({ callbackSuccess, callbackFail }: useClientProps) {
	const { data: session } = useSession();
	const [loadClient, { called, refetch }] = useLazyQuery<{
		client: IClient;
	}>(GET_CLIENT, {
		onCompleted: (data) => {
			callbackSuccess && callbackSuccess(data.client);
		},
		onError: (error) => {
			console.log("GET_CLIENT", error);
			callbackFail && callbackFail();
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const getClient = () => {
		if (!session?.accessToken) return;
		if (called) {
			refetch();
		} else {
			loadClient({
				context: {
					headers: {
						authorization: `Bearer ${session.accessToken}`,
					},
				},
			});
		}
	};

	return {
		getClient,
	};
}

export default useClient;
