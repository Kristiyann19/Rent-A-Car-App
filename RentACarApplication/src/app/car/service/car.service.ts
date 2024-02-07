
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CarDto } from "../dtos/car.dto";
import { UserService } from "../../user/service/user.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})

export class CarService{

  constructor(private http: HttpClient, private userService: UserService){}

  currentUser = this.userService.currentUserDto;
  
  private apiUrl = 'http://localhost:19999/api/Car';


  getCars(page: number, pageSize: number) : Observable<CarDto[]>{
    return this.http.get<CarDto[]>(`http://localhost:19999/api/Car?page=${page}&pageSize=${pageSize}`);
  }

  getCarDetails(id: number): Observable<CarDto> {
    return this.http.get<CarDto>(`http://localhost:19999/api/Car/${id}`);
  }  

  getImagesUrl(carId:number){
    return this.http.get(`http://localhost:19999/api/Car/${carId}/Images`);
  }

  addCar(car: FormData) : Observable<void>{
    return this.http.post<void>(this.apiUrl, car);
  }

  deleteCar(id: number) {
    return this.http.delete<CarDto>(`http://localhost:19999/api/Car/${id}`);
  }

  updateCar(id: number, updatedCar: CarDto) : Observable<any>{
    return this.http.put(`http://localhost:19999/api/Car/${id}`, updatedCar);
  }

  searchCar(car: CarDto): Observable<CarDto[]> {
    const url = 'http://localhost:19999/api/Car/search';
    return this.http.get<CarDto[]>(url + this.composeQueryString(car));
  }

  totalCars() : Observable<number> {
    return this.http.get<number>('http://localhost:19999/api/Car/Count');
  }
  
  userRentCar(id: number) : Observable<any>{
    return this.http.post<any>(`http://localhost:19999/api/Car/${id}`, this.currentUser);
  }


  getRentedCars(): Observable<CarDto[]>{
    return this.http.get<CarDto[]>('http://localhost:19999/api/Car/RentedCars');
  }

  
  removeRented(id: number) : Observable<any> {
    return this.http.delete<any>(`http://localhost:19999/api/Car/RemoveRented/${id}`)
  }

public composeQueryString(object: any): string {
    let result = '';
    let isFirst = true;

    if (object) {
        Object.keys(object)
            .filter(key => object[key] !== null && object[key] !== undefined)
            .forEach(key => {
                let value = object[key];
                if (value instanceof Date) {
                    value = value.toISOString();
                }

                if (isFirst) {
                    result = '?' + key + '=' + value;
                    isFirst = false;
                }
                else {
                    result += '&' + key + '=' + value;
                }
            });
    }

    return result;
}

}

