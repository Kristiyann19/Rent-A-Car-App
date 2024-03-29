import { Component, OnInit } from '@angular/core';
import { UserDto } from './user/dtos/user.dto';
import { LoginService } from './login/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RentACar';
  user: UserDto;

  constructor(
      private router: Router,
      private loginService: LoginService,
  ) {
       
  }

  logout() {
      this.loginService.logout();
      this.router.navigate(['/login']);
  }
}
