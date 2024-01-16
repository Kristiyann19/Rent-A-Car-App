import { Component} from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { subscribe } from 'diagnostics_channel';
import { UserDto } from '../dtos/user.dto';

@Component({templateUrl: 'profile.component.html'})

export class ProfileComponent  {
  constructor(private router: Router, public userService: UserService) { }
  showCars = false;
  
  ngOnInit(){
      
  }

}