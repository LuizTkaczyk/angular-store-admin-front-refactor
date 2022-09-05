import { SocketService } from './../../shared/socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  constructor(private socket : SocketService) { }

  ngOnInit(): void {
    this.socket.start();
  }

}
