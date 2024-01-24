import { Component } from "@angular/core";
import { CarDto } from "../../dtos/car.dto";
import { CarService } from "../../service/car.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})

export class UpdateCarComponent {
  updatedCar: CarDto = new CarDto();
  carId: number;
  updateError : Boolean = false;
  constructor(private route: ActivatedRoute, private carService: CarService, private router: Router){}
  

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.carId = +params['id'];
      this.fetchCarDetails(); 
    });
  }


  fetchCarDetails(): void {
    this.carService.getCarDetails(this.carId).subscribe((car) => {
      this.updatedCar = { ...car }; 
    });
  }
  updateCar(): void {
    this.carService.updateCar(this.carId, this.updatedCar).subscribe(
    (response: any) => {
      console.log('Car updated successfully', response);
      this.router.navigate([''])
    },
    (error) => {
        
      console.error('Error adding car', error);
      this.updateError = true;
    });
  }

}