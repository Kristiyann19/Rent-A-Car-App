import { Component} from '@angular/core';
import { UserService } from '../service/user.service';
import { AgentDto } from '../dtos/become-agent.dto';


@Component({templateUrl: 'user.component.html'})

export class UserComponent  {
  constructor(private userService: UserService) { }

  agent: AgentDto = new AgentDto();

  become() : void {
    this.userService.becomeAgent(this.agent).subscribe(
      
      (response) => {
        console.log('User became agent successfully!', response)
        this.userService.setIsAgent(true);
      },
      (error) => {
        console.error('Error becoming agent:', error);
      }
    );
  }
}