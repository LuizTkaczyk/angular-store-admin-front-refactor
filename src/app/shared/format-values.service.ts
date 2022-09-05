import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatValuesService {

  constructor(private currencyPipe:CurrencyPipe) { }

  formatCurrency(value: any) {
    value = value.replaceAll(',', '.');
    let formatedValue = this.currencyPipe.transform(Number(value), 'BRL', 'symbol');
    return formatedValue;
  }

  totalAmountPaid(value: any, quantity:number = 1) {
    if(value){
      let valueAmount = value.replaceAll('R$', '').replaceAll(',', '.');
      let total = valueAmount * quantity;
      let totalFormated = this.currencyPipe.transform(Number(total), 'BRL', 'symbol');
      return totalFormated;
    }
    return;
  }

  salePrice(percentage: any, value:any) {
    let amountPaid = Number(value.replaceAll(',', '.').replaceAll('R$', ''));
    let finalPrice = ((percentage / 100) * amountPaid) + amountPaid;
    let totalFormated = this.currencyPipe.transform(finalPrice, 'BRL', 'symbol');
    console.log(totalFormated)
    return totalFormated;
  }

  onlyNumbersInput(event: any, float?: boolean) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (!float) {
      if (charCode != 46 && charCode > 31 && charCode != 44 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
        return false;
      }
    } else {
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
        return false;
      }
    }
    return true;
  }
}
