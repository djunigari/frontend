import { Attendance } from "@core/enums/Attendance";

export interface IRandomProfileParams {
	attendances?: Attendance[] | [];
	category?: string;
	subCategory?: string;
	country?: string;
	postCode?: string;
	prefecture?: string;
	city?: string;
	address1?: string;
	address2?: string;
}
