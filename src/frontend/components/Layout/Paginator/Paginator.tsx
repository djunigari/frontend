import { Flex, FlexProps, HStack } from "@chakra-ui/react";
import Next from "./Next";
import PageGroup from "./PageGroup/PageGroup";
import Previous from "./Previous";
import SearchPage from "./SearchPage/SearchPage";

interface PaginatorProps extends FlexProps {
	pagesQuantity: number;
	currentPage: number;
	setCurrentPage: (value: number) => void;
}

function Paginator({
	pagesQuantity,
	currentPage,
	setCurrentPage,
	...restProps
}: PaginatorProps) {
	const hasPreviusPage = () => currentPage > 1;

	const hasNextPage = () => currentPage < pagesQuantity;

	const previousPage = () => {
		setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
	};

	const nextPage = () => {
		const nextPage = currentPage + 1;
		setCurrentPage(nextPage >= pagesQuantity ? pagesQuantity : nextPage);
	};

	return (
		<Flex align="center" justify="center" {...restProps}>
			<HStack>
				{hasPreviusPage() && <Previous onClick={previousPage} />}
				<PageGroup
					pagesQuantity={pagesQuantity}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
				{hasNextPage() && <Next onClick={nextPage} />}
			</HStack>
			<SearchPage
				pagesQuantity={pagesQuantity}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</Flex>
	);
}

export default Paginator;
