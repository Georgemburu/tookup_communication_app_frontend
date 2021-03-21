import { MediaStreamInitiator } from './MediaStreamInitiator';

export type ToastType = 'info'|'error'|'success'

export interface ToastObject {
    message: string,
    type: ToastType,
    initiator: MediaStreamInitiator
}