import {
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";

interface SearchPageProps {
	pagesQuantity: number;
	currentPage: number;
	setCurrentPage: (value: number) => void;
}
function SearchPage({
	pagesQuantity,
	currentPage,
	setCurrentPage,
}: SearchPageProps) {
	const [searchPage, setSearchPage] = useState(0);

	useEffect(() => {
		setSearchPage(currentPage);
	}, [currentPage]);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchPage(Number(event.target.value));
	};

	const onClick = () => {
		if (searchPage <= 1) {
			setCurrentPage(1);
			setSearchPage(1);
		} else if (searchPage >= pagesQuantity) {
			setCurrentPage(pagesQuantity);
			setSearchPage(pagesQuantity);
		} else {
			setCurrentPage(searchPage);
		}
	};

	return (
		<InputGroup size="xs" width="auto" maxWidth={20} ml={2}>
			<Input
				type="number"
				value={searchPage}
				onChange={onChange}
				borderRadius="md"
				border="1px solid"
				borderColor="gray.300"
				onKeyDown={(e) => {
					if (e.key === "Enter") onClick();
				}}
			/>
			<InputRightElement>
				<IconButton
					bg="gray.300"
					size="xs"
					aria-label="Next Page"
					icon={<BsPlayFill />}
					onClick={onClick}
				/>
			</InputRightElement>
		</InputGroup>
	);
}

export default SearchPage;
