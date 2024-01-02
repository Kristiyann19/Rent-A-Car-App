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

}

