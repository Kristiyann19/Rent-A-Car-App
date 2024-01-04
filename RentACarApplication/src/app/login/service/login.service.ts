import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto } from "../dtos/login.dto";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:19999/api/Login';
  private isLoggedIn = false;

  constructor(private http: HttpClient ) {
     
  }

  // login(userDto: LoginDto) {
  //   return this.http.post(this.apiUrl, userDto);


    login(userDto: LoginDto) {
      return this.http.post<any>(this.apiUrl, userDto);
    }

    logout() {
      localStorage.removeItem('access_token');
      this.setIsLoggedIn(false);
  }

  setIsLoggedIn(status: boolean): void {
    this.isLoggedIn = status; // Set the logged-in status
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn; // Get the logged-in status
  }
}



