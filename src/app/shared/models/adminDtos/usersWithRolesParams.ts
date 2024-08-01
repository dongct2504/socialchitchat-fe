import { SortByConstants } from "../../common/sortByConstants";

export class UsersWithRolesParams {
    sortBy: string = SortByConstants.lastActive;
    pageNumber: number = 1;
    pageSize: number = 6;
}