import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})

export class UpdateCarComponent {
  updatedCar: CarDto = new CarDto();

  constructor(private route: ActivatedRoute, private carService: CarService){}
  

  updateCarPut(id) {
  debugger;
    this.carService.updateCar(id, this.updatedCar).subscribe((car: CarDto) => this.updatedCar = car);
  }

}