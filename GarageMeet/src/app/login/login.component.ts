import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, Validators  } from '@angular/forms';
import { User } from '../models/user'; //interface for the user class ~Leo
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import * as bcrypt from 'bcryptjs'; //make sure you "npm install bcrypt" ... also make sure youre in /FrontEnd/GarageMeet ~Donte
import { NavbarComponent } from '../navbar/navbar.component';
import { UserdataService } from '../services/userdata.service';
import { NgToastService } from 'ng-angular-popup'; //npm i ng-angular-popup ~Leo


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //constructor(private api: HttpService) {} when we get the http service made
  constructor(
    private router: Router,
    private api: LoginService,
    private toast: NgToastService,
    private userdata: UserdataService,
  ) { }


  result: boolean = false;
  userToCheck: User = {
    id: -1,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }
  userLoggedIn: User = {
    id: -1,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }

  tryToLogin() {
    if (
      /^[a-zA-Z0-9]+$/.test(this.userToCheck.username)
      && /^[a-zA-Z0-9]+$/.test(this.userToCheck.password)
    ) {
      this.api.existing(this.userToCheck.username).subscribe(res => {
        if (res === true) {
          this.api.loginUser(this.userToCheck.username).subscribe(res => {
            this.userLoggedIn = res;
            // start hash comparison ~mo
            // const bcrypt = require("bcrypt");
            bcrypt
              .compare(this.userToCheck.password, this.userLoggedIn.password)
              .then((res: any) => {
                this.result = res;
                if (this.result) {
                  //they will be redirected soon

                  this.userLoggedIn.password = "";
                  console.log("Nice");
                  this.userdata.SetUser(
                    this.userLoggedIn.id,
                    this.userLoggedIn.username,
                    this.userLoggedIn.firstname,
                    this.userLoggedIn.lastname,
                    this.userLoggedIn.email,
                    this.userLoggedIn.bio
                  );
                  this.toast.success({ detail: "Login Successful", summary: 'Welcome Back!', duration: 5000 });
                  this.router.navigate(["../homepage"]);
                }
                else {
                  //inform user that auth failed
                  console.log("Not Nice");
                  this.toast.error({ detail: "Authentication Failed", summary: 'Incorrect Password', sticky: true });
                }
                this.clearFields();
              })
          });
        }
        else {
          this.toast.info({ detail: "Authentication Failed", summary: 'Username Not Found', sticky: true });
          this.clearFields();
        }
      });
    }
  }



  forgotPassword() {
    /*
      an option i guess, ask others if we want it

    */
  }

  clearFields() {

  }


  ngOnInit(): void {
  }

  GetUser(): User {
    return this.userLoggedIn;
  }

}
