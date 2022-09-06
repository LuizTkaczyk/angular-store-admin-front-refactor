import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { EventEmitterService } from './event-emitter.service';
import { Echo } from 'laravel-echo-ionic';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  echo: Echo;

  constructor(private emmiter: EventEmitterService) { }

  start() {
    // this.echo = new Echo({
    //   broadcaster: 'socket.io',
    //   host: environment.echoServer,
    // })

    // this.echo.connector.socket.on('connect', function () {
    //   console.log('CONNECTED');
    // });

    // this.echo.connector.socket.on('reconnecting', function () {
    //   console.log('CONNECTING');
    // });

    // this.echo.connector.socket.on('disconnect', function () {
    //   console.log('DISCONNECTED');
    // });

    // this.echo.channel('update-product').listen('.update.product', (data: any) => {
    //   this.emmiter.dataEvent.emit(data.product);
    //   //console.log(data);
    // });
  }
}
