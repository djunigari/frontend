import { Flex, Text } from "@chakra-ui/react";
import { IPrefecture } from "@core/model/Prefecture";
import SelectSearch, {
	ISelectOption,
} from "@frontend/components/CustomSelects/SelectSearch";
import useGetPrefectures from "@frontend/lib/apollo-client/hooks/region/prefecture/useGetPrefectures";
import { useEffect, useState } from "react";

interface SelectPrefectureProps {
	prefectureOption?: ISelectOption;
	setPrefectureOption: (option?: ISelectOption) => void;
}

function SelectPrefecture({
	prefectureOption,
	setPrefectureOption,
}: SelectPrefectureProps) {
	const [options, setOptions] = useState<ISelectOption[]>([]);

	const { fetch, loading } = useGetPrefectures({
		callbackSuccess: (list: IPrefecture[]) => {
			const options = list.map(
				(p) =>
					({
						label: `${p.nameJP} - ${p.name}`,
						value: p.prefCode,
					} as ISelectOption)
			);
			setOptions(options);
		},
	});

	useEffect(() => {
		fetch();
	}, []);

	return (
		<Flex direction="column" width="full">
			<Text fontSize="sm" fontWeight="bold">
				Província
			</Text>
			<SelectSearch
				name="prefecture"
				selectedOption={
					prefectureOption
						? options.find(
								(o) => o.value === prefectureOption.value
						  )
						: undefined
				}
				setSelectedOption={setPrefectureOption}
				options={options}
				loading={loading}
			/>
		</Flex>
	);
}

export default SelectPrefecture;
