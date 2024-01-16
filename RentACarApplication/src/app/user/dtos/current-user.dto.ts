import { CarDto } from "../../car/dtos/car.dto";

export class CurrentUserDto{
  id:number;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roleId?: number;
  userCar: CarDto[];
}
