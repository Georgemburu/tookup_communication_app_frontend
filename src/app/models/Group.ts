import { User } from './User';

export interface Group {
    _id: string,
    groupName: string,
    createdBy: User|string,
    participants: string[],
    createdAt: Date,
    profilePictureUrl?:string
}

