import { useLazyQuery, useQuery } from "@apollo/client";
import ICategory from "@core/model/Category";
import { GET_ALL_CATEGORIES } from "@frontend/lib/apollo-client/queries/Category/GetAllCategories.query";
import { useState } from "react";

function useSearchCategories() {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const { loading, refetch } = useQuery<{
		categories: ICategory[];
	}>(GET_ALL_CATEGORIES, {
		onCompleted: (data) => {
			setCategories(data.categories);
		},
		onError: (error) => console.log("GET_ALL_CATEGORIES", error),
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	return {
		refetch,
		loading,
		categories,
	};
}

export default useSearchCategories;
