import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})

export class RentCarComponent {
  rentCars: CarDto[] = [];
  rentCar: CarDto = new CarDto();
  constructor(private carService: CarService){}

  ngOnInit(){
    this.carService.getRentedCars().subscribe((result: CarDto[]) => {
      this.rentCars = result;
    });
  }

}