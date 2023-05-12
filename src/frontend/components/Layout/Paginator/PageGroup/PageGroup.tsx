import { HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import PageItem from "./PageItem";

interface PageGroupProps {
	pagesQuantity: number;
	currentPage: number;
	setCurrentPage: (value: number) => void;
}

function PageGroup({
	pagesQuantity,
	currentPage,
	setCurrentPage,
}: PageGroupProps) {
	return (
		<HStack spacing={1}>
			{pagesQuantity <= 6 &&
				new Array(pagesQuantity)
					.fill(0)
					.map((item, index) => (
						<PageItem
							key={index}
							setStep={setCurrentPage}
							num={index + 1}
							isActived={index + 1 === currentPage}
						/>
					))}
			{pagesQuantity > 6 && (
				<>
					<PageItem
						setStep={setCurrentPage}
						num={1}
						isActived={1 === currentPage}
					/>
					{currentPage <= 2 && (
						<>
							<PageItem
								setStep={setCurrentPage}
								num={2}
								isActived={2 === currentPage}
							/>
							<PageItem
								setStep={setCurrentPage}
								num={3}
								isActived={3 === currentPage}
							/>
							<Text>...</Text>
						</>
					)}

					{currentPage > 2 && currentPage < pagesQuantity - 1 && (
						<>
							<Text>...</Text>
							<PageItem
								setStep={setCurrentPage}
								num={currentPage - 1}
								isActived={currentPage - 1 === currentPage}
							/>
							<PageItem
								setStep={setCurrentPage}
								num={currentPage}
								isActived={currentPage === currentPage}
							/>
							<PageItem
								setStep={setCurrentPage}
								num={currentPage + 1}
								isActived={currentPage + 1 === currentPage}
							/>
							<Text>...</Text>
						</>
					)}

					{currentPage >= pagesQuantity - 1 && (
						<>
							<Text>...</Text>
							<PageItem
								setStep={setCurrentPage}
								num={pagesQuantity - 2}
								isActived={pagesQuantity - 2 === currentPage}
							/>
							<PageItem
								setStep={setCurrentPage}
								num={pagesQuantity - 1}
								isActived={pagesQuantity - 1 === currentPage}
							/>
						</>
					)}
					<PageItem
						setStep={setCurrentPage}
						num={pagesQuantity}
						isActived={pagesQuantity === currentPage}
					/>
				</>
			)}
		</HStack>
	);
}

export default PageGroup;
