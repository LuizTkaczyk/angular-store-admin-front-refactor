import { SharedService } from './../../shared/shared.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from 'src/app/shared/app-const';
import { CurrencyPipe } from '@angular/common';
import { AlertsService } from 'src/app/shared/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('value') value: any = ElementRef;
  @ViewChild('quantity') quantity: any = ElementRef;
  @ViewChild('buy_value') buy_value: any = ElementRef;
  @ViewChild('sell_value') sell_value: any = ElementRef;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private currencyPipe: CurrencyPipe,
    private alert: AlertsService,
    private router :Router
  ) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      value: [null, [Validators.required, Validators.pattern(/[0-9\+\-\ ]/)]],
      quantity: [null, [Validators.required, Validators.minLength(1)]],
      buyValue: [null],
      percentage: [null, Validators.required],
      sellValue: [null],
      code: [null]
    });

  }

  ngOnInit(): void {
    this.form.controls['quantity'].setValue(1);
    this.randomCode();
  }

  randomCode(){
    this.sharedService.get(Route.CODE).subscribe((code)=>{
      this.form.controls['code'].setValue(code);
    })
  }

  onSubmit() {
    this.form.patchValue({
      value: Number(this.value.nativeElement.value.replaceAll(',','.').replaceAll('R$','')),
      sellValue: Number(this.sell_value.nativeElement.value.replaceAll(',','.').replaceAll('R$','')),
      buyValue: Number(this.buy_value.nativeElement.value.replaceAll(',','.').replaceAll('R$','')),
      percentage: Number(this.form.value.percentage),
    })
    this.sharedService.post(Route.CREATE_PRODUCT, this.form.value).subscribe(
      success => {
        this.alert.showSuccessMessage('Produto salvo!', 'Sucesso!')
      }, 
      error => {
        this.alert.showErrorMessage('Erro ao salvar o produto!', 'Atenção!')
      }
      );
      this.form.reset();
      this.randomCode();
  }

  onCancel() {
    console.log('cancelar')
  }

  errorMessage(input: any) {
    return this.form.controls[input].hasError('required');
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

  formatCurrency(element: any) {
    let value = element.target.value.replaceAll(',', '.');
    let formatedValue = this.currencyPipe.transform(Number(value), 'BRL', 'symbol');
    element.target.value = formatedValue;
  }

  totalAmountPaid(value: any) {
    let valueAmount = this.value.nativeElement.value;
    valueAmount = valueAmount.replaceAll('R$', '').replaceAll(',', '.');
    let total = value * valueAmount;
    let totalFormated = this.currencyPipe.transform(Number(total), 'BRL', 'symbol');
    return this.form.patchValue({ buyValue: totalFormated })
  }

  salePrice(value: any) {
    let amountPaid = Number(this.form.value.value.replaceAll(',', '.'));
    let finalPrice = ((value / 100) * amountPaid) + amountPaid;
    let totalFormated = this.currencyPipe.transform(finalPrice, 'BRL', 'symbol');
    return this.form.patchValue({ sellValue: totalFormated });
  }
}
