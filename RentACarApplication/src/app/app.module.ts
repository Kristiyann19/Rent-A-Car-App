import { APP_INITIALIZER,  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/components/register.component';
import { LoginComponent } from './login/components/login.component';
import { CarComponent } from './car/component/car/car.component';
import { CarDetailsComponent } from './car/component/car-details/car-details.component';
import { AddCarComponent } from './car/component/car-add/add-car.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './jwt.interceptor';
import { UserComponent } from './user/components/user.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { AgentDetailsComponent } from './user/components/agent-details.component';
import { UserService } from './user/service/user.service';
import { RentCarComponent } from './car/component/car-rent/rent-car.component';
import { UpdateCarComponent } from './car/component/car-update/update-car.component';
import { LoadingComponent } from './loading/loading.component';
import { ProfileComponent } from './user/components/profile.component';
import { DeleteConfirmationModalComponent } from './user/components/delete-confirmation.component';
import { ChatService } from './chat/chat.service';
import { ChatComponent } from './chat/chat.component';
import { DeleteConfirmationCarModalComponent } from './car/modal/delete-confirmation.component';
import { PaginationComponent } from './paging/pagination.component';
import { UpdateUserComponent } from './user/components/update-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CarComponent,
    CarDetailsComponent, 
    AddCarComponent,
    HomeComponent,
    UserComponent,
    NavBarComponent,
    AgentDetailsComponent,
    RentCarComponent,
    UpdateCarComponent,
    LoadingComponent,
    ProfileComponent,
    DeleteConfirmationModalComponent,
    ChatComponent,
    DeleteConfirmationCarModalComponent,
    PaginationComponent,
    UpdateUserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule

  ],
  providers: [
    UserService,
    ChatService,
    {
       provide: APP_INITIALIZER,
       deps: [UserService],
       useFactory: getUserData,
       multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
export function getUserData(userService: UserService) {
  return () => userService.getCurrentUser();
}

