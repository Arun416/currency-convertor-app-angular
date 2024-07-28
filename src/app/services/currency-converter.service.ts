import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  constructor(private http: HttpClient) { }

  getCountries(){
   return this.http.get('https://api.frankfurter.app/currencies');
  }


  postConversion(amt:any,from:any,to:any){
    return this.http.get(`https://api.frankfurter.app/latest?amount=${amt}&from=${from}&to=${to}`)
  }
}
