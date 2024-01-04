import { Component} from '@angular/core';
import { UserService } from '../service/user.service';
import { AgentDto } from '../dtos/become-agent.dto';


@Component({templateUrl: 'user.component.html'})

export class UserComponent  {
  constructor(private userService: UserService) { }

  agent: AgentDto = new AgentDto();

  become() : void {
    this.agent.roleId = 2;

    this.userService.becomeAgent(this.agent).subscribe(
      (response) => {
        console.log('User became agent successfully!', response);
      },
      (error) => {
        console.error('Error becoming agent:', error);
      }
    );
  }
}



