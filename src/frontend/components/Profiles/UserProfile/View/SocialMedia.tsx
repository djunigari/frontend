import {
	Flex,
	Icon,
	IconButton,
	Link,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
} from "@chakra-ui/react";
import {
	FaFacebook,
	FaInstagram,
	FaMapMarkerAlt,
	FaPhone,
	FaWhatsapp,
	FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

interface SocialMediaProps {
	telephone?: string;
	whatsapp?: string;
	facebook?: string;
	instagram?: string;
	webSite?: string;
	email?: string;
	googleMapsLink?: string;
	youtube?: string;
}

function SocialMedia({
	telephone,
	whatsapp,
	facebook,
	instagram,
	webSite,
	email,
	googleMapsLink,
	youtube,
}: SocialMediaProps) {
	return (
		<Flex w="full" justify="start" align="center">
			{telephone && (
				<Popover>
					<PopoverTrigger>
						<IconButton
							aria-label="Search database"
							variant="outline"
							colorScheme="gray"
							border="none"
							fontSize="20px"
							icon={<FaPhone />}
						/>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />

						<PopoverBody>
							<Flex align="center">
								<Icon as={FaPhone} color="gray.600" mr={2} />
								{telephone}
							</Flex>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			)}
			{whatsapp && (
				<Popover>
					<PopoverTrigger>
						<IconButton
							aria-label="Search database"
							variant="outline"
							colorScheme="whatsapp"
							border="none"
							fontSize="20px"
							icon={<FaWhatsapp />}
						/>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />

						<PopoverBody>
							<Flex align="center">
								<Icon
									as={FaWhatsapp}
									color="whatsapp.600"
									mr={2}
								/>
								{whatsapp}
							</Flex>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			)}
			{facebook && (
				<Link href={`https://www.facebook.com/${facebook}`} isExternal>
					<IconButton
						aria-label="Search database"
						variant="outline"
						colorScheme="facebook"
						border="none"
						fontSize="20px"
						icon={<FaFacebook />}
					/>
				</Link>
			)}

			{instagram && (
				<Link
					href={`https://www.instagram.com/${instagram}`}
					isExternal
				>
					<IconButton
						aria-label="Search database"
						variant="outline"
						colorScheme="red"
						border="none"
						fontSize="20px"
						icon={<FaInstagram />}
					/>
				</Link>
			)}

			{youtube && (
				<Link href={`https://www.youtube.com/@${youtube}`} isExternal>
					<IconButton
						aria-label="Search database"
						variant="outline"
						colorScheme="red"
						border="none"
						fontSize="20px"
						icon={<FaYoutube />}
					/>
				</Link>
			)}

			{webSite && (
				<Link href={`https://${webSite}`} isExternal>
					<IconButton
						aria-label="Search database"
						variant="outline"
						colorScheme="cyan"
						border="none"
						fontSize="20px"
						icon={<TbWorld />}
					/>
				</Link>
			)}
			{googleMapsLink && (
				<Link href={googleMapsLink} isExternal>
					<IconButton
						aria-label="Search database"
						variant="outline"
						colorScheme="red"
						border="none"
						fontSize="20px"
						icon={<FaMapMarkerAlt />}
					/>
				</Link>
			)}
			{email && (
				<Popover>
					<PopoverTrigger>
						<IconButton
							aria-label="Search database"
							variant="outline"
							colorScheme="blackAlpha"
							border="none"
							fontSize="20px"
							icon={<MdEmail />}
						/>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverBody>
							<Flex align="center">
								<Icon
									as={MdEmail}
									color="blackAlpha.600"
									mr={2}
								/>
								{email}
							</Flex>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			)}
		</Flex>
	);
}

export default SocialMedia;
