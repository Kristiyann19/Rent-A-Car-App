import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";
import { AddCarDto } from "../dtos/add-car.dto";

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


  ngOnInit(): void {
    
    this.car = new AddCarDto();
  }
onChangeFile(event){
    this.car.file = event.srcElement.files;
}


  add() : void{
    let formData: FormData = new FormData();
    formData.append('file', this.file[0], this.file[0].name);
    this.carService.addCar(this.car).subscribe(response =>{
      console.log(response);          
  },
  error=>{
      console.log(error);
  });
  }
}
