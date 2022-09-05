import { FormatValuesService } from './../../shared/format-values.service';
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

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private currencyPipe: CurrencyPipe,
    private alert: AlertsService,
    private router: Router,
    private formatValue: FormatValuesService
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

  randomCode() {
    this.sharedService.get(Route.CODE).subscribe((code) => {
      this.form.controls['code'].setValue(code);
    })
  }

  onSubmit() {
    this.form.patchValue({
      value: Number(this.form.controls['value'].value.replaceAll(',', '.').replaceAll('R$', '')),
      sellValue: Number(this.form.controls['sellValue'].value.replaceAll(',', '.').replaceAll('R$', '')),
      buyValue: Number(this.form.controls['buyValue'].value.replaceAll(',', '.').replaceAll('R$', '')),
      percentage: Number(this.form.value.percentage),
    })
    this.sharedService.post(Route.PRODUCT, this.form.value).subscribe(
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
    this.formatValue.onlyNumbersInput(event, float);
  }

  formatCurrency(value: any) {
    this.form.controls['value'].setValue(this.formatValue.formatCurrency(value));

    this.form.controls['sellValue'].setValue(this.formatValue.salePrice(
      this.form.controls['percentage'].value,  
      this.form.controls['value'].value));
    
    this.form.controls['buyValue'].setValue(this.formatValue.totalAmountPaid(
      this.form.controls['value'].value,
      this.form.controls['quantity'].value)
    );
  }

  totalAmountPaid() {
    this.form.controls['buyValue'].setValue(
      this.formatValue.totalAmountPaid(
        this.form.controls['value'].value,
        this.form.controls['quantity'].value
      )
    );
  }

  salePrice(percentage: any) {
    this.form.controls['sellValue'].setValue(this.formatValue.salePrice(percentage,  this.form.controls['value'].value));
  }
}
