import { Flex, Spinner, Text } from "@chakra-ui/react";
import { IPost } from "@core/model/blog/Post";
import useGetPostBySlug from "@frontend/lib/apollo-client/hooks/queries/blog/post/useGetPostBySlug";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Post = dynamic(import("@frontend/components/Blog/Post/Post"), {
	ssr: false,
});

const PostPage = () => {
	const router = useRouter();
	const [post, setPost] = useState<IPost | null>(null);

	const { fetch, loading } = useGetPostBySlug({
		callbackSuccess: setPost,
	});

	useEffect(() => {
		if (!router.isReady) return;
		const { slug } = router.query;
		if (slug) {
			fetch(slug as string);
		}
	}, [router.isReady]);

	if (!router.isReady || loading)
		return (
			<Flex w="full" h="full" align="center" justify="center">
				<Spinner />
			</Flex>
		);

	if (!post)
		return (
			<Flex w="full" h="full" align="center" justify="center">
				<Text>Post não encontrado!</Text>
			</Flex>
		);

	return <Post post={post} />;
};

export default PostPage;
