import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/components/register.component';
import { LoginComponent } from './login/components/login.component';
import { CarDetailsComponent } from './car/component/car-details/car-details.component';
import { CarComponent } from './car/component/car/car.component';
import { AddCarComponent } from './car/component/car-add/add-car.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './user/components/become-agent/user.component';
import { AgentDetailsComponent } from './user/components/agent-details/agent-details.component';
import { RentCarComponent } from './car/component/car-rent/rent-car.component';
import { UpdateCarComponent } from './car/component/car-update/update-car.component';
import { ProfileComponent } from './user/components/profile/profile.component';
import { UpdateUserComponent } from './user/components/user-update/update-user.component';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin/components/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { EmailConfirmationComponent } from './email-confirm/email-confirmation.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  { path: 'car/:id', component: CarDetailsComponent},
  {path: '', component: CarComponent},
  {path: 'add', component: AddCarComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'becomeagent', component: UserComponent },
  {path: 'agent/:id', component: AgentDetailsComponent},
  {path: 'rentedcars', component: RentCarComponent},
  {path: 'updatecar/:id', component: UpdateCarComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'updateuser', component:UpdateUserComponent},
  {path: 'chatHub', component:ChatComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'confirm-email', component: EmailConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
