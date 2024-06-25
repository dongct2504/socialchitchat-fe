import { PictureDto } from '../pictureDtos/pictureDto'

export interface AppUserDetailDto {
    id: string;
    firstName: string | null;
    lastName: string | null;
    userName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    nickname: string;
    introduction: string | null;
    interest: string | null;
    idealType: string | null;
    profilePictureUrl: string | null;
    lastActive: string;
    address: string | null;
    ward: string | null;
    district: string | null;
    city: string | null;
    pictures: PictureDto[] | null;
}