import { Component } from "@angular/core";;
import { UserService } from "../../service/user.service";
import { CurrentUserDto } from "../../dtos/current-user.dto";
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})

export class UpdateUserComponent {

  updatedUserDto: CurrentUserDto = new CurrentUserDto();

  constructor(public userService: UserService, private router: Router){}
  
  updateUser(): void {
    this.userService.updateUser(this.userService.currentUserDto).subscribe((response: any) => {
      console.log('User is successfully updated', response);
      this.router.navigate(['/profile'])
    },
    (error) =>{
      console.error('Error updating user', error);
      
    });
    
  }

}

