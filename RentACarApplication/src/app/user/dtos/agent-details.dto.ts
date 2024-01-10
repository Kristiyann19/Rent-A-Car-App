import { CarDto } from "../../car/dtos/car.dto";

export class AgentDetailsDto{
  id:number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roleId: number;
  userCar: CarDto[];
  
}
