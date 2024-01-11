import { CategoryEnum } from "../../enums/category-enum";
import { EngineEnum } from "../../enums/engine-enum";
import { RegionEnum } from "../../enums/region-enum";
import { TransmissionEnum } from "../../enums/transmission-enum";
import { CarImage } from "./image.dto";

export class AddCarDto{
  make: string;
  model: string;  
  price: number;
  year:number;
  horsePower:number;
  color: string;
  cubicCapacity: number;
  mileage: number;
  description: string;
  isRented: Boolean;
  category: CategoryEnum;
  engine: EngineEnum;
  transmission: TransmissionEnum;
  region: RegionEnum;   
  imageFiles: File;
  images: CarImage[]

}