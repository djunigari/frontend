import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const localStorage =
	typeof window !== `undefined` ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
	key: "profileBookmarks", // this key is using to store data in local storage
	storage: localStorage, // configurate which stroage will be used to store the data
});

export const bookmarksState = atom<string[]>({
	key: "bookmarksState",
	default: [],
	effects_UNSTABLE: [persistAtom],
});
