export interface GroupChatDto {
    id: string;
    groupName: string;
    isGroupChat: boolean;
    participantIds: string[];
    lastMessageContent: string;
    lastMessageSent: string;
}