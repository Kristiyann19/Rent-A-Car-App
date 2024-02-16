import { Component } from '@angular/core';
import { LoginService } from '../login/service/login.service';
import { UserService } from '../user/service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private loginService: LoginService, public userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.loginService.getIsLoggedIn();
  }

  // get isAgent(): boolean {
  //   return this.loginService.getIsAgent();
  // }

  logout(): void {
    this.loginService.logout(); 
    this.userService.getCurrentUser();
  }
}
