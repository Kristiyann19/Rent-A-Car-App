import { CategoryEnum } from "../../enums/category-enum";
import { EngineEnum } from "../../enums/engine-enum";
import { RegionEnum } from "../../enums/region-enum";
import { TransmissionEnum } from "../../enums/transmission-enum";

export class CarDto{
  make: string;
  model: string;  
  price: number;
  year:number;
  horsePower:number;
  color: string;
  cubicCapacity: number;
  mileage: number;
  description: string;
  isActive: Boolean;
  category: CategoryEnum;
  engine: EngineEnum;
  transmission: TransmissionEnum;
  region: RegionEnum;

  

}