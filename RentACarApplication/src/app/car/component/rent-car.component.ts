import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})

export class RentCarComponent {
  cars: CarDto[] = [];
  car: CarDto = new CarDto();
  constructor(private carService: CarService, private route: ActivatedRoute){}

  RentedCars(){
    debugger;
    this.carService.getRentedCars().subscribe((result: CarDto[]) => {
      this.cars = result;
    });
  }

}