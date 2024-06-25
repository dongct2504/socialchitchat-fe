import { AppUserDto } from "../appUserDtos/appUserDto";

export interface AuthenticationDto {
    appUserDto: AppUserDto;
    token: string;
}