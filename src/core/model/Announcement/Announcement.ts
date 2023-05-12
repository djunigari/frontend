import { IAnnouncementInfo } from "./AnnouncementInfo";

export interface IAnnouncement {
	id: string;
	uid: string;
	imageUrl: string;
	url?: string;
	createdAt: Date;
	updatedAt?: Date;
	announcementInfo: IAnnouncementInfo;
}
