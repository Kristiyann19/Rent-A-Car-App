import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent {
  cars: CarDto[] = [];
  car: CarDto = new CarDto();
  constructor(private carService: CarService){}

  ngOnInit(): void {
    this.carService.getCars().subscribe((result: CarDto[]) => {
      this.cars = result;
    });
  }

  search(): void {
    this.carService.searchCar(this.car).subscribe(
      (data: CarDto[]) => {
        this.cars = data;
      }
    )
  }  

  //TODO
  add(car: CarDto) : void{
    this.carService.addCar(car).subscribe(car => this.cars.push(car));
  }
}