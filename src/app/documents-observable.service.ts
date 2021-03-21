import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {  FileDocumentType, FileDocumetExtentionsFileTypes } from './models/FileDocument';

@Injectable({
  providedIn: 'root'
})
export class DocumentsObservableService {
  private allFileDocumentsArraySubject = new BehaviorSubject<FileDocumentType[]>(null);
  allFileDocumentsArray = this.allFileDocumentsArraySubject.asObservable();

  /**
   * File types
   */
  private file_FeatherIconsClasses = {
    'code': 'fa fa-file-code-o',
    'video': 'fa fa-file-video-o',
    'word': 'fa fa-file-word-o',
    'pdf': 'fa fa-file-pdf-o',
    'text': 'fa fa-file-text-o',
    'not_found':'fa fa-file-text-o'
  }
  private codeExtentions = ['html','css','js','ts','c++','c','c#','java','php','py','go']
  private pdfExtentions = ['pdf']
  private excelExtentions = ['xl','xls','xlsx']
  private videoExtentions = ['mp4','webm']
  private audioExtentions = ['mp3','wav']


  constructor() { } 

  setAllFileDocumentsArray(fileDocumentsArray:FileDocumentType[]){
    this.allFileDocumentsArraySubject.next(fileDocumentsArray)
  }

  unsetAllFileDocumentsArray(){
    this.allFileDocumentsArraySubject.next(null)
  }

    /***
   * Most likely the append function will be used
   * since the data will come from two sources ie. Group messages and direct messages.
   * So structure the function accondingly
   */

  appendFileDocumentToExistingFileDocumentsArray(fileDocument: FileDocumentType){
    // check first if fileDocument is null
    if(!this.allFileDocumentsArraySubject.value){
      this.allFileDocumentsArraySubject.next([fileDocument])
    }else if(this.allFileDocumentsArraySubject.value.indexOf(fileDocument)!=-1){
      return;
    }else {
      this.allFileDocumentsArraySubject.next([...this.allFileDocumentsArraySubject.value,fileDocument])
    }
  }

  /**
   * file types fn
   */
  private getWhichTypeOfFile(extention:string): FileDocumetExtentionsFileTypes{
    if(this.codeExtentions.includes(extention)){
      return 'code';
    }else if(this.excelExtentions.includes(extention)){
      return 'word';
    }else if(this.videoExtentions.includes(extention)){
      return 'video';
    }else if(this.audioExtentions.includes(extention)){
      return 'audio';
    }else if(this.pdfExtentions.includes(extention)){
      return 'pdf';
    }else {
      return 'not_found';
    }

    



  }
  whichFileIcon(document_:FileDocumentType){
    let fileTypeExtention = document_.attachmentUrl.split('.')[document_.attachmentUrl.split('.').length-1];
    return this.file_FeatherIconsClasses[this.getWhichTypeOfFile(fileTypeExtention)]
    
  }
}
