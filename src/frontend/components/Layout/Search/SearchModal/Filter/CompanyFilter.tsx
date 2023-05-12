import { Flex, Input, Text } from "@chakra-ui/react";

interface CompanyFilterProps {
	companyName?: string;
	setCompanyName: (value: string) => void;
}

function CompanyFilter({ companyName, setCompanyName }: CompanyFilterProps) {
	return (
		<Flex direction="column" w="full">
			<Text fontSize="sm" fontWeight="bold">
				Nome da Empresa
			</Text>
			<Input
				value={companyName || ""}
				onChange={(e) => {
					setCompanyName(e.target.value);
				}}
				_hover={{
					bg: "white",
					border: "1px solid",
					borderColor: "blue.500",
				}}
				_focus={{
					outline: "none",
					border: "1px solid",
					borderColor: "blue.500",
				}}
			/>
		</Flex>
	);
}

export default CompanyFilter;
