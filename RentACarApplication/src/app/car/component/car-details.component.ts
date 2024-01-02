import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { EngineEnum, EngineEnumLocalization } from "../../enums/engine-enum";
import { ActivatedRoute } from "@angular/router";
import { CarService } from "../service/car.service";
import { CategoryEnum, CategoryEnumLocalization } from "../../enums/category-enum";
import { TransmissionEnum, TransmissionEnumLocalization } from "../../enums/transmission-enum";
import { RegionEnum, RegionEnumLocalization } from "../../enums/region-enum";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})

export class CarDetailsComponent{
  car: CarDto;

  engineEnumLocalization = EngineEnumLocalization;
  categoryEnumLocalization = CategoryEnumLocalization;
  transmissionEnumLocalization = TransmissionEnumLocalization;
  regionEnumLocalization = RegionEnumLocalization;
  
  engineEnum = EngineEnum;
  categoryEnum = CategoryEnum;
  transmissionEnum = TransmissionEnum;
  regionEnum = RegionEnum;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit(): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.carService.getCarDetails(id).subscribe((car: CarDto) => this.car = car); //?
  }
}
