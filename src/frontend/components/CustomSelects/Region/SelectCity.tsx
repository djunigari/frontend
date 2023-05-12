import { Flex, Text } from "@chakra-ui/react";
import { ICity } from "@core/model/City";
import SelectSearch, {
	ISelectOption,
} from "@frontend/components/CustomSelects/SelectSearch";
import useSearchCitiesByPrefCode from "@frontend/lib/apollo-client/hooks/region/city/useSearchCitiesByPrefCode";
import { useEffect, useState } from "react";

interface SelectCityProps {
	prefCode: string;
	cityOption?: ISelectOption;
	setCityOption: (option?: ISelectOption) => void;
}

function SelectCity({ prefCode, cityOption, setCityOption }: SelectCityProps) {
	const [options, setOptions] = useState<ISelectOption[]>([]);

	const { fetch, loading } = useSearchCitiesByPrefCode({
		callbackSuccess: (value: ICity[]) => {
			const options = value.map(
				(c) =>
					({
						label: `${c.nameJP} - ${c.name
							?.charAt(0)
							.toUpperCase()}${c.name?.toLowerCase().slice(1)}`,
						value: c.admAreaCode,
					} as ISelectOption)
			);
			setOptions(options);
		},
	});

	useEffect(() => {
		fetch(prefCode);
	}, [prefCode]);

	return (
		<Flex direction="column" width="full">
			<Text fontSize="sm" fontWeight="bold">
				Cidade
			</Text>
			<SelectSearch
				name="city"
				selectedOption={
					cityOption
						? options.find((o) => o.value === cityOption.value)
						: undefined
				}
				setSelectedOption={setCityOption}
				options={options}
				loading={loading}
			/>
		</Flex>
	);
}

export default SelectCity;
