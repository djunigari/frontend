import { Attendance } from "@core/enums/Attendance";
import { TypeProfile } from "@core/enums/TypeProfile.enum";
import { ProfileAddress } from "./profile/ProfileAddress";
import IProfileInfo from "./profile/ProfileInfo";

export default interface IUserProfile {
	uid?: string;
	typeProfile?: TypeProfile;
	disabled?: boolean;
	displayName?: string;
	imageUrl?: string;
	email?: string;
	telephone?: string;
	whatsapp?: string;
	facebook?: string;
	instagram?: string;
	webSite?: string;
	youtube?: string;
	attendances?: Attendance[];
	category?: string;
	subCategory?: string;
	services?: string[];
	description?: string;
	notesAndComments?: string;
	address?: ProfileAddress;
	profileInfo: IProfileInfo;
}
