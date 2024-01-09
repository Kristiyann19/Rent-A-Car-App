import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { LoginDto } from "../dtos/login.dto";
import { DOCUMENT } from "@angular/common";
import { UserService } from "../../user/service/user.service";
import { UserDto } from "../../user/dtos/user.dto";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:19999/api/Login';
  public isLoggedIn = false;
  localStorage: Storage;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private userService: UserService) {
    this.localStorage = document.defaultView?.localStorage;
  } 
  login(userDto: LoginDto) {
      return this.http.post<any>(this.apiUrl, userDto);
  }

  logout() {
      this.localStorage?.removeItem('access_token');
      this.userService.currentUserDto = new UserDto();
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
}