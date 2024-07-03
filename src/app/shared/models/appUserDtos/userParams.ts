import { AppUserDto } from "./appUserDto";

export class UserParams {
    pageNumber: number = 1;
    pageSize: number = 6;
    gender: string = "";
    minAge: number = 16;
    maxAge: number = 99;

    constructor() {
    }

    public chooseDisplayGender(user: AppUserDto) {
        switch (user.gender) {
            case 'male':
                this.gender = 'female';
                break;
            case 'female':
                this.gender = 'male';
                break;
            default:
                this.gender = user.gender;
        }
    }
}