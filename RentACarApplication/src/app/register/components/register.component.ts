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
        this.registerService.register(this.user)
          .subscribe(
            (result: RegisterDto) => {
              this.user = result;
            },
            (error) => {
              if (error.status === 400) {
              
                this.serverErrors = error.error.errors; 
              } else {
                console.error('An error occurred:', error);     
              }
            }
          );
 }
}
