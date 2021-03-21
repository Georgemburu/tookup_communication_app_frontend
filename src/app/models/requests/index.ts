import { User } from '../User';
import { Message } from '../Message';
import { Group } from '../Group';
import { ChatMessagesObject } from '../ChatMessagesObject';
import { GroupMessagesObject } from '../GroupMessagesObject';
import { GMessage } from '../GMessage';

export interface GetUserResponse {
    success: boolean,
    message: string,
    userObj?: User
}


export interface GetChatMessagesResponse {
    success: boolean,
    message: string,
    chatMessages?: ChatMessagesObject,
    orderedObj: any;

}


export interface GetCurentUserGroupsResponse {
    success: boolean,
    message: string,
    groups?: Group[]
}


export interface AddContactResponse {
    success: boolean,
    message: string,
    contactToBeAdded_Id?:string
}

export interface DefaultResponse {
    success: boolean,
    message: string
}

export type msg = string | DefaultResponse;
export interface SignUpResponse {
    success: boolean,
    message: msg,
    message1?: string 
}
export interface DefaultGetNotificationsFromDBResponse {
    success: boolean,
    message: string,
    notifications: any 
}

// GROUP
export interface CreateGroupResponse {
    success: boolean,
    message: string,
    createdGroup: Group
}

export interface GetAllUserGroupsMessagesFromBDResponse {
    success: boolean,
    message: string,
    groupMessagesObject: GroupMessagesObject
}

export interface AcceptGroupInvitationRequestResponse {
    success: boolean,
    message: string,
    group?: Group
}

export interface sendMessageWithFileRequestResponse {
    success: boolean,
    message: string,
    mode: string,
    userFromObj?:User ,
    sentMessage: Message
}

export interface sendGroupMessageWithFileRequestResponse {
    success: boolean,
    message: string,
    messageStatus: string,
    sentMessage: GMessage
  
}

export interface SendDirectMessageWithNoFileRequestResponse {
    success: boolean,
    message: string,
    messageStatus: string,
    sentMessage: Message
}

export interface SendContactToGroupChatRequestResponse {
    success: boolean,
    message: string,
    messageStatus: string,
    sentMessage: GMessage
}

export interface SendContactToDirectChatRequestResponse {
    success: boolean,
    message: string,
    messageStatus: string,
    sentMessage: Message
}

export interface sendGroupMessageWithNoFileRequestResponse {
    success: boolean,
    message: string,
    messageStatus: string,
    sentMessage: GMessage
}
