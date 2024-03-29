import { Component} from '@angular/core';
import { UserService } from '../../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationModalComponent } from '../../../modal/delete-user/delete-confirmation.component';
import { RegionEnumLocalization } from '../../../enums/region-enum';
import { CarService } from '../../../car/service/car.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent  {
  regionEnumLocalization = RegionEnumLocalization;
  constructor(private modalService: NgbModal, public userService: UserService, public carService: CarService) { 

  
  }
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