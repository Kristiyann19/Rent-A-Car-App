
import { Component, OnInit } from "@angular/core";
import { CarService } from "../car/service/car.service";
import { UserService } from "../user/service/user.service";
import { UserDto } from "../user/dtos/user.dto";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AdminService } from "./admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})

export class AdminComponent  implements OnInit {
  users: UserDto[] = [];
  localStorage: Storage;
  constructor( public carService: CarService, public userService: UserService, public adminService: AdminService) {

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    return this.userService.getAll().subscribe((result: UserDto[]) => {
      this.users = result;
    });
  }

  delete(id){
    return this.adminService.deleteUser(id).subscribe(() => {
      window.location.reload();
    });
  }

}