import { IProfileResume } from "./ProfileResume";

export interface IClient {
	likes: IProfileResume[];
	bookmarks: IProfileResume[];
	testimonials: IProfileResume[];
}
