import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./car.component.css']
})


export class AddCarComponent{

  cars: CarDto[] = [];
  car: CarDto = new CarDto();
  constructor(private carService: CarService){}

  add(car: CarDto) : void{
    this.carService.addCar(car).subscribe(car => this.cars.push(car));
  }
}
