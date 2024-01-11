import { Component } from '@angular/core';
import { RegisterService } from '../service/register.service';
import { RegisterDto } from '../dtos/register.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-registration',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    user: RegisterDto = { userName: '', email: '', password: '', confirmPassword: '' }; 
    form: FormGroup;
    submitted = false;
    constructor(private registerService: RegisterService,private formBuilder: FormBuilder) {}


    onSubmit() : void {
        this.registerService.register(this.user)
            .subscribe((result: RegisterDto) =>{
              this.user = result;
    });
 }
}
