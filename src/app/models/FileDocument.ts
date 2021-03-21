import { messageStatusTypes, Message } from './Message';
import { GMessage } from './GMessage';
export type FileDocumentType = GMessage | Message;
export type FileDocumetExtentionsFileTypes = 'code'|'video'|'audio'|'text'|'pdf'|'word'|'not_found';

// export interface FileDocument {
//     identity?: string,
//     from: string,
//     to: string,
//     messageText: string,
//     hasAttachment: boolean,
//     attachmentUrl: string,
//     hasContacts: boolean,
//     contactsArray: string, // the string here is a JSON.stringify string containing User[]
//     status: messageStatusTypes,
//     timeStamp: Date,
//     year: string,
//     month: string,
//     date: string,
//     day: string,
//     time: string
// }