import { Component } from "@angular/core";
import { CarService } from "../../service/car.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CarDetailsDto } from "../../dtos/car-details.dto";

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})

export class UpdateCarComponent {
  updatedCar: CarDetailsDto = new CarDetailsDto();
  carId: number;
  updateError : Boolean = false;
  constructor(private route: ActivatedRoute, 
    private carService: CarService, 
    private router: Router){}
  

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