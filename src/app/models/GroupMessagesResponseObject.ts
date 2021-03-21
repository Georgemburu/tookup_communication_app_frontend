import { User } from './User';

export interface GroupMessagesResponseObject {
    from: User|string,
    to: User|string,
    messageText: string,
    hasAttachment: boolean,
    attachmentUrl: string|null,
    hasContacts: boolean,
    contactsArrayStringiFiedObject: string, // contacts array JSON stringified
    status: string,
    timeStamp: Date,
    year: string,
    month: string,
    date: string,
    day: string,
    time: string
}