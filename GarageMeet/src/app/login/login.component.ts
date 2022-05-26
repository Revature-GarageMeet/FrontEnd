import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'; //interface for the user class ~Leo
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import * as bcrypt from 'bcryptjs'; //make sure you "npm install bcrypt" ... also make sure youre in /FrontEnd/GarageMeet ~Donte
import { NavbarComponent } from '../navbar/navbar.component';
import { UserdataService } from '../services/userdata.service';


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
    //needs http calls so imma just pseudocode
    /*
      first check if existing (call user/Existing), return username not found if doesnt, ask if they want to register

      then check if username and password match(call user/Authenticate), if not then tell them wrong password and enable forgot password

      if successful then set userlogged in to that user and do w/e with it


      */
      //if doesn't exist send them to register
      //if does exist call for the DB to pull the hashed password
      //then do comparison in the front end(this would replace the authenticate method)
      //after authenticate is complete push user to main page
      //if authenticate fails say the password is not correct
      // ~leo
      if (
        /^[a-zA-Z0-9]+$/.test(this.userToCheck.username)
        && /^[a-zA-Z0-9]+$/.test(this.userToCheck.password)
      ) {
        this.api.existing(this.userToCheck.username).subscribe(res => {
          if(res === true) {
            // this.message = `There is no account for ${this.userToCheck.username}. You can go back and register.`;
            // this.messageColor = this.redColor;
            this.api.loginUser(this.userToCheck.username).subscribe(res => {
              this.userLoggedIn = res;

              // start hash comparison ~mo
              // const bcrypt = require("bcrypt");
              bcrypt
                .compare(this.userToCheck.password, this.userLoggedIn.password)
                .then((res:any) => {
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
                  }
                  else
                    console.log("Not Nice");
                  this.clearFields();
                })
            });

          }


          else {
            // this.message = `There is no account for ${this.userToLogin.username}. You can go back and register.`;
            // this.messageColor = this.redColor;
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

  GetUser(): User
  {
    return this.userLoggedIn;
  }

}
