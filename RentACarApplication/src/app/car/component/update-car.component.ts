import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})

export class UpdateCarComponent {
  updateCars: CarDto[] = [];
  updateCar: CarDto = new CarDto();
  constructor(private carService: CarService){}
  
  updateCarPut() {
    this.carService.updateCar(this.updateCar).subscribe();
  }

}