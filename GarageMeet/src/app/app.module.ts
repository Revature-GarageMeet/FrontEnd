import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserprofileComponent } from './userprofile/userprofile.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModalModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
