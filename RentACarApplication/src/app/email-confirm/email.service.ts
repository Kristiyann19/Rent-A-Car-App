import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient){}

  confirmEmail(token:string) : Observable<any> {
    return this.http.post<any>(`http://localhost:19999/api/Email/confirm`, {token})
}
}