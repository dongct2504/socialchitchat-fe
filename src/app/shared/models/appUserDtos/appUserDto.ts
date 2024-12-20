import { GenderEnum } from "../../common/genderEnum";

export interface AppUserDto {
    id: string;
    userName: string;
    dateOfBirth: string;
    gender: GenderEnum;
    nickname: string;
    profilePictureUrl: string | null;
    address: string | null;
    ward: string | null;
    district: string | null;
    city: string | null;
    roles: string[];
}