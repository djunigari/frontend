import { AspectRatio, Box, Text } from "@chakra-ui/react";
import { ICity } from "@core/model/City";
import { IPrefecture } from "@core/model/Prefecture";
import { ProfileAddress } from "@core/model/profile/ProfileAddress";
import useSearchCityByAdmAreaCode from "@frontend/lib/apollo-client/hooks/region/city/useSearchCityByAdmAreaCode";
import useGetPrefecture from "@frontend/lib/apollo-client/hooks/region/prefecture/useGetPrefecture";
import { useEffect, useState } from "react";

interface GoogleMapsProps {
	address?: ProfileAddress;
}

function GoogleMaps({ address }: GoogleMapsProps) {
	const [pref, setPref] = useState<IPrefecture>();
	const [city, setCity] = useState<ICity>();

	const { fetch: fetchPref } = useGetPrefecture({
		callbackSuccess: (value?: IPrefecture) => setPref(value),
	});

	const { fetch: fetchCity } = useSearchCityByAdmAreaCode({
		callbackSuccess: (value?: ICity) => setCity(value),
	});

	useEffect(() => {
		if (address?.prefCode) fetchPref(address.prefCode);
		if (address?.cityCode) fetchCity(address.cityCode);
	}, [address]);

	const getGoogleMapsLink = () => {
		let q = "";
		if (address) {
			const { postCode, prefCode, cityCode, address1, address2 } =
				address;

			if (postCode) q = `${postCode}`;
			if (prefCode) q = `${q} ${pref?.nameJP}`;
			if (cityCode) q = `${q} ${city?.nameJP},`;
			if (address2) q = `${q} ${address2},`;
			if (address1) q = `${q} ${address1}`;
		}

		if (!q) q = "japan";

		return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${q}`;
	};

	const title = `${pref?.name} ${city?.name ? `, ${city?.name}` : ""}`;

	return (
		<Box w="full" mt={2} rounded={"xl"} boxShadow={"lg"} p={2} bg="white">
			{pref?.name && (
				<Text fontWeight="bold">{`${pref.name} ${
					city?.name ? `, ${city?.name}` : ""
				}`}</Text>
			)}

			<AspectRatio ratio={16 / 9}>
				<iframe src={getGoogleMapsLink()} />
			</AspectRatio>
		</Box>
	);
}

export default GoogleMaps;
