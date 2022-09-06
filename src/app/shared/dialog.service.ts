import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { DialogBoxComponent } from '../home/dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(msg:string,enterAnimationDuration: string, exitAnimationDuration: string){
    return this.dialog.open(DialogBoxComponent, {
      width:'250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        message:msg
      }
    })
  }
}
