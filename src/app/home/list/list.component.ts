import { SharedService } from './../../shared/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Route } from 'src/app/shared/app-const';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['product', 'buy_value', 'sell_value', 'percentage', 'quantity', 'code'];
  products: any;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.sharedService.get(Route.CREATE_PRODUCT).subscribe((data) => {
      this.products = data;
    })
  }

}

// buy_value: "11.22"
// code: "4258"
// created_at: "2022-08-22T00:02:01.000000Z"
// id: 1
// name: "asdf"
// percentage: "8"
// quantity: 10
// sell_value: "5"
// updated_at: "2022-08-22T00:02:01.000000Z"
// value: "55"