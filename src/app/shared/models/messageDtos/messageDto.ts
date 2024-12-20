export interface MessageDto {
    messageId: string

    senderId: string
    senderUserName: string
    senderNickName: string
    senderImageUrl: string

    recipientId: string
    recipientUserName: string
    recipientNickName: string
    recipientImageUrl: string

    content: string
    messageSent: string
    dateRead: string | null
}
