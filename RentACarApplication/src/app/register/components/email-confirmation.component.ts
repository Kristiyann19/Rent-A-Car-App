// email-confirmation.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-email-confirmation',
  template: '<div>{{ message }}</div>'
})
export class EmailConfirmationComponent implements OnInit {
  message: string;

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegisterService
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['access_token'];

    if (token) {
      this.registrationService.confirmEmail(token).subscribe(
        () => {
          this.message = 'Email confirmed successfully';
        },
        (error) => {
          console.error('Email confirmation failed:', error);
          this.message = 'Email confirmation failed';
        }
      );
    } else {
      this.message = 'Invalid token';
    }
  }
}
