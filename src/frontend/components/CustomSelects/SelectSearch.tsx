import { Box } from "@chakra-ui/react";
import Select, { SingleValue } from "react-select";

export interface ISelectOption {
	label: string;
	value: string;
}

interface SelectSearchProps {
	name: string;
	options: ISelectOption[];
	selectedOption?: ISelectOption;
	setSelectedOption: (option?: ISelectOption) => void;
	loading?: boolean;
	isMulti?: boolean;
}

function SelectSearch({
	name,
	options,
	selectedOption,
	setSelectedOption,
	loading,
	isMulti,
}: SelectSearchProps) {
	const handleChange = (option: SingleValue<ISelectOption>) => {
		setSelectedOption((option as ISelectOption) || undefined);
	};
	return (
		<Box w="full">
			<Select<ISelectOption>
				maxMenuHeight={150}
				id={`select-${name}`}
				instanceId={`select-${name}`}
				value={selectedOption || null}
				isClearable
				isSearchable
				// @ts-ignore
				isMulti={isMulti}
				isLoading={loading || false}
				options={options}
				onChange={handleChange}
				getOptionLabel={(option) => option.label}
			/>
		</Box>
	);
}

export default SelectSearch;
