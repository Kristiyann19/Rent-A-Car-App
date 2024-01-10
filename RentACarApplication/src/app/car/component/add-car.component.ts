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
  constructor(private carService: CarService){}


  add() : void{
  //   this.carService.addCar(this.car).subscribe(response =>{
  //     console.log(response);          
  // },
  // error=>{
  //     console.log(error);
  // });
  }

  handleImageUpload(event: any): void {
    const files: FileList = event.target.files;
    let formData: FormData = new FormData();

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('imageFiles', files[0], files[0].name);
        formData.append('make', this.car.make);
        formData.append('model', this.car.model);
        formData.append('price', this.car.price.toString());
        formData.append('year', this.car.year.toString());
        formData.append('horsePower', this.car.horsePower.toString());
        formData.append('color', this.car.color);
        formData.append('cubicCapacity', this.car.cubicCapacity.toString());
        formData.append('mileage', this.car.mileage.toString());
        formData.append('description', this.car.description);
        formData.append('description', this.car.description);
        formData.append('category', this.car.category.toString());
        formData.append('region', this.car.region.toString());
        formData.append('transmission', this.car.transmission.toString());
        formData.append('engine', this.car.engine.toString());
        
        const reader = new FileReader();

        reader.onload = (e) => {
          const imageData = reader.result as ArrayBuffer;
          const imageBytes = new Uint8Array(imageData);

          const newImage: CarImage = {
            bytes: imageBytes,
            description: files[i].name,
            fileExtension: files[i].name.split('.').pop() || '',
            size: files[i].size
          };

          this.car.images.push(newImage);
        };

        reader.readAsArrayBuffer(files[i]);
        
        this.carService.addCar(formData).subscribe();
        
      }
    }
  }

}
