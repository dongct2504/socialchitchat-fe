export interface MessageDto {
    messageId: string
    senderId: string
    senderNickName: string
    senderImageUrl: string
    content: string
    messageSent: string
    dateRead: string | null
}
