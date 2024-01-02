import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { EngineEnum, EngineEnumLocalization } from "../../enums/engine-enum";
import { ActivatedRoute } from "@angular/router";
import { CarService } from "../service/car.service";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})

export class CarDetailsComponent{
  car: CarDto;

  engineEnumLocalization = EngineEnumLocalization;

  engineEnum = EngineEnum;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit(): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.carService.getCarDetails(id).subscribe((car: CarDto) => this.car = car); //?
  }
}
