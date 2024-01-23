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
    serverErrors: any = {};
    submitted = false;
    registerError: Boolean = false;
    constructor(private registerService: RegisterService, private fb: FormBuilder) {
        this.form = this.fb.group({
            userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
            email: ['', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(30)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
          })
    }


    onSubmit(): void {      
      this.submitted = true;
      if(this.form.valid){
        const registerDto: RegisterDto = this.form.value as RegisterDto;
      
        this.registerService.register(registerDto)
          .subscribe(
            (result: RegisterDto) => {
              // this.registerService.sendConfirmationEmail(this.user.email)
              this.user = result;
            },
            (error) => {
              console.error('Register Failed:', error);
              this.registerError = true
              
            }
          )};
 }
}
