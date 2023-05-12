import { Search2Icon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IProfileResume } from "@core/model/client/ProfileResume";

interface ProfileResumeFilterProps {
	profiles: IProfileResume[];
	setProfiles: (value: IProfileResume[]) => void;
}

function ProfileResumeFilter({
	profiles,
	setProfiles,
}: ProfileResumeFilterProps) {
	const filter = (nameFilter: string) => {
		const result = profiles.filter((item) =>
			item.displayName
				?.toLocaleLowerCase()
				.includes(nameFilter.toLocaleLowerCase())
		);

		setProfiles(result);
	};

	return (
		<Flex
			align="center"
			w="full"
			borderRadius="md"
			bg="white"
			shadow="md"
			p={2}
		>
			<InputGroup>
				<InputLeftElement
					pointerEvents="none"
					children={<Search2Icon color="gray.300" />}
				/>
				<Input
					placeholder="Filtrar empresa: Nome da empresa"
					onChange={(e) => {
						filter(e.target.value.toLowerCase());
					}}
					border="none"
					focusBorderColor="none"
				/>
			</InputGroup>
		</Flex>
	);
}

export default ProfileResumeFilter;
