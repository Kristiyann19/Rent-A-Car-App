import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";
import { AddCarDto } from "../dtos/add-car.dto";
import { CarImage } from "../dtos/image.dto";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./car.component.css']
})


export class AddCarComponent{

  
  cars: CarDto[] = [];
  car: AddCarDto = new AddCarDto();
  selectedImages: FileList;
  constructor(private carService: CarService){}

  handleImageUpload(event: any): void {
    this.selectedImages = event.target.files;
  }

  addCar(): void {
    const formData: FormData = new FormData();
    formData.append('make', this.car.make);
    formData.append('model', this.car.model);
    formData.append('price', this.car.price.toString());
    formData.append('year', this.car.year.toString());
    formData.append('horsePower', this.car.horsePower.toString());
    formData.append('color', this.car.color);
    formData.append('cubicCapacity', this.car.cubicCapacity.toString());
    formData.append('mileage', this.car.mileage.toString());
    formData.append('description', this.car.description);
    formData.append('category', this.car.category.toString());
        formData.append('region', this.car.region.toString());
        formData.append('transmission', this.car.transmission.toString());
        formData.append('engine', this.car.engine.toString());

    if (this.selectedImages && this.selectedImages.length > 0) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        formData.append('imageFiles', this.selectedImages[i]);
      }
    }

    this.carService.addCar(formData).subscribe(
      (response) => {
        // Handle success
        console.log('Car added successfully', response);
      },
      (error) => {
        // Handle error
        console.error('Error adding car', error);
      }
    );
  }

}
