import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RegisterDto } from "../dtos/register.dto";

@Injectable({
  providedIn: 'root',
})

export class RegisterService{
    constructor(private http : HttpClient) {}


    getRegister() : Observable<RegisterDto>{
      return this.http.get<RegisterDto>('http://localhost:19999/api/Register')
    }

    // registerUser(userData: RegisterDto): Observable<RegisterDto> {
    //   return this.http.post<RegisterDto>('http://localhost:19999/api/User', userData)
    // }
}

