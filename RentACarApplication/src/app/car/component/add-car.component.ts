import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";
import { AddCarDto } from "../dtos/add-car.dto";
import { CarImage } from "../dtos/image.dto";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})

export class AddCarComponent{
  cars: CarDto[] = [];
  car: AddCarDto = new AddCarDto();
  addError: Boolean = false;
  form: FormGroup;
  serverErrors: any = {};
  submitted = false;
  
  selectedImages: FileList;
  constructor(private carService: CarService, private fb: FormBuilder){
      this.form = this.fb.group({
        make: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
        model: ['', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(30)]],
        price: ['', [Validators.required, Validators.min(1), Validators.max(1000000)]],
        year: ['', [Validators.required, Validators.min(1940), Validators.max(Date.now())]],
        horsePower: ['', [Validators.required, Validators.min(10), Validators.max(2000)]],
        mileage: ['', [Validators.required, Validators.min(10)]],
        color: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        cubicCapacity: ['', [Validators.required, Validators.min(50), Validators.max(10000)]],
        description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5000)]],
        category: ['', [Validators.required]],
        transmission: ['', [Validators.required]],
        region: ['', [Validators.required]],
        engine: ['', [Validators.required]],      
  })}

  handleImageUpload(event: any): void {
    debugger;
    this.selectedImages = event.target.files;
  }

  onSubmit(): void {
    
    const formData: FormData = new FormData();
    this.submitted = true;
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
        console.log('Car added successfully', response);
      },
      (error) => {
        
        console.error('Error adding car', error);
        this.addError = true;
      }
    );
  }

}
