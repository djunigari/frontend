import { authOptions } from "@api/auth/[...nextauth]";
import { Flex, Text } from "@chakra-ui/react";
import { IClient } from "@core/model/client/Client";
import { IProfileResume } from "@core/model/client/ProfileResume";
import ProfileResumes from "@frontend/components/Profiles/ProfileResumes/ProfileResumes";
import apolloClient from "@frontend/lib/apollo-client/apollo";
import { GET_CLIENT } from "@frontend/lib/apollo-client/queries/Client/GetClient.query";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

interface LikesPageProps {
	profiles: IProfileResume[];
}

function LikesPage({ profiles }: LikesPageProps) {
	return (
		<Flex direction="column" align="center" w="full">
			<Text fontSize="2xl" fontWeight="bold">
				Minhas Curtidas
			</Text>
			<ProfileResumes profiles={profiles} />
		</Flex>
	);
}

export default LikesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (!session?.accessToken) {
		return {
			redirect: {
				destination: "/a/signin",
				permanent: false,
			},
		};
	}

	const { data } = await apolloClient.query<{ client: IClient }>({
		query: GET_CLIENT,
		context: {
			headers: {
				authorization: `Bearer ${session.accessToken}`,
			},
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	return {
		props: { profiles: data?.client?.likes || [] },
	};
};
