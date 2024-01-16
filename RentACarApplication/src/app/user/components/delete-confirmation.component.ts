import { Router } from "express";
import { UserService } from "../service/user.service";
import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({templateUrl: 'delete-confirmation.component.html'})

export class DeleteConfirmationModalComponent  {
  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  confirmDelete(){
    this.userService.removeCar().subscribe();
    this.activeModal.close(true);
  }  


  cancelDelete(){
    this.activeModal.dismiss(false);
  }
}