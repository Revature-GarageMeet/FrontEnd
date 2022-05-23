import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { PostComponent } from './post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
=======
import { RegisterComponent } from './register/register.component';

>>>>>>> 90d07cd2a424f41f537d9bf356522a958c6f0d84
=======
import { PostComponent } from './post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { RegisterComponent } from './register/register.component';
>>>>>>> Tucker


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    PostComponent
=======
    RegisterComponent
>>>>>>> 90d07cd2a424f41f537d9bf356522a958c6f0d84
=======
    PostComponent,
    RegisterComponent

>>>>>>> Tucker
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
<<<<<<< HEAD
<<<<<<< HEAD
    ReactiveFormsModule,
=======
>>>>>>> 90d07cd2a424f41f537d9bf356522a958c6f0d84
=======
    ReactiveFormsModule,
>>>>>>> Tucker
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
