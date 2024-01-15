import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";

@Component({
  selector: 'app-posted-car',
  templateUrl: './posted-car.component.html'
})

export class RentCarComponent {
  postedCars: CarDto[] = [];
  postedCar: CarDto = new CarDto();
  constructor(private carService: CarService){}

  // ngOnInit(){
  //   this.carService.getRentedCars().subscribe((result: CarDto[]) => {
  //     this.postedCar = result;
  //   });
  // }

  
  removeFromRented(id){
    this.carService.removeRented(id).subscribe();
  }

}