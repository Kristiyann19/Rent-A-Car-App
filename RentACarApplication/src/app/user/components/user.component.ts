import { Component} from '@angular/core';
import { UserService } from '../service/user.service';
import { AgentDto } from '../dtos/become-agent.dto';
import { Router } from '@angular/router';


@Component({templateUrl: 'user.component.html'})

export class UserComponent  {
  constructor(private router: Router, private userService: UserService) { }

  agent: AgentDto = new AgentDto();


  become() : void {
    this.userService.becomeAgent(this.agent).subscribe(
      
      (response) => {
        console.log('User became agent successfully!', response)
        this.router.navigate(['']);        
      
        
      },
      (error) => {
        console.error('Error becoming agent:', error);
      }
    );
  }

  
}