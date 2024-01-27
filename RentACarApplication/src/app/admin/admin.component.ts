
import { Component } from "@angular/core";
import { HttpClient } from "@microsoft/signalr";
import { Observable } from "rxjs";
import { CarService } from "../car/service/car.service";
import { UserService } from "../user/service/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})

export class AdminComponent {
  constructor(private http: HttpClient, public carService: CarService, public userService: UserService) {}

  adminPage() {
    return this.http.get('http://localhost:19999/api/Admin')
  }
}