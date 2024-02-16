import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CarDto } from "../dtos/car.dto";
import { UserService } from "../../user/service/user.service";
import { HttpClient } from "@angular/common/http";
import { AllCarsDto } from "../dtos/all-cars.dto";
import { SearchCarDto } from "../dtos/search-car.dto";
import { CarDetailsDto } from "../dtos/car-details.dto";
import { RentedCarDto } from "../dtos/rented-car.dto";

@Injectable({
  providedIn: 'root',
})

export class CarService{

  constructor(private http: HttpClient, private userService: UserService) { }
  currentUser = this.userService.currentUserDto;
  private apiUrl = 'http://localhost:19999/api/Car';


  getCars(page: number, pageSize: number) : Observable<AllCarsDto[]>{
    return this.http.get<AllCarsDto[]>(this.apiUrl + `?page=${page}&pageSize=${pageSize}`);
  }

  getCarDetails(id: number): Observable<CarDetailsDto> {
    return this.http.get<CarDetailsDto>(this.apiUrl + `/${id}`);
  }  

  getImagesUrl(carId:number){
    return this.http.get(this.apiUrl + `/${carId}/Images`);
  }

  addCar(car: FormData) : Observable<void>{
    return this.http.post<void>(this.apiUrl, car);
  }

  deleteCar(id: number) {
    return this.http.delete<CarDto>(this.apiUrl + `/${id}`);
  }

  updateCar(id: number, updatedCar: CarDetailsDto) : Observable<any>{
    return this.http.put(this.apiUrl + `/${id}`, updatedCar);
  }

  searchCar(car: SearchCarDto): Observable<SearchCarDto[]> {
    return this.http.get<SearchCarDto[]>(this.apiUrl + '/search' + this.composeQueryString(car));
  }

  totalCars() : Observable<number> {
    return this.http.get<number>(this.apiUrl + '/Count');
  }
  
  userRentCar(id: number) : Observable<any>{
    return this.http.post<any>(this.apiUrl + `/${id}`, this.currentUser);
  }

  getRentedCars(): Observable<RentedCarDto[]>{
    return this.http.get<RentedCarDto[]>(this.apiUrl + '/RentedCars');
  }
  
  removeRented(id: number) : Observable<any> {
    return this.http.delete<any>(this.apiUrl +`/RemoveRented/${id}`)
  }

  getImageUrl(carId: number) {
    return this.apiUrl + `/${carId}/Image`
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

