import { Component } from '@angular/core';
import { LoginDto } from '../dtos/login.dto';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/service/user.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: LoginDto = { userName: '',  password: '' }; 
  subject = new Subject<number>()

    constructor(private loginService: LoginService, private router: Router, private userService: UserService) {}

    onSubmit(): void {
      this.loginService.login(this.user).subscribe(
        (response: any) => {
          if (response?.token) {
            localStorage.setItem('access_token', response.token);
            this.loginService.setIsLoggedIn(true); 
            this.userService.getCurrentUser();
            this.router.navigate(['']);
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
 }
}
