import { Button, Flex, Spacer, Textarea } from "@chakra-ui/react";
import { testimonialsState } from "@frontend/atoms/testimonialsAtom";
import useSaveTestimonial from "@frontend/lib/apollo-client/hooks/testimonial/useSaveTestimonial";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

interface NewTestimonialProps {
	profileUid: string;
}
function NewTestimonial({ profileUid }: NewTestimonialProps) {
	const { data: session } = useSession();
	const [content, setContent] = useState<string>("");
	const setProfiles = useSetRecoilState(testimonialsState);
	const { save, loading } = useSaveTestimonial({
		callbackSuccess: () => {
			setContent("");
			setProfiles((prev) => [...prev, profileUid]);
			Router.reload();
		},
	});

	if (!session) return null;

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	return (
		<Flex direction="column" w="full" mt={2}>
			<Textarea
				placeholder="Escrever depoimento"
				border="1px solid"
				borderColor="gray.300"
				focusBorderColor="gray.300"
				_hover={{ borderColor: "gray.300" }}
				value={content || ""}
				onChange={onChange}
			/>
			<Flex w="full" justify="end" mt={2}>
				<Spacer />
				<Button
					colorScheme="blue"
					mr={2}
					onClick={() => save(profileUid, content)}
					isLoading={loading}
				>
					Enviar
				</Button>
				<Button colorScheme="red">Cancelar</Button>
			</Flex>
		</Flex>
	);
}

export default NewTestimonial;
