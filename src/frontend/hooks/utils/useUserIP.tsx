import React, { useEffect, useState } from "react";

function useUserIP() {
	const getIp = async () => {
		try {
			const response = await fetch("/api/ip");
			const { ip } = await response.json();
			return ip;
		} catch (error) {
			console.log("Erro ao obter o endereço IP");
			return "";
		}
	};

	return { getIp };
}

export default useUserIP;
