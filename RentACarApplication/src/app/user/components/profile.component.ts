import { Component} from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationModalComponent } from './delete-confirmation.component';

@Component({templateUrl: 'profile.component.html'})

export class ProfileComponent  {
  constructor(private modalService: NgbModal,private router: Router, public userService: UserService) { }
  showCars = false;
  
  ngOnInit(){
      
  }

  openDeleteConfirmationModal(){
    const modal = this.modalService.open(DeleteConfirmationModalComponent);

  }

  // deleteAccount(){
  //   this.userService.removeCar().subscribe();
  // }

}