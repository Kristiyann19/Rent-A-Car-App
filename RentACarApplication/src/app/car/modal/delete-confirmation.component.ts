import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { CarService } from "../service/car.service";
import { CarDto } from "../dtos/car.dto";
import { Observable } from "rxjs";

@Component({templateUrl: 'delete-confirmation.component.html'})
export class DeleteConfirmationCarModalComponent  {
  localStorage: Storage;
  @Input() id : number


  constructor(public activeModal: NgbActiveModal, private carService: CarService, private router: Router) { 
    this.localStorage = document.defaultView?.localStorage;
  }


  confirmCarDelete(id){
    this.carService.deleteCar(id).subscribe();
    this.activeModal.close(true);
    
  }  


  cancelCarDelete(){
    this.activeModal.dismiss(false);
  }
}