import { Component } from '@angular/core';
import { LoginService } from '../login/service/login.service';
import { UserService } from '../user/service/user.service';
import { UserDto } from '../user/dtos/user.dto';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private loginService: LoginService, private userService: UserService) {}

  currentUser: UserDto = new UserDto();


  // getCurrentUser(): any{
  //   this.userService.getCurrentUser().subscribe(result =>{
  //     result = this.currentUser
  //   });
  // };
  get isLoggedIn(): boolean {
    return this.loginService.getIsLoggedIn();
  }

  get isAgent(): boolean {
    return this.userService.getIsAgent();
  }

  logout(): void {
    this.loginService.logout(); 
  }
}
