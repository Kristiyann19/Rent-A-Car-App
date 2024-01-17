import { Component } from "@angular/core";
import { CarDto } from "../dtos/car.dto";
import { CarService } from "../service/car.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../user/service/user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteConfirmationCarModalComponent } from "../modal/delete-confirmation.component";
import { Subject } from "rxjs";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent {
  cars: CarDto[] = [];
  searchCar: CarDto = new CarDto();

  // private carDeletedSubject = new Subject<number>();
  // carDeleted$ = this.carDeletedSubject.asObservable();
  constructor(private modalService: NgbModal,  private carService: CarService, private route: ActivatedRoute, public userService: UserService){}

  rentCar(index: number, id){
    debugger;
    this.carService.userRentCar(id).subscribe(() => 
    {
      this.cars[index].isRented = true;
    });
  }

  onDeleteModal(id){
    const modal = this.modalService.open(DeleteConfirmationCarModalComponent);
    modal.componentInstance.id = id;
   
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe((result: CarDto[]) => {
      this.cars = result;
    });
  }

  getImageUrl(image: any) {
    const base64Data = this.ArrayBufferToBase(image.bytes);
    return `data:image/${image.fileExtension};base64,${base64Data}`
  }

  private ArrayBufferToBase(buffer: any) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++){
      binary += String.fromCharCode(bytes[i]);
    }
  return btoa(binary);
  }

  search(): void {
    this.carService.searchCar(this.searchCar).subscribe(
      (data: CarDto[]) => {
        this.cars = data;
      }
    )
  }  

}