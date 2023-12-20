import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterDto } from '../dtos/register.dto';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private apiUrl = 'http://localhost:19999/api/Register';

    constructor(private http: HttpClient) {}

    register(userDto: RegisterDto) {
        return this.http.post(this.apiUrl, userDto);
    }
}