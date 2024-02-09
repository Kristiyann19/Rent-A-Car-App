// email-confirmation.component.ts

import { Component, OnInit } from '@angular/core';
import { EmailService } from './email.service';
import { UserService } from '../user/service/user.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html'
})
export class EmailConfirmationComponent {
  constructor(private emailService: EmailService, public userService: UserService) { }

  confirm(token: string) {
    return this.emailService.confirmEmail(token).subscribe(
      response => {
        console.log(response)
      }, error => {
        console.log(error)
      }
    )
  }
  
}
