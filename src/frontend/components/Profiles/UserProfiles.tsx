import { Button, Flex, Spacer, Spinner, Text, VStack } from "@chakra-ui/react";
import usePaginator from "@frontend/hooks/utils/usePaginator";
import useSearchProfiles from "@frontend/lib/apollo-client/hooks/profile/useSearchProfile";
import { ISearchUserProfileParams } from "@frontend/lib/apollo-client/queryParams/SearchUserProfileParams";
import { useEffect } from "react";
import Paginator from "../Layout/Paginator/Paginator";
import Search from "../Layout/Search/Search";
import ProfileItem from "./ProfileItem";

interface UserProfilesProps {
	params: ISearchUserProfileParams;
}

function UserProfiles({ params }: UserProfilesProps) {
	const take = 20;

	const { resultList, pageInfo, search, loading } = useSearchProfiles({
		params,
		take,
	});
	const { pagesQuantity, currentPage, setCurrentPage, setTotal } =
		usePaginator({ take });

	useEffect(() => {
		search();
		setCurrentPage(1);
	}, [params]);

	useEffect(() => {
		search(currentPage - 1);
	}, [currentPage]);

	useEffect(() => {
		if (pageInfo) setTotal(pageInfo.totalCount || 0);
	}, [pageInfo]);

	const previousPage = () => {
		setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
	};

	const nextPage = () => {
		const nextPage = currentPage + 1;
		setCurrentPage(nextPage >= pagesQuantity ? pagesQuantity : nextPage);
	};

	if (loading)
		return (
			<Flex w="full" h="full" align="center" justify="center">
				<Spinner />
			</Flex>
		);
	return (
		<VStack w="full" direction="column">
			<Search params={params} />
			<Flex w="full" direction={{ base: "column-reverse", md: "row" }}>
				<Text
					fontSize="xs"
					fontWeight="semibold"
					borderRadius="md"
					p={1}
					bg="white"
					alignSelf="start"
					w="auto"
				>
					Total encontrado: ({pageInfo?.totalCount || 0})
				</Text>
				<Spacer />
				<Paginator
					pagesQuantity={pagesQuantity}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					mb={2}
					alignSelf="end"
				/>
			</Flex>
			<VStack w="full">
				{resultList?.length > 0 ? (
					resultList?.map((item, index) => (
						<ProfileItem key={index} profile={item} />
					))
				) : (
					<Text>Nenhum Resultado encontrado</Text>
				)}
			</VStack>
			<Flex>
				{pageInfo?.hasPreviousPage && (
					<Button colorScheme="gray" onClick={previousPage}>
						Voltar
					</Button>
				)}
				{pageInfo?.hasNextPage && (
					<Button colorScheme="gray" onClick={nextPage}>
						Mais
					</Button>
				)}
			</Flex>
		</VStack>
	);
}

export default UserProfiles;
