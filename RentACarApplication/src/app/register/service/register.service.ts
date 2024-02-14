import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterDto } from '../dtos/register.dto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private apiUrl = 'http://localhost:19999/api/Register';

    constructor(private http: HttpClient) {}

    register(userDto: RegisterDto) {
        return this.http.post(this.apiUrl, userDto);
    }

    checkUsernameAvailability(username: string) : Observable<boolean>{
        return this.http.get<boolean>(`http://localhost:19999/api/Register/check-username/${username}`);
    }

   checkEmailAvailability(email: string) : Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:19999/api/Register/check-email/${email}`)
   }
}