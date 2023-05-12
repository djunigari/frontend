import { Flex, Text, Textarea } from "@chakra-ui/react";
import { TestimonialStatus } from "@core/enums/TestimonialStatus.enum";
import { TypeProfile } from "@core/enums/TypeProfile.enum";
import useEditMyTestimonialOfProfie from "@frontend/hooks/testimonial/useEditMyTestimonialOfProfie";
import EditButtons from "./Buttons/EditButtons";
import SaveButtons from "./Buttons/SaveButtons";

interface UpdateTestimonialProps {
	profileUid: string;
	typeProfile: TypeProfile;
}

function UpdateTestimonial({
	profileUid,
	typeProfile,
}: UpdateTestimonialProps) {
	const {
		testimonial,
		canEdit,
		setCanEdit,
		newContent,
		setNewContent,
		save,
		remove,
		reset,
		loadingRemove,
		loadingSave,
	} = useEditMyTestimonialOfProfie({ profileUid });

	let description = "";
	let color = "orange.300";

	if (testimonial?.status === TestimonialStatus.APPROVED) {
		description = "Seu depoimento foi Aprovado";
		color = "green";
	} else if (testimonial?.status === TestimonialStatus.WAITING) {
		description = "Esperando aprovação da empresa";
		color = "orange";
	} else if (testimonial?.status === TestimonialStatus.REPROVED) {
		description = "Seu depoimento foi Reprovado pela empresa";
		color = "red";
	}
	return (
		<Flex
			direction="column"
			w="full"
			bg="white"
			rounded={"xl"}
			boxShadow={"lg"}
			p={2}
			mt={2}
		>
			<Text fontWeight="bold">Meu depoimento:</Text>
			{typeProfile !== TypeProfile.FREE && (
				<Text
					fontSize="x-small"
					fontWeight="bold"
					color={color}
					align="end"
				>
					{description}
				</Text>
			)}
			<Textarea
				isReadOnly={!canEdit}
				fontSize="sm"
				border="1px dashed"
				bg="gray.100"
				color="gray.600"
				onChange={(e) => setNewContent(e.target.value)}
				value={newContent || ""}
			/>

			{canEdit ? (
				<SaveButtons
					save={save}
					cancel={reset}
					isLoading={loadingSave}
				/>
			) : (
				<EditButtons
					edit={() => setCanEdit(true)}
					remove={() => remove()}
					isLoading={loadingRemove}
				/>
			)}
		</Flex>
	);
}

export default UpdateTestimonial;
