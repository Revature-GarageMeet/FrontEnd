import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommentComponent } from './comment/comment.component';
import { GrouppageComponent } from './grouppage/grouppage.component';
import { BandHomePageComponent } from './band-home-page/band-home-page.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { NgToastModule } from 'ng-angular-popup' //npm i ng-angular-popup ~Leo, pop ups for login and register page
import { CommonModule } from '@angular/common'; //did we really not have this? ~Leo
import { OtherProfileComponent } from './other-profile/other-profile.component';
import { CreateBandPostComponent } from './create-band-post/create-band-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    GrouppageComponent,
    HeaderComponent,
    UserprofileComponent,
    EditprofileComponent,
    PostComponent,
    RegisterComponent,
    NavbarComponent,
    CommentComponent,
    BandHomePageComponent,
    CreategroupComponent,
    OtherProfileComponent,
    CreateBandPostComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
