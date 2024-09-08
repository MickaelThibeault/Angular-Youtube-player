import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/security/register/register.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {LoginComponent} from "./components/security/login/login.component";
import {guardGuard} from "./components/security/guard.guard";


export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [guardGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' }

];
