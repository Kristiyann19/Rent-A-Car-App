import { Component } from '@angular/core';
import { LoginDto } from '../dtos/login.dto';
import { LoginService } from '../service/login.service';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { catchError, first, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: LoginDto = { userName: '',  password: '' }; 
  
    constructor(private loginService: LoginService, private router: Router) {}

    // onSubmit() : void {
    //     this.loginService.login(this.user)
    //     .pipe(
    //       catchError((err: HttpErrorResponse) => {
    //           return throwError(() => new Error('Invalid login.'));
    //       })
    //     )
    //     .subscribe(e => {
    //       if(e?.token){
    //         localStorage.setItem('access_token', e.token);
    //         this.router.navigate(['/home']);
    //       }
    //     })             
    // };

    onSubmit(): void {
      this.loginService.login(this.user).subscribe(
        (response: any) => {
          if (response?.token) {
            localStorage.setItem('access_token', response.token);
            this.loginService.setIsLoggedIn(true); // Set user as logged in
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
 }
}
