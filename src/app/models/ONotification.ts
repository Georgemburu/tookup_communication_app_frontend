// One on One Notifications interface
import { User } from './User';
import { messageStatusTypes } from './Message';

export type ONotificationsTypes  =  'friend_request'|'profile_picture_update'

export interface ONotification {
    _id: string,
    from: User|string,
    to: User|string,
    read: messageStatusTypes,
    title: string,
    message: string,
    type: ONotificationsTypes,
    createdAt: Date
}