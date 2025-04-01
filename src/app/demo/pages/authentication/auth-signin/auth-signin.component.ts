import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export class AuthSigninComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  submitted = false;

  constructor(
    private router: Router, 
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true; 
    if (form.invalid) {
      return;
    }

    this.apiService.login(this.email, this.password).subscribe(
      (response: any) => {
        const token = response.access_token;
        const decodedToken: any = jwtDecode(token);
        localStorage.setItem('access_token', token);
        if (decodedToken.role === 'Customer') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/forms']);
        }
      },
      (error) => {
        this.showSnackbar('Invalid credentials, please try again.', 'error');
      }
    );
  }

  showSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
