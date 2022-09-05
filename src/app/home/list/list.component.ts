import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { SocketService } from './../../shared/socket.service';
import { FormatValuesService } from './../../shared/format-values.service';
import { Product } from './../../models/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEmitterService } from './../../shared/event-emitter.service';
import { SharedService } from './../../shared/shared.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Route } from 'src/app/shared/app-const';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements OnInit {
  @ViewChild('value') value: any = ElementRef;
  @ViewChild('name') name: any = ElementRef;

  displayedColumns = ['product', 'value', 'percentage', 'sell_value', 'quantity', 'buy_value', 'code'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  formEdit: FormGroup;

  products: any;
  totalBuy: number = 0;
  totalQuantity: number = 0;
  teste;

  constructor(
    private sharedService: SharedService,
    private event: EventEmitterService,
    private formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private formatValue: FormatValuesService,
    private socket: SocketService,
    public dialog : MatDialog
  ) {

    this.formEdit = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      value: [null, [Validators.required, Validators.pattern(/[0-9\+\-\ ]/)]],
      quantity: [null, [Validators.required, Validators.minLength(1)]],
      buyValue: [null],
      percentage: [null, Validators.required],
      sellValue: [null]
    })
  }


  ngOnInit(): void {
    this.getProducts();
    this.sumTotalProducts();
    //this.socket.start();
  }

  getProducts() {
    this.sharedService.get(Route.PRODUCT).subscribe((data) => {
      this.products = data;
    })

  }

  sumTotalProducts() {
    this.sharedService.get(Route.SUM_VALUES).subscribe((data: any) => {
      this.totalBuy = data.totalBuy;
      this.totalQuantity = data.totalQuantity
    })
  }

  editItem(product: Product) {
    this.sharedService.getProduct(Route.PRODUCT, product).subscribe((product: Product) => {
      this.formEdit.controls['name'].setValue(product.name);
      this.formEdit.controls['value'].setValue(this.currencyPipe.transform(Number(product.value), 'BRL', 'symbol'));
      this.formEdit.controls['quantity'].setValue(product.quantity);
      this.formEdit.controls['sellValue'].setValue(this.currencyPipe.transform(Number(product.sell_value), 'BRL', 'symbol'));
      this.formEdit.controls['buyValue'].setValue(this.currencyPipe.transform(Number(product.buy_value), 'BRL', 'symbol'));
      this.formEdit.controls['percentage'].setValue(product.percentage);
    })

  }

  saveEdit(productEdit: any) {
    this.formEdit.patchValue({
      value: Number((this.formEdit.controls['value'].value).replaceAll(',', '.').replaceAll('R$', '')),
      sellValue: Number((this.formEdit.controls['sellValue'].value).replaceAll(',', '.').replaceAll('R$', '')),
      buyValue: Number((this.formEdit.controls['buyValue'].value).replaceAll(',', '.').replaceAll('R$', '')),
      percentage: Number(this.formEdit.value.percentage),
    })
    this.sharedService.update(Route.PRODUCT, productEdit.id, this.formEdit.value).subscribe((product: Product) => {
      this.formEdit.controls['name'].setValue(product.name);
      this.formEdit.controls['value'].setValue(this.currencyPipe.transform(Number(product.value), 'BRL', 'symbol'));
      this.formEdit.controls['quantity'].setValue(product.quantity);
      this.formEdit.controls['sellValue'].setValue(this.currencyPipe.transform(Number(product.sell_value), 'BRL', 'symbol'));
      this.formEdit.controls['buyValue'].setValue(this.currencyPipe.transform(Number(product.buy_value), 'BRL', 'symbol'));
      this.formEdit.controls['percentage'].setValue(product.percentage);

      productEdit.name = product.name;
      productEdit.value = product.value;
      productEdit.percentage = product.percentage;
      productEdit.sell_value = product.sell_value;
      productEdit.quantity = product.quantity;
      productEdit.buy_value = product.buy_value;
      productEdit.id = 0

    })
  }

  deleteProduct(product: any) {
    this.products = this.products.filter((prod) => prod.id !== product.id);
    //this.sharedService.delete(Route.PRODUCT, product.id).subscribe()
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(DialogBoxComponent, {
    
      width:'250px',
      enterAnimationDuration,
      exitAnimationDuration
    })
  }
  errorMessage(input?: any) {
    return this.formEdit.controls[input].hasError('required');
  }

  onlyNumbersInput(event: any, float?: boolean) {
    this.formatValue.onlyNumbersInput(event, float);
  }

  formatCurrency(value: any) {
    this.formEdit.controls['value'].setValue(this.formatValue.formatCurrency(value));

    this.formEdit.controls['sellValue'].setValue(this.formatValue.salePrice(
      this.formEdit.controls['percentage'].value,
      this.formEdit.controls['value'].value));

    this.formEdit.controls['buyValue'].setValue(this.formatValue.totalAmountPaid(
      this.formEdit.controls['value'].value,
      this.formEdit.controls['quantity'].value)
    );
  }

  totalAmountPaid() {
    this.formEdit.controls['buyValue'].setValue(
      this.formatValue.totalAmountPaid(
        this.formEdit.controls['value'].value,
        this.formEdit.controls['quantity'].value
      )
    );
  }

  salePrice(percentage: any) {
    this.formEdit.controls['sellValue'].setValue(this.formatValue.salePrice(percentage, this.formEdit.controls['value'].value));
  }

}