import { Component } from '@angular/core';
import { LoginDto } from '../dtos/login.dto';
import { LoginService } from '../service/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',

})
export class LoginComponent {
  user: LoginDto = { userName: '',  password: '' }; 

    constructor(private loginService: LoginService) {}

    onSubmit() : void {
        this.loginService.login(this.user)
            .subscribe((result: LoginDto) =>{
              this.user = result;
    });
 }
}
