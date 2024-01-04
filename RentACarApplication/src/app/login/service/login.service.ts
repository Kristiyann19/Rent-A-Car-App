import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto } from "../dtos/login.dto";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:19999/api/Login';

  constructor(private http: HttpClient ) {
     
  }

  // login(userDto: LoginDto) {
  //   return this.http.post(this.apiUrl, userDto);


    login(userDto: LoginDto) {
      return this.http.post<any>(this.apiUrl, userDto);
    }

    logout() {
      debugger
      localStorage.removeItem('access_token');
  }
}



