import { Flex, Text } from "@chakra-ui/react";
import ICategory from "@core/model/Category";
import useSearchCategories from "@frontend/hooks/classification/useSearchCategories";
import { useEffect, useState } from "react";
import SelectSearch, { ISelectOption } from "../SelectSearch";

interface SelectCategoryProps {
	categories: ICategory[];
	loading: boolean;
	categoryOption?: ISelectOption;
	setCategoryOption: (option?: ISelectOption) => void;
}

function SelectCategory({
	categories,
	loading,
	categoryOption,
	setCategoryOption,
}: SelectCategoryProps) {
	const [options, setOptions] = useState<ISelectOption[]>([]);

	useEffect(() => {
		if (categories.length > 0) {
			const options = categories?.map(
				(category) =>
					({
						label: category.name,
						value: category.name,
					} as ISelectOption)
			);
			setOptions(options);
		}
	}, [categories]);

	return (
		<Flex direction="column">
			<Text fontSize="sm" fontWeight="bold">
				Categoria
			</Text>
			<SelectSearch
				name="category"
				selectedOption={categoryOption}
				setSelectedOption={setCategoryOption}
				options={options}
				loading={loading}
			/>
		</Flex>
	);
}

export default SelectCategory;
