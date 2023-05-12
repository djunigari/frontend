import { Flex, Text, Textarea } from "@chakra-ui/react";
import { ITestimonial } from "@core/model/client/Testimonial";

interface TestimonialItemProps {
	testimonial: ITestimonial;
}

function TestimonialItem({ testimonial }: TestimonialItemProps) {
	return (
		<Flex
			direction="column"
			w="full"
			bg="white"
			rounded={"xl"}
			boxShadow={"lg"}
			p={2}
		>
			<Textarea
				isReadOnly
				fontSize="sm"
				border="1px dashed"
				bg="gray.100"
				color="gray.600"
				value={testimonial.content}
			/>
			<Text mt={2} fontSize="xs" fontWeight="semibold">
				Por: {testimonial.userName}
			</Text>
		</Flex>
	);
}

export default TestimonialItem;
