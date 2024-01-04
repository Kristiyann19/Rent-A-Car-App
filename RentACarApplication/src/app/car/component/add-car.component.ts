import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";
import { AddCarDto } from "../dtos/add-car.dto";
import { EngineEnum, EngineEnumLocalization } from "../../enums/engine-enum";
import { CategoryEnum, CategoryEnumLocalization } from "../../enums/category-enum";
import { TransmissionEnum, TransmissionEnumLocalization } from "../../enums/transmission-enum";
import { RegionEnum, RegionEnumLocalization } from "../../enums/region-enum";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./car.component.css']
})


export class AddCarComponent{

  
  cars: CarDto[] = [];
  car: AddCarDto = new AddCarDto();

  constructor(private carService: CarService){}

  add() : void{
    this.carService.addCar(this.car).subscribe(() => {debugger});
  }
}
