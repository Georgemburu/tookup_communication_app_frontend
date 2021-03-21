import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private API_URL = environment.API_URL;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }


  downloadFile(targetUrl:string,fileName:string){
    console.log('Called download file:',targetUrl)
    const full_targetUrl = `${this.API_URL}/${targetUrl}`;
    // const blob = new Blob([data], { type: 'application/octet-stream' });

    // this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    let options = {
      headers: new HttpHeaders({
        'Origin':this.API_URL,
        'Access-Cotrol-Allow-Credentials': 'true',
      }),
      withCredentials: true,
      responseType: 'blob' as const
    }
    let httpGetSubscriber = this.http.get(full_targetUrl,options).subscribe((blob:any)=>{
      console.log('BLOB::',blob)
      let a = document.createElement('a');
      a.download = fileName;
      //  = new Blob([data])
      let url = window.URL.createObjectURL(blob)
       a.href = url
      a.click()
      window.URL.revokeObjectURL(url);

      // unsubscribe
      httpGetSubscriber.unsubscribe();
    })

    
  }
}
