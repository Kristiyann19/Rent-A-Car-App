import { Component} from '@angular/core';
import { UserService } from '../service/user.service';
import { AgentDto } from '../dtos/become-agent.dto';
import { Router } from '@angular/router';
import { CurrentUserDto } from '../dtos/current-user.dto';


@Component({
  templateUrl: 'user.component.html',
  styleUrl: 'user.component.css'
})

export class UserComponent  {
  constructor(private router: Router, private userService: UserService) { }
  becomeError: Boolean = false;
  agent: AgentDto = new AgentDto();
 
  currentUser: CurrentUserDto = new CurrentUserDto();

  become() : void {
    this.userService.becomeAgent(this.agent).subscribe(
      
      (response) => {
        console.log('User became agent successfully!', response)
        this.router.navigate(['']);        
      
        
      },
      (error) => {
        this.becomeError = true;
        console.error('Error becoming agent:', error);
      }
    );
  }

  isAdmin() : boolean {
    return this.currentUser && this.currentUser.roleId === 3;
   }
}