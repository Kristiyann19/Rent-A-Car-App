import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { EngineEnum, EngineEnumLocalization } from "../../enums/engine-enum";
import { ActivatedRoute } from "@angular/router";
import { CarService } from "../service/car.service";
import { CategoryEnum, CategoryEnumLocalization } from "../../enums/category-enum";
import { TransmissionEnum, TransmissionEnumLocalization } from "../../enums/transmission-enum";
import { RegionEnum, RegionEnumLocalization } from "../../enums/region-enum";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})

export class CarDetailsComponent{
  car: CarDto = new CarDto();

  engineEnumLocalization = EngineEnumLocalization;
  categoryEnumLocalization = CategoryEnumLocalization;
  transmissionEnumLocalization = TransmissionEnumLocalization;
  regionEnumLocalization = RegionEnumLocalization;
  
  engineEnum = EngineEnum;
  categoryEnum = CategoryEnum;
  transmissionEnum = TransmissionEnum;
  regionEnum = RegionEnum;
  loadingData = false;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  getCarDetails (): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.carService.getCarDetails(id)
    .pipe(
             catchError((err: HttpErrorResponse) => {
                this.loadingData = false;
                return throwError(() => err);
            })
          )
    .subscribe((car: CarDto) => {
      this.car = car;
      this.loadingData = false;
    }); 
  }

  ngOnInit(): void {
    this.loadingData = true;
    this.getCarDetails();
  }
}
