import { RegionEnum } from "../../enums/region-enum";
import { CarImage } from "./image.dto";

export class AllCarsDto{
  id: number
  make: string;
  model: string;  
  price: number;
  region: RegionEnum; 
  isRented: boolean;
  imageFiles: File;
  images: CarImage[];
}