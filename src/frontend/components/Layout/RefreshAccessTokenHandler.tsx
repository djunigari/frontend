import { useToast } from "@chakra-ui/react";
import { IClient } from "@core/model/client/Client";
import { bookmarksState } from "@frontend/atoms/bookmarksAtom";
import { likesState } from "@frontend/atoms/likesAtom";
import { testimonialsState } from "@frontend/atoms/testimonialsAtom";
import useClient from "@frontend/hooks/client/useClient";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

interface RefreshAccessTokenHandlerProps {
	setRefetchInterval: (interval: number) => void;
	setLoading: (value: boolean) => void;
}

export default function RefreshAccessTokenHandler({
	setRefetchInterval,
	setLoading,
}: RefreshAccessTokenHandlerProps) {
	const { data: session } = useSession();
	const toast = useToast();
	const setBookmarkState = useSetRecoilState(bookmarksState);
	const setLikeState = useSetRecoilState(likesState);
	const setTestimonialState = useSetRecoilState(testimonialsState);

	const callbackSuccessfully = (client: IClient) => {
		const likes = client?.likes?.map((c) => c.uid);
		const bookmarks = client?.bookmarks?.map((c) => c.uid);
		const testimonials = client?.testimonials?.map((c) => c.uid);
		setBookmarkState(bookmarks || []);
		setLikeState(likes || []);
		setTestimonialState(testimonials || []);
		setLoading(false);
	};

	const callbackFailed = () => {
		setLoading(false);
		setBookmarkState([]);
		setLikeState([]);
		setTestimonialState([]);
		signOut({ callbackUrl: "/a/signin", redirect: true });
	};

	const { getClient } = useClient({
		callbackSuccess: callbackSuccessfully,
		callbackFail: callbackFailed,
	});

	const getExpiresInSegunds = () => {
		let endDate = (session?.accessTokenExpires || 0) * 1000;
		let startDate = Date.now();
		let diffMs = endDate - startDate;
		return diffMs / 1000;
	};

	useEffect(() => {
		// let endDate = (session?.accessTokenExpires || 0) * 1000;
		// let purchaseDate = Date.now();
		// let diffMs = endDate - purchaseDate; // milliseconds
		// let diffDays = Math.floor(diffMs / 86400000); // days
		// let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
		// let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
		// console.log(
		// 	diffDays + " days, " + diffHrs + " hours, " + diffMins + "minutes"
		// );
		// const event = new Date(exp);

		// console.log(session?.accessTokenExpires);
		// console.log(event.toLocaleString());
		// console.log(event.toLocaleTimeString("ja-jp"));
		if (!session) return;

		if (session.error === "RefreshAccessTokenError") callbackFailed();

		const expiresIn = getExpiresInSegunds();
		if (expiresIn > 0) {
			setLoading(true);
			setRefetchInterval(expiresIn);
			getClient();
		} else {
			setRefetchInterval(0);
		}
	}, [session]);

	return null;
}
