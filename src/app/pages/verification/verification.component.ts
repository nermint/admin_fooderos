import { Component } from '@angular/core';
import { PhoneNumberService } from '../../core/services/phone-number.service';

// validation
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';


import { Router } from "@angular/router";

// alertify
declare let alertify:any;

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['../../app.component.css'],
  styles:[
    `
    .verification-side{
      width: 100%;
      margin: auto;
    }

    .verification_mat{
      width: 100%;
      border-color: #f00;
    }

    .show-expire-time{
      text-align: right;
      font-size: 14px;
      color: #63676c;
      margin: 8px 0;
    }
    .expire-time{
      font-size: 14px;
      color: #ff535d;
      text-align:left;
      margin-top:0px;
      padding-bottom:7px;
    }
    .disable{
      background-color: #efefef;
      color:#8c8f93;
      cursor: none;
    }
    .water-blue{
      color: #0371e8;
    }
    .resend-code .special{
      cursor: pointer;
    }
    .expire-time{
      width: 70%;
    }


    `
  ]
})
export class VerificationComponent {

  verifyPhoneNumber;
  verifyPhoneCode;
  verifyCountry_id:number;
  phoneWithSpaces;

  isActive:boolean=true;

  timeExpired:boolean=false;
  showExpiredTime:boolean =true;


  get verify_country_id(){
    return this.verifyCountry_id;
  }
  get verify_phone_number(){
    return this.verifyPhoneNumber;
  }

 securityCodeGroup= new FormGroup({
    otp : new FormControl('',[
      //Validators.requiredTrue,
      Validators.required
    ])
  });

  get securityCode() {
    return this.securityCodeGroup.get('otp');
  }

  counter = {min:0,sec:0};


  disable_btn:boolean=false;

  constructor(
    private phoneNumberService: PhoneNumberService,
    private authService: AuthService,
    private router:Router
  ) {
      this.verifyPhoneNumber = this.phoneNumberService.phoneNumber;
      this.verifyCountry_id = this.phoneNumberService.country_id;

      console.log('Verify country id '+this.verifyCountry_id+ ' and type of ' + typeof(this.verifyCountry_id));


      this.getCountryCode();

      if(this.verifyPhoneNumber){
        this.phoneWithSpaces =  this.numberWithSpaces(this.verifyPhoneNumber,'## ### ## ##');
      }


      }



  ngOnInit(): void {

       //this.startTimer(this.twoMinutes, this.display);
       this.startTimer();
  }

      minutes;
      seconds;
      intervalId;

      //intervalId
      startTimer() {
        this.counter = { min: 0, sec: 30 }
        this.intervalId = setInterval(() => {
          if (this.counter.sec - 1 == -1) {
            this.counter.min -= 1;
            this.counter.sec = 59;
          }
          else this.counter.sec -= 1
          this.minutes=this.counter.min < 10 ? "0" + this.counter.min : this.counter.min;
          this.seconds=this.counter.sec < 10 ? "0" + this.counter.sec : this.counter.sec;
          if (this.counter.min === 0 && this.counter.sec == 0) {

            clearInterval(this.intervalId);
            this.timeExpired=true;
            this.showExpiredTime = false;
            this.disable_btn=true;
            this.securityCodeGroup.markAllAsTouched();

          }

        }, 1000)
      }


    getCountryCode(){
        this.phoneNumberService.getCountryCodes().subscribe( response=> {
        let temp = response['content'].find( data => data.id === this.verifyCountry_id);
        console.log(temp['phone_code']);
        this.verifyPhoneCode = temp['phone_code'];

      })
    }

    sendedDataForVerify(){
      return {
        "country_id": this.verifyCountry_id,
        "phone" : +this.verifyPhoneNumber,
        "otp" : +this.securityCode.value
      }
    }



    verifyProcess(){
      console.log(this.sendedDataForVerify());
      if(this.securityCodeGroup.valid){
          this.authService.verify(this.sendedDataForVerify()).subscribe
          (result => {
                console.log(result);
                clearInterval(this.intervalId);
                alertify.success('Login is successful');
                this.router.navigate(['./dashboard']);
                localStorage.setItem('Token', `Bearer ${result['content'].token}`);
          });
      }
    }



    resend(){
      this.minutes=0;
      this.seconds=0;
      this.minutes=this.counter.min < 10 ? "0" + this.counter.min : this.counter.min;
      this.seconds=this.counter.sec < 10 ? "0" + this.counter.sec : this.counter.sec;
      console.log(this.minutes);
      console.log(this.seconds);
      clearInterval(this.intervalId);
      this.timeExpired = false;
      this.showExpiredTime = true;
      this.disable_btn=false;
      this.startTimer();
    }

    numberWithSpaces(value, pattern) {
      var i = 0,
      sequence = value.toString();
      return pattern.replace(/#/g, _ => sequence[i++]);
    }






}
