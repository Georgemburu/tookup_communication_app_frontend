import { Group } from './Group';

export interface User  {
    _id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string,
    contacts: User[],
    groups: Group[],
    profilePictureUrl?:string
}


