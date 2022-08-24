import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from 'src/app/shared/app-const';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private currencyPipe : CurrencyPipe
  ) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      value: [null, [Validators.required, Validators.pattern(/[0-9\+\-\ ]/)]],
      quantity: [null, Validators.required],
      buyValue: [null],
      percentage: [null, Validators.required],
      sellValue: [null],
      code: [null]
    });

    // this.form.valueChanges.subscribe( form =>{
    //   if(form.value){
    //     this.form.patchValue({
    //       value: this.currencyPipe.transform(form.value.replace(/\D/g, '').replace(/^0+/, ''), 'BRL', 'symbol', '1.0','pt')
    //     }, {emitEvent:false})
    //   }
    // })

  }

  ngOnInit(): void {
  }

  onSubmit() {
    //this.sharedService.post(Route.CREATE_PRODUCT, this.form.value).subscribe();
    console.log(this.form.value)
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
}
