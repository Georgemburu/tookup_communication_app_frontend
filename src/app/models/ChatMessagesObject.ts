import { Message } from './Message';

export interface ChatMessagesObject {
    [_id:string]: Message[]   // _id==chatting with id
}