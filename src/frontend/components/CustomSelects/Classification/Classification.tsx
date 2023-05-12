import { Flex } from "@chakra-ui/react";
import useSearchCategories from "@frontend/hooks/classification/useSearchCategories";
import { useEffect, useState } from "react";
import { ISelectOption } from "../SelectSearch";
import SelectCategory from "./SelectCategory";
import SelectSubCategory from "./SelectSubCategory";

interface ClassificationProps {
	category?: string;
	subCategory?: string;
	setCategory: (category?: string) => void;
	setSubCategory: (subCategory?: string) => void;
}

function Classification({
	category,
	subCategory,
	setCategory,
	setSubCategory,
}: ClassificationProps) {
	const [categoryOption, setCategoryOption] = useState<ISelectOption>();
	const [subCategoryOption, setSubCategoryOption] = useState<ISelectOption>();
	const { categories, loading } = useSearchCategories();

	useEffect(() => {
		if (category) {
			setCategoryOption({
				label: category,
				value: category,
			});
		}
	}, [category]);

	useEffect(() => {
		if (subCategory) {
			setSubCategoryOption({
				label: subCategory,
				value: subCategory,
			});
		}
	}, [subCategory]);

	return (
		<Flex
			direction="column"
			w="full"
			border="1px dashed"
			borderRadius="md"
			p={2}
		>
			<SelectCategory
				categories={categories}
				loading={loading}
				categoryOption={categoryOption}
				setCategoryOption={(option?: ISelectOption) => {
					setCategory(option?.value);
					setCategoryOption(option);
					setSubCategoryOption(undefined);
				}}
			/>
			{categoryOption && (
				<SelectSubCategory
					subCategories={
						categories.find((i) => i.name === categoryOption.value)
							?.subCategories || []
					}
					subCategoryOption={subCategoryOption}
					setSubCategoryOption={(option?: ISelectOption) => {
						setSubCategory(option?.value);
						setSubCategoryOption(option);
					}}
				/>
			)}
		</Flex>
	);
}

export default Classification;
