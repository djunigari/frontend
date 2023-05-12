import {
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
} from "@chakra-ui/react";
import React from "react";
import InputMask from "react-input-mask";

interface ContactProps {
	email?: string;
	whatsapp?: string;
	facebook?: string;
	instagram?: string;
	webSite?: string;
	googleMapsLink?: string;
	setUserProfileProps: (name: string, value: any) => void;
}

function Contact({
	email,
	whatsapp,
	facebook,
	instagram,
	webSite,
	googleMapsLink,
	setUserProfileProps,
}: ContactProps) {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserProfileProps(event.target.name, event.target.value);
	};

	return (
		<>
			<FormControl isRequired>
				<FormLabel>Email de contato</FormLabel>
				<Input
					name="email"
					value={email || ""}
					type="email"
					onChange={onChange}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>WhatsApp</FormLabel>
				<Input
					name="whatsapp"
					as={InputMask}
					mask="+99 (999) 9999-9999"
					value={whatsapp || ""}
					onChange={onChange}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Facebook</FormLabel>
				<InputGroup size="sm">
					<InputLeftAddon children="facebook.com/" />
					<Input
						name="facebook"
						value={facebook || ""}
						placeholder="nome do meu perfil"
						onChange={onChange}
					/>
				</InputGroup>
			</FormControl>
			<FormControl>
				<FormLabel>Instagram</FormLabel>
				<InputGroup size="sm">
					<InputLeftAddon children="instagram.com/" />
					<Input
						name="instagram"
						value={instagram || ""}
						placeholder="nome do meu perfil sem @"
						onChange={onChange}
					/>
				</InputGroup>
			</FormControl>
			<FormControl>
				<FormLabel>WebSite</FormLabel>
				<InputGroup size="sm">
					<InputLeftAddon children="https://" />
					<Input
						name="webSite"
						value={webSite || ""}
						placeholder="mysite"
						onChange={onChange}
					/>
				</InputGroup>
			</FormControl>
			<FormControl>
				<FormLabel>Google Maps Link</FormLabel>
				<InputGroup size="sm">
					<Input
						name="googleMapsLink"
						value={googleMapsLink || ""}
						placeholder="https://goo.gl/maps/....."
						onChange={onChange}
					/>
				</InputGroup>
			</FormControl>
		</>
	);
}

export default Contact;
