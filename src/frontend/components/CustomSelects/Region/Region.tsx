import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ISelectOption } from "../SelectSearch";
import SelectCity from "./SelectCity";
import SelectPrefecture from "./SelectPrefecture";

interface RegionProps {
	prefectureCode?: string;
	cityCode?: string;
	setPrefectureCode: (value?: string) => void;
	setCityCode: (value?: string) => void;
}

function Region({
	prefectureCode,
	cityCode,
	setPrefectureCode,
	setCityCode,
}: RegionProps) {
	const [prefectureOption, setPrefectureOption] = useState<ISelectOption>();
	const [cityOption, setCityOption] = useState<ISelectOption>();

	useEffect(() => {
		if (prefectureCode) {
			setPrefectureOption({ label: "", value: prefectureCode });
			if (cityCode) {
				setCityOption({ label: "", value: cityCode });
			}
		} else {
			setPrefectureOption(undefined);
			setCityOption(undefined);
		}
	}, []);

	useEffect(() => {
		if (prefectureOption) {
			setPrefectureCode(prefectureOption.value);
		} else {
			setPrefectureCode(undefined);
		}
	}, [prefectureOption]);

	useEffect(() => {
		if (cityOption) {
			setCityCode(cityOption.value);
		} else {
			setCityCode(undefined);
		}
	}, [cityOption]);

	return (
		<Flex
			direction="column"
			width="full"
			border="1px dashed"
			borderRadius="md"
			p={2}
		>
			<SelectPrefecture
				prefectureOption={prefectureOption}
				setPrefectureOption={setPrefectureOption}
			/>
			{prefectureOption && (
				<SelectCity
					prefCode={prefectureOption.value}
					cityOption={cityOption}
					setCityOption={setCityOption}
				/>
			)}
		</Flex>
	);
}

export default Region;
