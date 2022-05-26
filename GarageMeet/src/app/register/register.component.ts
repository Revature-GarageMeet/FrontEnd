import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'; //interface for the user class ~Leo
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import * as bcrypt from 'bcryptjs';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // constructor(private api: HttpService) {} when we get the http service made
  constructor(
    private router: Router,
    private api: LoginService

    ) { }

  userToCheck: User = {
    id: 0,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }
  userToRegister: User = {
    id: 0,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }

  tryToRegister(){
    //needs http calls so imma just pseudocode
    /*
      check if username taken, if not just go
      call if existing
      make new user
    */

      if (
        /^[a-zA-Z0-9]+$/.test(this.userToCheck.username)
        && /^[a-zA-Z0-9]+$/.test(this.userToCheck.password)
      ) {
        this.api.existing(this.userToCheck.username).subscribe(res => {
          if(res === true) {
          // this.message = `The username ${this.userToCheck.username} is taken.`;
          this.clearFields();
          // this.messageColor = this.redColor;
          } else {
            this.userToRegister = this.userToCheck;
            //hashing password ~mo
            // const bcrypt = require("bcrypt");
            const saltRounds = 10;

            bcrypt
              .hash(this.userToRegister.password, saltRounds)
              .then((hash:any) => {
                this.userToRegister.password = hash;
                console.log(this.userToRegister.password);
                this.api.createUser(this.userToRegister).subscribe();
                this.clearFields();
                // Store hash in your password DB.
            })



            // this.message = `An account was created for ${this.userToRegister.username}`;
            // this.messageColor = this.greenColor;
          }
        });
      } else {
        // this.message = "Username and password must contain letters and numbers only and cannot be blank.";
        this.clearFields();
        // this.messageColor = this.redColor;
      }

  }

  clearFields() {
    this.userToCheck.firstname = "";
    this.userToCheck.lastname = "";
    this.userToCheck.email = "";
    this.userToCheck.username = "";
    this.userToCheck.password = "";
  }

  ngOnInit(): void {
  }



}
