import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/components/register.component';
import { LoginComponent } from './login/components/login.component';
import { CarDetailsComponent } from './car/component/car-details.component';
import { CarComponent } from './car/component/car.component';
import { AddCarComponent } from './car/component/add-car.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  { path: 'car/:id', component: CarDetailsComponent},
  {path: '', component: CarComponent},
  {path: 'add', component: AddCarComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}//probably will have to change and add home component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
