import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    UserprofileComponent,
    EditprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModalModule,
    MdbAccordionModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
