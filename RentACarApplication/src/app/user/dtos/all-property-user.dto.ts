import { CarDto } from "../../car/dtos/car.dto";

export class UserAdminViewDto{
  id:number;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roleId?: number;
  userCar: CarDto[];
}
