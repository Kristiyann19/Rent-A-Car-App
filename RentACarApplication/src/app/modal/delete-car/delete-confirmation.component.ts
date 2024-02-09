import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { CarService } from "../../car/service/car.service";


@Component({templateUrl: 'delete-confirmation.component.html'})
export class DeleteConfirmationCarModalComponent  {
  localStorage: Storage;
  @Input() id : number


  constructor(public activeModal: NgbActiveModal, private carService: CarService, private router: Router) { 
    this.localStorage = document.defaultView?.localStorage;
  }


  confirmCarDelete(id){
    this.carService.deleteCar(id).subscribe(() => {
      window.location.reload();
    });
    this.activeModal.close(true);

  }  


  cancelCarDelete(){
    this.activeModal.dismiss(false);
  }
}