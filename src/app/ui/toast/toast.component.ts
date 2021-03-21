import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastMessagesObservableService } from 'src/app/toast-messages-observable.service';
import { ToastObject } from 'src/app/models/ToastObject';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {

  toastMessageToShowObject: ToastObject;
  // toastAlertStyleType: string;
 
  // SUBSCRIBERS
  toastMessageToShowObjectSubscriber: any;

  constructor(
    private toastMessagesObservableService: ToastMessagesObservableService
  ) { }

  ngOnInit(): void {
    
    this.toastMessageToShowObjectSubscriber = this.toastMessagesObservableService.toastMessageToShowObject.subscribe((toastMessageToShowObject_)=>{
      this.toastMessageToShowObject = toastMessageToShowObject_;
      if(!toastMessageToShowObject_){
        // hide the toast if present
        this.hideToastModal()
      }else {
        // show the toast modal if message is present
        this.showToastModal()
      }
    })
  }
 
  showToastModal(){
    console.log('TOAST: SHOWING TOAST')
    let toastElem = document.querySelectorAll('#toastELem');
    if(toastElem.length>1){
      toastElem.forEach((elem,index)=>{
        if(index!==toastElem.length-1){
          elem.remove();
        }
      })
    }
    let toastElem_ = document.querySelector('#toastELem');
    if(toastElem_){
      toastElem_.classList.add('show');
    }else {
      console.log('TOAST: No toast elem found')
    }
    
  }

  hideToastModal(){
    console.log('TOAST: HIDDING TOAST')
    let toastElem = document.querySelector('#toastELem');
    if(toastElem){
      console.log('TOAST: removed toast')
      toastElem.classList.remove('show');
    }else {
      console.log('TOAST: no toast elem found')
    }
  }
 
  handleShowingAppropriateClassNames(){
    // [className]="!toastMessageToShowObject?'toast_ alert alert-info': 'toast_ alert alert-'toastMessageToShowObject.type"
    if(this.toastMessageToShowObject && this.toastMessageToShowObject){
    console.log('handleShowingAppropriateClassNames type:',this.toastMessageToShowObject.type)

      switch(this.toastMessageToShowObject.type){
        case "error":
          console.log('TYPE: ERROR return')
          return 'toast_ alert alert-danger show'

        case "info":

          return 'toast_ alert alert-info show'

        case "success":
          return 'toast_ alert alert-success show'
          
        default:
          console.log('TYPE: DEFAULT')
          return 'toast_ alert'
      }
    }else {
      return 'toast_ alert'
    }
  }
  ngOnDestroy(): void {
    this.toastMessageToShowObjectSubscriber.unsubscribe();
  }

}
