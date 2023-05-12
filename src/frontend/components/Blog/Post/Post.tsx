import { Box, Heading } from "@chakra-ui/react";
import { IPost } from "@core/model/blog/Post";
import parse from "html-react-parser";
import { Prose } from "@nikolovlazar/chakra-ui-prose";

interface PostProps {
	post: IPost;
}

const Post = ({ post }: PostProps) => {
	return (
		<Box p={5} borderRadius="md" bg="white" w="full" m={2}>
			<Heading as="h1" size="lg">
				{post.title}
			</Heading>
			<Prose>{post.content && parse(post.content)}</Prose>
		</Box>
	);
};

export default Post;
