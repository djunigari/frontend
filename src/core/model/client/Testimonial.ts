import { TestimonialStatus } from "@core/enums/TestimonialStatus.enum";

export interface ITestimonial {
	userId: string;
	profileUid: string;
	content: string;
	status?: TestimonialStatus;
	createdAt: Date;
	updatedAt?: Date;
	userName?: string;
}
