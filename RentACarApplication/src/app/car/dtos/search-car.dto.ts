import { CategoryEnum } from "../../enums/category-enum";
import { EngineEnum } from "../../enums/engine-enum";
import { RegionEnum } from "../../enums/region-enum";
import { TransmissionEnum } from "../../enums/transmission-enum";
import { CarImage } from "./image.dto";

export class SearchCarDto{
  id: number
  make: string;
  model: string;  
  price: number;
  year:number;
  region: RegionEnum; 
  transmission: TransmissionEnum;
  engine: EngineEnum;
  category: CategoryEnum
  isRented: boolean;
  imageFiles: File;
  images: CarImage[];
}