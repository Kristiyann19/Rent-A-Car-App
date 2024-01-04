import { Inject, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/components/register.component';
import { LoginComponent } from './login/components/login.component';
import { CarComponent } from './car/component/car.component';
import { CarDetailsComponent } from './car/component/car-details.component';
import { AddCarComponent } from './car/component/add-car.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CarComponent,
    CarDetailsComponent, 
    AddCarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
    
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
