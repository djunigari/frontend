import {
	Flex,
	FlexProps,
	HStack,
	Icon,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Attendance } from "@core/enums/Attendance";
import { GrDeliver, GrPersonalComputer } from "react-icons/gr";
import { IoStorefrontOutline } from "react-icons/io5";

interface ServiceInfoProps extends FlexProps {
	services: string[];
	attendances?: Attendance[];
}
function ServiceInfo({
	services,
	attendances,
	...restProps
}: ServiceInfoProps) {
	return (
		<Flex
			direction="column"
			rounded={"xl"}
			boxShadow={"lg"}
			p={2}
			w="full"
			bg="white"
			align="center"
			{...restProps}
		>
			<Text fontSize="lg" fontWeight="bold" alignSelf="center">
				Serviços
			</Text>
			<HStack spacing={2} p={2} w="full" justify="center">
				{attendances?.includes(Attendance.PRESENTIAL) && (
					<Flex align="center" fontWeight="bold">
						<Icon as={IoStorefrontOutline} mr={1} />
						<Text fontSize="xs">Presencial</Text>
					</Flex>
				)}
				{attendances?.includes(Attendance.ONLINE) && (
					<Flex align="center" fontWeight="bold">
						<Icon as={GrPersonalComputer} mr={1} />
						<Text fontSize="xs">Online</Text>
					</Flex>
				)}
				{attendances?.includes(Attendance.DELIVERY) && (
					<Flex align="center" fontWeight="bold">
						<Icon as={GrDeliver} mr={1} />
						<Text fontSize="xs">Delivery</Text>
					</Flex>
				)}
			</HStack>

			<VStack
				align="flex-start"
				border="1px dashed "
				borderColor="gray.400"
				borderRadius="md"
				w="full"
				p={2}
			>
				{services?.map((item, index) => (
					<Text
						key={index}
						fontSize="sm"
						fontWeight="semibold"
						color="gray.600"
					>
						{`- ${item} `}
					</Text>
				))}
			</VStack>
		</Flex>
	);
}

export default ServiceInfo;
