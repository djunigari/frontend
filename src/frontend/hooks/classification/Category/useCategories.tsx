import ICategory from "@core/model/Category";
import { useEffect, useState } from "react";
import useSearchCategories from "../useSearchCategories";

function useCategories() {
	const [categories, setCategories] = useState<ICategory[]>([]);

	const {
		categories: searchCategories,
		loading,
		refetch,
	} = useSearchCategories();

	const removeCategory = (value: string) => {
		setCategories(categories.filter((c) => c.name !== value));
	};

	useEffect(() => {
		setCategories(
			searchCategories.sort((a, b) => (a.name < b.name ? -1 : 1))
		);
	}, [searchCategories]);

	const setCategory = (oldCategory: ICategory, newCategory: ICategory) => {
		const aux = [...categories];
		const index = aux.findIndex(
			(item) =>
				item.name.toLocaleLowerCase() ===
				oldCategory.name.toLocaleLowerCase()
		);
		aux[index] = newCategory;
		setCategories(aux);
	};

	return {
		categories,
		setCategories,
		setCategory,
		loading,
		refetch,
		removeCategory,
	};
}

export default useCategories;
