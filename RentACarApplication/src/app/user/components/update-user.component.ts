import { Component } from "@angular/core";;
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../service/user.service";
import { UserDto } from "../dtos/user.dto";
import { CurrentUserDto } from "../dtos/current-user.dto";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html'
})

export class UpdateUserComponent {

  currentUserDto: CurrentUserDto = new CurrentUserDto();

  constructor(private route: ActivatedRoute, public userService: UserService){}
  

  ngOnInit(){

  }


  updateUser(): void {
    this.userService.updateUser(this.currentUserDto).subscribe(() => {
      console.log('User updated successfully');
      
    });
  }

}