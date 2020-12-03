import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//  import { AuthService } from 'src/app/core/services/auth.service';
import { AuthService } from 'services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

// alertify
declare let alertify: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
    ) { }

  ngOnInit(): void {
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('Token'))) {
      console.log('Token is expired');
      this.router.navigate(['./login']);
    } else {
      console.log('Token is valid');
    }
  }


      logout(){
        //  alertify.error('Log out.');
        // localStorage.removeItem('Token');
        // this.router.navigate(['./login']);
        this.authService.logout().subscribe(result => {
          console.log(result);
          alertify.error('Log out.');
          localStorage.removeItem('Token');
          this.router.navigate(['./login']);
        });
    }
}
