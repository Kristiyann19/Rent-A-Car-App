
import { Component, OnInit } from "@angular/core";
import { CarService } from "../car/service/car.service";
import { UserService } from "../user/service/user.service";
import { UserDto } from "../user/dtos/user.dto";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AdminService } from "./admin.service";
import { AgentDetailsDto } from "../user/dtos/agent-details.dto";
import { UserAdminViewDto } from "../user/dtos/all-property-user.dto";
import { catchError, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})

export class AdminComponent  implements OnInit {
  users: UserAdminViewDto[] = [];
  agentDetails: AgentDetailsDto = new AgentDetailsDto();
  showCars = false;
  localStorage: Storage;
  constructor( public carService: CarService, public userService: UserService, public adminService: AdminService, private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    return this.userService.getAll().subscribe((result: UserAdminViewDto[]) => {
      this.users = result;
    });
  }

  delete(id){
    return this.adminService.deleteUser(id).subscribe(() => {
      window.location.reload();
    });
  }


}