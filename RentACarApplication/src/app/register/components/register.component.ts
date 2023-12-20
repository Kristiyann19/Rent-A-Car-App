import { Component } from '@angular/core';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  register: RegisterDto = new RegisterDto();

  constructor (private registerService: RegisterService){}

  ngOnInit() : void {
    this.registerService.getRegister().subscribe((result: RegisterDto) =>{
      this.register = result;
    })
  }
}
