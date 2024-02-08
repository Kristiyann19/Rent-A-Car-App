import { Injectable } from "@angular/core";
import { UserDto } from "../user/dtos/user.dto";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})

export class AdminService{

  constructor(private http: HttpClient){};

  deleteUser(id: number){
    return this.http.delete<UserDto>(`http://localhost:19999/api/Admin/${id}`)
  }

}
