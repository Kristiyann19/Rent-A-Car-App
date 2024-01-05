import { Component } from '@angular/core';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private loginService: LoginService) {}

  get isLoggedIn(): boolean {
    return this.loginService.getIsLoggedIn();
  }

  logout(): void {
    this.loginService.logout(); 
  }
}
