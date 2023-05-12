import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";

function useCookiesConsent() {
	const [consent, setConsent] = useState(true);

	useEffect(() => {
		const cookies = parseCookies();
		setConsent(Boolean(cookies["localConsent"]));
	}, []);

	const acceptCookie = () => {
		setConsent(true);
		setCookie(null, "localConsent", "true", {
			maxAge: 365 * 24 * 60 * 60,
			path: "/",
		});
		gtag("consent", "update", {
			ad_storage: "granted",
			analytics_storage: "granted",
		});
		console.log("accepring cookies");
	};

	const denyCookie = () => {
		setConsent(true);
		setCookie(null, "localConsent", "false", {
			maxAge: 1 * 60 * 60,
			path: "/",
		});
		console.log("denying cookie");
	};

	return {
		consent,
		acceptCookie,
		denyCookie,
	};
}

export default useCookiesConsent;
