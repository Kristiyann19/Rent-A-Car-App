import { Component } from "@angular/core";
import { CarService } from "../../service/car.service";
import { RentedCarDto } from "../../dtos/rented-car.dto";
import { UserService } from "../../../user/service/user.service";

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})

export class RentCarComponent {
  rentedCars: RentedCarDto[] = [];

  constructor(public carService: CarService, public userService: UserService){}


  ngOnInit(){
    this.carService.getRentedCars().subscribe((result: RentedCarDto[]) => {
      this.rentedCars = result;
    });
  }

  
  removeFromRented(index: number, id){
    this.carService.removeRented(id).subscribe(() => 
    {
      this.rentedCars[index].isRented = false;
      this.ngOnInit();
    });
  }

}