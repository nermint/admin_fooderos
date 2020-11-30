import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { VerifyGuard } from './core/guards/verify.guard';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import {TestComponent} from './pages/test/test.component';


// define routes
const routes: Routes = [
  {path: '', redirectTo:  'login', pathMatch:  'full' },
  {path: 'login', component: LoginComponent , canActivate: [LoggedInGuard]},
  {path: 'verification', component: VerificationComponent, canActivate: [VerifyGuard]},
  {path: 'home', component: HomeComponent , canActivate: [AuthGuard]} ,
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children:[
    { path: '',  component: HomeComponent},
    { path: 'tag', loadChildren: () => import('./pages/modules/tag.module').then(m => m.TagModule)},
      { path: 'test', component: TestComponent }
   ] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule { }
