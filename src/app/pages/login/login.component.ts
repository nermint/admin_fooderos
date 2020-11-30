import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { PhoneNumberService } from '../../core/services/phone-number.service';
import { AuthService } from '../../core/services/auth.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ICountry } from 'src/app/shared/models/country';



// interface Code{
//   value:string;
// }


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
  styleUrls: ['../../app.component.css'],
  styles:[
    `
    .mat-form-fiel_1{
      width: 100px;
    }
    .mat-form-fiel_2{
      width: 300px;
    }
    .g-recaptcha {
      transform:scale(0.97);
      transform-origin:0 0;
      margin: 20px auto;
      display: table
    }
    re-captcha {
      transform-origin:0 0;
      margin: 20px auto 0;
      display: table
    }
    
    `
  ]
})
export class LoginComponent {
  
  countries:ICountry;

  mobNumberPattern = "^((\\+91-?)|0)?[0-9 ]{9}$"; 
  phoneNumberGroup:FormGroup;

  initForm(){
    this.phoneNumberGroup= new FormGroup({
      country_id : new FormControl('',[
       // Validators.requiredTrue,
        Validators.required
      ]),
      phone: new FormControl('',[
          Validators.required,
         // Validators.requiredTrue
      ]),
      recaptchaReactive: new FormControl('', [
        //Validators.required
      ])
    });
  }
  
 
  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
  }

  get country_id(){
    return this.phoneNumberGroup.get('country_id');
  }
  get get_phone(){
    return this.phoneNumberGroup.get('phone');
  }



  constructor(
    private router:Router,
     private phoneNumberService:PhoneNumberService,
     private authService:AuthService,
     ) {


      this.phoneNumberService.getCountryCodes().subscribe(response =>{
        this.countries = response['content'] as ICountry;
        //console.log(this.countries);
      })
     
  }

  ngOnInit(): void {

    this.initForm();
    
    this.getPhoneNumber();
    
  }

 


  getPhoneNumber(){

    this.phoneNumberService.country_id = this.country_id.value;
    this.phoneNumberService.phoneNumber = this.get_phone.value;
    

 }

 loginProcess(){
   if(this.phoneNumberGroup.valid){
     this.authService.login(this.phoneNumberGroup.value)
     //this.authService.login(sendedData)
     .subscribe( result => {
          if(result)
            this.router.navigate(['./verification']);
     });
   }
 }





}
