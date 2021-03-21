import { GMessage } from './GMessage';


export interface GroupMessagesObject {
    [_id:string]: GMessage[]
}