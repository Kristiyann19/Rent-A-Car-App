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

  constructor(private carService: CarService){}

  ngOnInit(): void {
    this.carService.getCars().subscribe((result: CarDto[]) => {
      this.cars = result;
    });
  }

}