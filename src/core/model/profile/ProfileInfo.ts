import IProfileBookmarks from "./ProfileBookmarks";
import IProfileLikes from "./ProfileLikes";

export default interface IProfileInfo {
	totalViews: number;
	likes: IProfileLikes;
	bookmarks: IProfileBookmarks;
}
