import { Component, OnInit } from '@angular/core';
import { CurrencyConverterService } from '../services/currency-converter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  currencyData:any;
  convertorForm!: FormGroup;
  convertedRates:any = "";
  conversionObj:any;
  submitted = false;
  constructor(private converterService:CurrencyConverterService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.converterService.getCountries().subscribe((result:any)=>{
      console.log(Object.entries(result))
      this.currencyData = Object.entries(result)
    })


    this.convertorForm = this.fb.group({
      amount:['', Validators.required],
      from : ['', Validators.required],
      to: ['', Validators.required]
    })

  }

  get c() {
    return this.convertorForm.controls;
  }


 
  onConvert(data:any){
    this.submitted = true;
    if (this.convertorForm.invalid) {
      return;
    }
      console.log(data);
      this.converterService.postConversion(data.amount,data.from,data.to).subscribe((res:any)=>{
        this.convertedRates = res;
        this.conversionObj = Object.entries(res.rates)
        console.log(this.conversionObj[0][0]);
        this.submitted = false;
      })
    }
}
