import { GenderEnum } from "../../common/genderEnum";
import { SortByConstants } from "../../common/sortByConstants";
import { AppUserDto } from "./appUserDto";

export class UserParams {
    pageNumber: number = 1;
    pageSize: number = 30;
    name: string = '';
    gender: GenderEnum = GenderEnum.unknown;
    minAge: number = 16;
    maxAge: number = 99;
    sortBy: string = SortByConstants.lastActive;

    constructor() {
    }

    public chooseDisplayGender(user: AppUserDto) {
        switch (user.gender) {
            case GenderEnum.male:
                this.gender = GenderEnum.female;
                break;
            case GenderEnum.female:
                this.gender = GenderEnum.male;
                break;
            default:
                this.gender = user.gender;
        }
    }
}