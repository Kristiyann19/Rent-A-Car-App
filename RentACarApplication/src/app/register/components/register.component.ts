import { Component } from '@angular/core';
import { RegisterService } from '../service/register.service';
import { RegisterDto } from '../dtos/register.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    user: RegisterDto = new RegisterDto(); 
    form: FormGroup;
    serverErrors: any = {};
    submitted = false;
    registerError: Boolean = false;

    constructor(private registerService: RegisterService, private fb: FormBuilder, private router: Router) {
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
            () => {
              console.log('User registered successfully');
              this.router.navigate(['/login'])
            },
            (error) => {
              console.error('Register Failed:', error);
              this.registerError = true
            }
          )};
 }

 checkUsernameAvailability(): void{
  const userName = this.form.get('userName').value;

  if(userName){
    this.registerService.checkUsernameAvailability(userName).subscribe(available => {
      if (!available){
        this.form.get('userName').setErrors({'alreadyTaken' : true});
      }
    });
  }
 }

 checkEmailAvailability() : void {
  const email = this.form.get('email').value;

  if (email) {
    this.registerService.checkEmailAvailability(email).subscribe(available => {
      if(!available){
        this.form.get('email').setErrors({'alreadyTaken' : true});
      }
    });
  }
 }
}
