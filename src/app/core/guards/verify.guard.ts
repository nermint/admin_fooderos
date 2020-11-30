import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PhoneNumberService } from '../services/phone-number.service';

// alertify
declare let alertify:any;

@Injectable({
  providedIn: 'root'
})
export class VerifyGuard implements CanActivate {

  constructor(private router:Router, private phoneNumberService:PhoneNumberService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.phoneNumberService.country_id != null && this.phoneNumberService.phoneNumber != null){
        return true;
      }

      alertify.error('Your phone number should be entered');
      this.router.navigate(['./login'], {queryParams: {}});
      return false;
  }
  
}
