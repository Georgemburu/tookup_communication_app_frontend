// group messages interface
import { User } from './User';

export interface GMessage {
    from: User|string,
    to: User|string,
    messageText: string,
    hasAttachment: boolean,
    attachmentUrl: string|null,
    hasContact: boolean,
    contactId: string, // contact set id
    contactName: string,
    contactPhoneNumber: string,
    contactEmail: string,
    status: string,
    timeStamp: Date,
    year: string,
    month: string,
    date: string,
    day: string,
    time: string  
}

