import { Adsense } from "@ctrl/react-adsense";

function AdBanner() {
	return (
		<Adsense
			client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID as string}
			slot="4965340818"
		/>
	);
}
export default AdBanner;
