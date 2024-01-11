import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CarDto } from "../dtos/car.dto";
import { UserService } from "../../user/service/user.service";

@Injectable({
  providedIn: 'root',
})

export class CarService{
  constructor(private http: HttpClient, private userService: UserService){}

  currentUser = this.userService.currentUserDto;
  
  private apiUrl = 'http://localhost:19999/api/Car';


  getRentedCars(): Observable<CarDto[]>{
    return this.http.get<CarDto[]>('http://localhost:19999/api/Car/RentedCars')
  }

  userRentCar(id: number) : Observable<any>{
    return this.http.post<any>(`http://localhost:19999/api/Car/${id}`, this.currentUser);
  }

  getCars() : Observable<CarDto[]>{
    return this.http.get<CarDto[]>(this.apiUrl);
  }

  getCarDetails(id: number): Observable<CarDto> {
    return this.http.get<CarDto>(`http://localhost:19999/api/Car/${id}`);
  }  


  addCar(car: FormData) : Observable<void>{
    return this.http.post<void>(this.apiUrl, car);
  }

  removeRented(id: number){
    return this.http.delete<CarDto>(`http://localhost:19999/api/Car/RemoveRented/${id}`)
  }

  searchCar(car: CarDto): Observable<CarDto[]> {
    const url = 'http://localhost:19999/api/Car/search';
    return this.http.get<CarDto[]>(url + this.composeQueryString(car));
  }

  deleteCar(id: number){
    return this.http.delete<CarDto>(`http://localhost:19999/api/Car/${id}`);
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

