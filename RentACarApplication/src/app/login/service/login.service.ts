import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { LoginDto } from "../dtos/login.dto";
import { DOCUMENT } from "@angular/common";
import { UserService } from "../../user/service/user.service";
import { UserDto } from "../../user/dtos/user.dto";
import { CurrentUserDto } from "../../user/dtos/current-user.dto";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:19999/api/Login';
  public isLoggedIn = false;

  public isAgent = false;
  localStorage: Storage;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private userService: UserService) {
    this.localStorage = document.defaultView?.localStorage;
  } 
  login(userDto: LoginDto) {
      return this.http.post<any>(this.apiUrl, userDto);
  }

  logout() {
      this.localStorage?.removeItem('access_token');
      this.userService.currentUserDto = new CurrentUserDto();
      this.setIsLoggedIn(false);
  }

  setIsLoggedIn(status: boolean): void {
    this.isLoggedIn = this.localStorage?.getItem('access_token') ? true : false;
    this.isLoggedIn = status; 
  }

  getIsLoggedIn(): boolean {
    this.isLoggedIn = this.localStorage?.getItem('access_token') ? true : false;
    return this.isLoggedIn; 
  }

  setIsAgent(status: boolean) : void{
    this.isAgent = this.userService.currentUserDto.roleId ? true : false;
    this.isAgent = status;
  }

  // getIsAgent() : boolean {

  //   if(this.userService.currentUserDto?.roleId == 2 || this.userService.currentUserDto?.roleId == 3){
  //     return this.isAgent = true;
  //   } else{
      
  //     return this.isAgent = false;
  //   }

  // }

}