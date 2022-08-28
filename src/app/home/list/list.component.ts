import { SharedService } from './../../shared/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Route } from 'src/app/shared/app-const';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['product', 'value', 'percentage', 'sell_value', 'quantity', 'buy_value', 'code', 'action'];
  products: any;
  totalBuy: number = 0;
  totalQuantity: number = 0;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getProducts();
    this.sumTotalProducts();
  }

  getProducts() {
    this.sharedService.get(Route.CREATE_PRODUCT).subscribe((data) => {
      this.products = data;
    })
  }

  sumTotalProducts() {
    this.sharedService.get(Route.SUM_VALUES).subscribe((data: any) => {
      this.totalBuy = data.totalBuy;
      this.totalQuantity = data.totalQuantity
    })
  }
}