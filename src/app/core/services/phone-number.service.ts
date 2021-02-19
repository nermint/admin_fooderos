import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {
  
  phoneNumber;
  country_id: number; 
  phoneCode:number;


  constructor(private http:HttpClient) { 
    
  }

  getCountryCodes():Observable<any>{
    return this.http.get(environment.httpRequestUrl+"countries");
  }



 

  



}
