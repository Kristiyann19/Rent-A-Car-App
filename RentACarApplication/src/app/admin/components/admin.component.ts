
import { Component, OnInit} from "@angular/core";
import { CarService } from "../../car/service/car.service";
import { UserService } from "../../user/service/user.service";
import { AdminService } from "../service/admin.service";
import { AgentDetailsDto } from "../../user/dtos/agent-details.dto";
import { UserDto } from "../../user/dtos/user.dto";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent  implements OnInit {
  users: UserDto[] = [];
  agentDetails: AgentDetailsDto = new AgentDetailsDto();
  showCars = false;
  localStorage: Storage;
  constructor( public carService: CarService, 
    public userService: UserService, 
    public adminService: AdminService
    ) {  } 

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