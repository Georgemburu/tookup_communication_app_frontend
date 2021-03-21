import { User } from './User';


export interface ChatMessageObjectToSend {
    fromId: string,
    toId: string,
    messageText: string,
    hasAttachment: boolean,
    attachmentUrl: null|string,
    file: null|File,
    hasContact: boolean,
    contactId: string, // contact set id
    contactName: string,
    contactPhoneNumber: string,
    contactEmail: string,
}