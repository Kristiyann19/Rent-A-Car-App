import { Injectable } from "@angular/core";
import { UserDto } from "../user/dtos/user.dto";
import { HttpClient } from "@angular/common/http";
import { CarDto } from "../car/dtos/car.dto";

@Injectable({
  providedIn: 'root',
})

export class AdminService{

  constructor(private http: HttpClient){};

  deleteUser(id: number){
    return this.http.delete<UserDto>(`http://localhost:19999/api/Admin/User/${id}`)
  }

  deleteCar(id: number){
    return this.http.delete<CarDto>(`http://localhost:19999/api/Admin/${id}`)
  }
}
