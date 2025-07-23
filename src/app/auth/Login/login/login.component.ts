import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: Boolean = false;

  constructor(private fb: FormBuilder , private authService: AuthService , private router: Router) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.loginUser(credentials).subscribe({
        next: (res: any) => {
          console.log("Login Successfully" , res);
          if (res.token) {
            this.authService.storeToken(res.token);
            this.router.navigate(['landingpage']);
          }
        },
        error: (err: any) => {
          console.error("Login Failed" , err);
          
        }
      })
      console.log('Login Successfully:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
