import { User } from './User';


export type messageStatusTypes = "sent"|"delivered"|"read";
export interface Message {
    identity: string,
    from: string,
    to: string,
    messageText: string,
    hasAttachment: boolean,
    attachmentUrl: string,
    hasContact: boolean,
    contactId: string, // contact set id
    contactName: string,
    contactPhoneNumber: string,
    contactEmail: string,
    status: messageStatusTypes,
    timeStamp: Date,
    year: string,
    month: string,
    date: string,
    day: string,
    time: string
}


// export interface MessageNewObject {
//     messages?:Message[],
//     from: User|string,
//     to: User|string
// }

export interface NewOrderedChatMessagesForDisplay {
    messages?:Message[],
    from: User|string,
    to: User|string
}
// export interface NewOrderedchatMessagesForDisplay {
//     []
// }

export interface ReceiveMessagePayload {
    from: string,
    to: string,
    messageText:string,
    hasAttachment: boolean ,
    attachmentUrl?: string,
    userFromObj:User
  }