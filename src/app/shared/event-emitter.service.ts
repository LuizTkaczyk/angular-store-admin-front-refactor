import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  constructor() { }
  dataEvent = new EventEmitter<any>;

}
