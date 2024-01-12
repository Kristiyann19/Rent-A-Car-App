import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../user/service/user.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent {
  cars: CarDto[] = [];
  car: CarDto = new CarDto();
  constructor(private carService: CarService, private route: ActivatedRoute, public userService: UserService){}

  rentCar(id){
    // const id = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.carService.userRentCar(id).subscribe((car: CarDto) => this.car = car);
  }

  deleteCar(id){
    this.carService.deleteCar(id).subscribe();
  }


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

}