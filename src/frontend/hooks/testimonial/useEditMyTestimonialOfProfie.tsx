import { useToast } from "@chakra-ui/react";
import { ITestimonial } from "@core/model/client/Testimonial";
import { testimonialsState } from "@frontend/atoms/testimonialsAtom";
import useGetMyTestimonialOfProfile from "@frontend/lib/apollo-client/hooks/testimonial/useGetMyTestimonialOfProfile";
import useRemoveTestimonial from "@frontend/lib/apollo-client/hooks/testimonial/useRemoveTestimonial";
import useSaveTestimonial from "@frontend/lib/apollo-client/hooks/testimonial/useSaveTestimonial";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

interface useEditMyTestimonialOfProfieProps {
	profileUid: string;
}

function useEditMyTestimonialOfProfie({
	profileUid,
}: useEditMyTestimonialOfProfieProps) {
	const { data: session } = useSession();
	const router = useRouter();
	const setProfiles = useSetRecoilState(testimonialsState);
	const [testimonial, setTestimonial] = useState<ITestimonial>();
	const [newContent, setNewContent] = useState<string>("");
	const [canEdit, setCanEdit] = useState<boolean>(false);

	const { fetch } = useGetMyTestimonialOfProfile({
		profileUid,
		callbackSuccess: (testimonial: ITestimonial) => {
			setTestimonial(testimonial);
			setNewContent(testimonial.content);
		},
	});

	useEffect(() => {
		const userId = session?.user?.id;
		if (userId && profileUid) fetch(userId, profileUid);
	}, [session, profileUid]);

	const { save: saveTestimonial, loading: loadingSave } = useSaveTestimonial({
		callbackSuccess: () => router.reload(),
	});
	const { remove: removeTestimonial, loading: loadingRemove } =
		useRemoveTestimonial({
			callbackSuccess: () => {
				setProfiles((prev) => prev.filter((i) => i !== profileUid));
				router.reload();
			},
		});

	const save = () => {
		saveTestimonial(profileUid, newContent);
		setCanEdit(false);
	};

	const remove = () => {
		removeTestimonial(profileUid);
	};

	const reset = () => {
		setNewContent(testimonial?.content || "");
		setCanEdit(false);
	};

	return {
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
	};
}

export default useEditMyTestimonialOfProfie;
