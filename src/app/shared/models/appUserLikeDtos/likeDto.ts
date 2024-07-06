export interface LikeDto {
    userId: string;
    userName: string;
    nickname: string;
    dateOfBirth: Date;
    profilePictureUrl: string | null;
    city: string | null;
}
