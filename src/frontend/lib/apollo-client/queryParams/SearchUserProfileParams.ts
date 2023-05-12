import { Attendance } from "@core/enums/Attendance";

export interface ISearchUserProfileParams {
	displayName?: string;
	prefCode?: string;
	cityCode?: string;
	attendances?: Attendance[] | [];
	category?: string;
	subCategory?: string;
	services?: string[];
	query?: string;
	ip?: string;
}
