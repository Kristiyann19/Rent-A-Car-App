import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/components/register.component';
import { LoginComponent } from './login/components/login.component';
import { CarComponent } from './car/component/car.component';
import { CarDetailsComponent } from './car/component/car-details.component';
import { AddCarComponent } from './car/component/add-car.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './jwt.interceptor';
import { UserComponent } from './user/components/user.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { AgentDetailsComponent } from './user/components/agent-details.component';
import { UserService } from './user/service/user.service';
import { RentCarComponent } from './car/component/rent-car.component';
import { UpdateCarComponent } from './car/component/update-car.component';
import { LoadingComponent } from './loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './user/components/profile.component';


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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    UserService,
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

