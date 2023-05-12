// components/Location.tsx

import React, { useState, useEffect } from "react";

interface Location {
	latitude: number | null;
	longitude: number | null;
}

function Location() {
	const [location, setLocation] = useState<Location>({
		latitude: null,
		longitude: null,
	});
	const [error, setError] = useState<string | null>(null);

	const getLocation = () => {
		if (!navigator.geolocation) {
			setError("Geolocalização não é suportada neste navegador.");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log(position);
				setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				setError(null);
			},
			(error) => {
				setError("Erro ao obter localização.");
			}
		);
	};

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<div>
			<h1>Localização do usuário</h1>
			{error ? (
				<p>{error}</p>
			) : (
				<pre>{JSON.stringify(location, null, 2)}</pre>
			)}
		</div>
	);
}

export default Location;
