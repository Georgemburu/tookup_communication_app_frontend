import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentsObservableService } from 'src/app/documents-observable.service';
import { FileDocumentType, FileDocumetExtentionsFileTypes } from 'src/app/models/FileDocument';
import { DownloadService } from 'src/app/download.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  allFileDocumentsArray:FileDocumentType[];

  // LOCALS
  // file_FeatherIconsClasses = {
  //   'code': 'fa fa-file-code-o',
  //   'video': 'fa fa-file-video-o',
  //   'word': 'fa fa-file-word-o',
  //   'pdf': 'fa fa-file-pdf-o',
  //   'text': 'fa fa-file-text-o',
  //   'not_found':'fa fa-file-text-o'
  // }
  // codeExtentions = ['html','css','js','ts','c++','c','c#','java','php','py','go']
  // pdfExtentions = ['pdf']
  // excelExtentions = ['xl','xls','xlsx']
  // videoExtentions = ['mp4','webm']
  // audioExtentions = ['mp3','wav']
 
  



  // SUBSCRIBERS
  allFileDocumentsArraySubscriber: any;
  constructor(
    private documentsObservableService: DocumentsObservableService,
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    this.allFileDocumentsArraySubscriber = this.documentsObservableService.allFileDocumentsArray.subscribe((allFileDocumentsArray_)=>{
      this.allFileDocumentsArray = allFileDocumentsArray_;
    })
  }


  // getWhichTypeOfFile(extention:string): FileDocumetExtentionsFileTypes{
  //   if(this.codeExtentions.includes(extention)){
  //     return 'code';
  //   }else if(this.excelExtentions.includes(extention)){
  //     return 'word';
  //   }else if(this.videoExtentions.includes(extention)){
  //     return 'video';
  //   }else if(this.audioExtentions.includes(extention)){
  //     return 'audio';
  //   }else if(this.pdfExtentions.includes(extention)){
  //     return 'pdf';
  //   }else {
  //     return 'not_found';
  //   }

    



  // }
  whichFileIcon(document_:FileDocumentType){
    return this.documentsObservableService.whichFileIcon(document_);
  }


  // download
  handleDownloadDocument(document_:FileDocumentType){
    console.log('called handleDownloadDocument fn')
    // if(message_.from==this.userInfoObject._id)return
    let attachmentUrl = document_.attachmentUrl;
    // download
    let splitUrl = attachmentUrl.split('/')
    let fileName = splitUrl[splitUrl.length-1]
    this.downloadService.downloadFile(attachmentUrl,fileName)
  }
  ngOnDestroy(): void {
    this.allFileDocumentsArraySubscriber.unsubscribe();
  }
 
}
