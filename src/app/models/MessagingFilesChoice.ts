export type MessagingFilesChoiceType = 'ATTACHMENT'|'DOCUMENT'|'CONTACT'|'GALLERY'

export interface MessagingFileChoice {
    name: string,
    type: string,
    size: string,
    file: File
}