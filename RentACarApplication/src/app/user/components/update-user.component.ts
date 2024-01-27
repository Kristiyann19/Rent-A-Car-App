import { Component } from "@angular/core";;
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../service/user.service";
import { CurrentUserDto } from "../dtos/current-user.dto";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})

export class UpdateUserComponent {

  updatedUserDto: CurrentUserDto = new CurrentUserDto();

  constructor(private route: ActivatedRoute, public userService: UserService){}
  
  updateUser(): void {
    debugger;
    this.userService.updateUser(this.userService.currentUserDto).subscribe(() => {
      console.log('User updated successfully');
      
    });
  }

}