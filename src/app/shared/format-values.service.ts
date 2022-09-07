import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatValuesService {

  constructor(private currencyPipe:CurrencyPipe) { }

  formatCurrency(value: any) {
    value = value.replaceAll(',', '.');
    let formatedValue = value;
    return formatedValue;
  }

  totalAmountPaid(value: any, quantity:number = 1) {
    if(value){
      let valueAmount = value.replaceAll('R$', '').replaceAll(',', '.');
      let total = valueAmount * quantity;
      let totalFormated = total;
      return totalFormated.toFixed(2);
    }
    return;
  }

  salePrice(percentage: any, value:any) {
    let amountPaid = Number(value.replaceAll(',', '.').replaceAll('R$', ''));
    let finalPrice = ((percentage / 100) * amountPaid) + amountPaid;
    let totalFormated = finalPrice;
    return totalFormated.toFixed(2);
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
