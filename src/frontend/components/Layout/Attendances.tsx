import { Checkbox, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { Attendance } from "@core/enums/Attendance";
import { ISelectOption } from "@frontend/components/CustomSelects/SelectSearch";
import React from "react";
import { GrDeliver, GrPersonalComputer } from "react-icons/gr";
import { IoStorefrontOutline } from "react-icons/io5";

interface AttendancesProps {
	attendances?: Attendance[] | [];
	setAttendances: (attendances?: Attendance[] | []) => void;
}

function Attendances({ attendances, setAttendances }: AttendancesProps) {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as Attendance;
		event.target.checked ? addAttendace(value) : removeAttendace(value);
	};
	const addAttendace = (value: Attendance) => {
		if (attendances && attendances.length > 0) {
			if (attendances.find((item) => item === value)) return;
			setAttendances([...attendances, value]);
		} else {
			setAttendances([value]);
		}
	};

	const removeAttendace = (value: Attendance) => {
		if (attendances && attendances.length > 0) {
			const filtered = attendances.filter((item) => item !== value);
			setAttendances(filtered);
		} else {
			setAttendances([]);
		}
	};

	return (
		<Flex
			direction="column"
			w="full"
			border="1px dashed"
			borderRadius="md"
			p={2}
		>
			<Text fontSize="sm" fontWeight="bold" mb={2}>
				Atendimento
			</Text>
			<Stack direction={{ base: "column", md: "row" }} spacing={[2, 4]}>
				<Checkbox
					value="presential"
					onChange={onChange}
					isChecked={
						(attendances || []).indexOf(Attendance.PRESENTIAL) > -1
					}
				>
					<Flex align="center" fontWeight="bold">
						<Icon as={IoStorefrontOutline} mr={1} />
						<Text fontSize="xs">Presencial</Text>
					</Flex>
				</Checkbox>
				<Checkbox
					value="online"
					onChange={onChange}
					isChecked={
						(attendances || []).indexOf(Attendance.ONLINE) > -1
					}
				>
					<Flex align="center" fontWeight="bold">
						<Icon as={GrPersonalComputer} mr={1} />
						<Text fontSize="xs">Online</Text>
					</Flex>
				</Checkbox>
				<Checkbox
					value="delivery"
					onChange={onChange}
					isChecked={
						(attendances || []).indexOf(Attendance.DELIVERY) > -1
					}
				>
					<Flex align="center" fontWeight="bold">
						<Icon as={GrDeliver} mr={1} />
						<Text fontSize="xs">Delivery</Text>
					</Flex>
				</Checkbox>
			</Stack>
		</Flex>
	);
}

export default Attendances;
