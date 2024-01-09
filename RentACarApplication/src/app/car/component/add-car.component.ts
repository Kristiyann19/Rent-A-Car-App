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
  file: any;

  constructor(private carService: CarService){}


  add() : void{
    this.carService.addCar(this.car).subscribe(response =>{
      console.log(response);          
  },
  error=>{
      console.log(error);
  });
  }

  handleImageUpload(event: any): void {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
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
      }
    }
  }

}
