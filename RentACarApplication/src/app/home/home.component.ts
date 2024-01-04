import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../user/service/user.service';
import { UserDto } from '../user/dtos/user.dto';


@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    users: UserDto[] = [];

    constructor(private userService: UserService) {}

    ngOnInit() : void {
        this.userService.getAll().subscribe((result: UserDto[]) => {
          this.users = result;
        });
    }
}


