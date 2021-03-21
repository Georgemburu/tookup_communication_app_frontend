import { User } from './User';
import { Group } from './Group';
import { messageStatusTypes } from './Message';

export type GNotificationTypes = 'group_invitation'

export interface GNotification {
    _id: string,
    from: User|string,
    forGroup: Group|string,
    to: User|string,
    read: messageStatusTypes,
    title: string,
    message: string,
    type: GNotificationTypes,
    createdAt: Date
}