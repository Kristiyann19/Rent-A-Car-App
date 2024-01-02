import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CarDto } from "../dtos/car.dto";

@Injectable({
  providedIn: 'root',
})

export class CarService{
  constructor(private http: HttpClient){}

  getCars() : Observable<CarDto[]>{
    return this.http.get<CarDto[]>('http://localhost:19999/api/Car')
  }

  getCarDetails(id: number): Observable<CarDto> {
    return this.http.get<CarDto>(`http://localhost:19999/api/Car/${id}`);
  }  


  searchCar(car: CarDto): Observable<CarDto[]> {
    const url = 'http://localhost:19999/api/Car/search';
    return this.http.get<CarDto[]>(url + this.composeQueryString(car));

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

