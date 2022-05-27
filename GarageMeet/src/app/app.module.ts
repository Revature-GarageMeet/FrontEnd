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



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    GrouppageComponent,
    HeaderComponent,
    RegisterComponent,
    UserprofileComponent,
    EditprofileComponent,
    PostComponent,
    RegisterComponent,
    NavbarComponent,
    CommentComponent,
    BandHomePageComponent,
    CreategroupComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
