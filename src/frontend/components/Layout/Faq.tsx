import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Text,
} from "@chakra-ui/react";
import { FaqItem } from "@core/model/FaqItem";

interface FaqProps {
	faqList: FaqItem[];
}

const Faq = ({ faqList }: FaqProps) => {
	return (
		<Box>
			<Accordion allowMultiple>
				{faqList.map((faqItem) => (
					<AccordionItem key={faqItem.id}>
						<h2>
							<AccordionButton>
								<Box flex="1" textAlign="left">
									<Text fontWeight="bold">
										{faqItem.question}
									</Text>
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>{faqItem.answer}</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</Box>
	);
};

export default Faq;
