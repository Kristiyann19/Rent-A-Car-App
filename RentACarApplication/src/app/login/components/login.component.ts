import { Component } from '@angular/core';
import { LoginDto } from '../dtos/login.dto';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/service/user.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentUserDto } from '../../user/dtos/current-user.dto';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: LoginDto = { userName: '',  password: '' }; 
  subject = new Subject<number>()
  form: FormGroup;
  serverErrors: any = {};
  submitted = false;
  loginError: Boolean = false;

    constructor(private loginService: LoginService, private router: Router, private userService: UserService, private fb: FormBuilder) {

      this.form = this.fb.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
      })
    }

    onSubmit(): void {
      const loginDto: LoginDto = this.form.value as LoginDto;
      this.submitted = true;
      this.loginService.login(loginDto).subscribe(
        (response: any) => {
          if (response?.token) {
            localStorage.setItem('access_token', response.token);
            this.loginService.setIsLoggedIn(true); 
            this.userService.getCurrentUser();
            if (this.userService.currentUserDto.roleId == 3){
              this.router.navigate(['admin'])
            }
            this.router.navigate(['']);
          }
        },
        (error) => {
          console.error('Login failed:', error);
          this.loginError = true;
        }
      );
 }


}
