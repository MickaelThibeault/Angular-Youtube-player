import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const success = this.authService.login(this.credentials);
    if (success) {
      this.router.navigate(['/']);
    } else {
      this.loginError = true;
    }
  }

}
