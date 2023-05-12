import {
	Button,
	Icon,
	Input,
	InputGroup,
	InputGroupProps,
	InputLeftElement,
	InputRightElement,
} from "@chakra-ui/react";
import { ISearchUserProfileParams } from "@frontend/lib/apollo-client/queryParams/SearchUserProfileParams";
import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";

interface Props extends InputGroupProps {
	query?: string;
	setQuery: (value: string) => void;
	getFilters?: () => ISearchUserProfileParams;
}

function SearchButton({ getFilters, query, setQuery, ...restProps }: Props) {
	const router = useRouter();

	const search = () => {
		if (getFilters) {
			const filters = getFilters();
			router.push({
				pathname: "/p",
				query: { ...filters },
			});
		} else {
			router.push(`/p${query ? `?query=${query}` : ""}`);
		}
	};

	return (
		<InputGroup w="full" {...restProps}>
			<InputLeftElement
				pointerEvents="none"
				children={<Icon as={BiSearch} color="gray.300" />}
			/>
			<Input
				bg="white"
				value={query || ""}
				placeholder="Pesquisar por palavras chaves"
				type="text"
				onChange={(e) => setQuery(e.target.value)}
			/>
			<InputRightElement w="auto">
				<Button size="sm" mr={2} onClick={() => search()}>
					Pesquisar
				</Button>
			</InputRightElement>
		</InputGroup>
	);
}

export default SearchButton;
