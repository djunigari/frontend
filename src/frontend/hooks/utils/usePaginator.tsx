import { useEffect, useState } from "react";

interface usePaginatorProps {
	take?: number;
}

function usePaginator({ take = 10 }: usePaginatorProps) {
	const [total, setTotal] = useState(0);
	const [pagesQuantity, setPagesQuantity] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		const pagesQuantity = total ? Math.ceil(total / take) : 0;
		setPagesQuantity(pagesQuantity);
	}, [total]);

	const getSliceOfList = (list: any[] = []) => {
		if (list.length > 0) {
			let start = (currentPage - 1) * take;
			let end = (currentPage - 1) * take + take;
			if (end > list.length) end = list.length;
			return list.slice(start, end);
		}
		return [];
	};

	return {
		pagesQuantity,
		currentPage,
		setCurrentPage,
		setTotal,
		getSliceOfList,
	};
}

export default usePaginator;
