import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toastr: ToastrService) { }

  showSuccessMessage(message:string,title:string){
    this.toastr.success(message, title);
  }

  showErrorMessage(message:string, title:string){
    this.toastr.error(message, title);
  }

  showInfoMessage(message:string, title:string){
    this.toastr.info(message, title);
  }

  showWarning(message:string, title:string){
    this.toastr.warning(message, title);
  }
}
