import { Component } from "@angular/core";
import { CarDto } from "../../dtos/car.dto";
import { CarService } from "../../service/car.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../user/service/user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteConfirmationCarModalComponent } from "../../modal/delete-confirmation.component";
import { EngineEnumLocalization } from "../../../enums/engine-enum";
import { CategoryEnumLocalization } from "../../../enums/category-enum";
import { TransmissionEnumLocalization } from "../../../enums/transmission-enum";
import { RegionEnumLocalization } from "../../../enums/region-enum";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent {
  engineEnumLocalization = EngineEnumLocalization;
  categoryEnumLocalization = CategoryEnumLocalization;
  transmissionEnumLocalization = TransmissionEnumLocalization;
  regionEnumLocalization = RegionEnumLocalization;
  
  cars: CarDto[] = [];
  searchCar: CarDto = new CarDto();

  page = 1;
  pageSize = 12;

  totalCarsCount = 0;

  constructor(private modalService: NgbModal,  private carService: CarService, private route: ActivatedRoute, public userService: UserService){}

  ngOnInit(): void {
    this.loadCars();
   
  }

  loadCars() : void{ 
    this.carService.getCars(this.page, this.pageSize)
      .subscribe((result: CarDto[]) => {
       this.cars = result;
       this.totalItems();
      });
  }

  OnPageChange(newPage: number){
      this.page = newPage;
      this.loadCars();
     }


  totalItems() : void {
    this.carService.totalCars().subscribe((count: number) =>{
        this.totalCarsCount = count;
    })
  }
  rentCar(index: number, id){
    this.carService.userRentCar(id).subscribe(() => 
    {
      this.cars[index].isRented = true;
    });
  }

  onDeleteModal(id){
    const modal = this.modalService.open(DeleteConfirmationCarModalComponent);
    modal.componentInstance.id = id;
   
  }
  search(): void {
    this.carService.searchCar(this.searchCar).subscribe(
      (data: CarDto[]) => {
        this.cars = data;
        this.totalItems();
      }
    )
  }  

  getImageUrl(carId: number) {
    return `http://localhost:19999/api/Car/${carId}/Image`
  }
}