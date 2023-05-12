export interface IPageInfo {
	totalCount: number;
	startCursor: number;
	endCursor: number;
	take: number;
	skip: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}
