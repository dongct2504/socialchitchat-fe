export interface MessageDto {
    messageId: string
    senderId: string
    senderUserName: string
    senderImageUrl: string
    recipientId: string
    recipientUserName: string
    recipientImageUrl: string
    content: string
    messageSent: string
    dateRead: string | null
}
