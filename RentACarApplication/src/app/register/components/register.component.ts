import { Component } from '@angular/core';
import { RegisterService } from '../service/register.service';
import { RegisterDto } from '../dtos/register.dto';

@Component({
    selector: 'app-registration',
    templateUrl: './register.component.html',
    //styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    user: RegisterDto = { userName: '', email: '', password: '', confirmPassword: '' }; 

    constructor(private registerService: RegisterService) {}

    onSubmit() : void {
        this.registerService.register(this.user)
            .subscribe((result: RegisterDto) =>{
              this.user = result;
    });
 }
}
