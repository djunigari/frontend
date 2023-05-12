declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
		}
	}
	interface Window {
		adsbygoogle?: {
		  [key: string]: unknown;
		}[];
	  }
}

export {};
