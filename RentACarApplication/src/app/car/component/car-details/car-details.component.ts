import { Component } from "@angular/core";
import { CarDto } from "../../dtos/car.dto";
import { EngineEnum, EngineEnumLocalization } from "../../../enums/engine-enum";
import { ActivatedRoute } from "@angular/router";
import { CarService } from "../../service/car.service";
import { CategoryEnum, CategoryEnumLocalization } from "../../../enums/category-enum";
import { TransmissionEnum, TransmissionEnumLocalization } from "../../../enums/transmission-enum";
import { RegionEnum, RegionEnumLocalization } from "../../../enums/region-enum";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})

export class CarDetailsComponent{
  car: CarDto = new CarDto();
  carImagesBase64: string[] = [];

  imagePath : any;
  engineEnumLocalization = EngineEnumLocalization;
  categoryEnumLocalization = CategoryEnumLocalization;
  transmissionEnumLocalization = TransmissionEnumLocalization;
  regionEnumLocalization = RegionEnumLocalization;
  
  engineEnum = EngineEnum;
  categoryEnum = CategoryEnum;
  transmissionEnum = TransmissionEnum;
  regionEnum = RegionEnum;
  loadingData = false;

  constructor(private route: ActivatedRoute, private carService: CarService, private sanitizer: DomSanitizer) {}

  getCarDetails (id: number): void{
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


  getImages(id : number) : void{
    this.carService.getImagesUrl(id)
    .pipe(
      catchError((err: HttpErrorResponse) => {
         return throwError(() => err);
     })
   )
  .subscribe((carImagesBase64: string[]) => {
  this.carImagesBase64 = carImagesBase64;
  this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,');
  }); 
  }

  

  ngOnInit(): void {
    this.loadingData = true;
    const id = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.getCarDetails(id);
    this.getImages(id);
  }
}
