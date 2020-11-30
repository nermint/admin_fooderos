import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// reactive - forms module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//  material
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// components
import { LoginComponent } from './pages/login/login.component';
import { VerificationComponent } from './pages/verification/verification.component';

// router
import { AppRoutingModule } from './app-routing.module';

// http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// http error interceptor
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// recaptcha
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

// jwt
import {JwtModule} from '@auth0/angular-jwt';

// core module for tags
import { CoreModule } from './core/core.module';
import { TestComponent } from './pages/test/test.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VerificationComponent,
    HomeComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://dev-api.fooderos.com/api/']
      }
    }),
  ],
  providers: [
   {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
   },
   {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
