import { MessageConstants } from "../../common/messageConstants";

export class MessageParams {
    contain: string = MessageConstants.inbox;
    pageNumber: number = 1;
    pageSize: number = 6;
}