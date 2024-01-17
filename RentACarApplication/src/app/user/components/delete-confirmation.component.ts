import { UserService } from "../service/user.service";
import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({templateUrl: 'delete-confirmation.component.html'})
export class DeleteConfirmationModalComponent  {
  localStorage: Storage;
  constructor(public activeModal: NgbActiveModal, private userService: UserService, private router: Router) { 
    this.localStorage = document.defaultView?.localStorage;
  }

  confirmDelete(){
    this.userService.deleteAccount().subscribe();
    this.activeModal.close(true);
    this.localStorage?.removeItem('access_token')
  }  


  cancelDelete(){
    this.activeModal.dismiss(false);
  }
}