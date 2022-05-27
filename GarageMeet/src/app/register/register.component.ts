import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'; //interface for the user class ~Leo
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import * as bcrypt from 'bcryptjs';
import { NgToastService } from 'ng-angular-popup'; //npm i ng-angular-popup ~Leo
import { UserdataService } from '../services/userdata.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private api: LoginService,
    private toast: NgToastService,
    private userdata: UserdataService,
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
  canClick: boolean = true;

  tryToRegister() {
    this.canClick = false;
    if (
      /^[a-zA-Z0-9]+$/.test(this.userToCheck.username)
      && /^[a-zA-Z0-9]+$/.test(this.userToCheck.password)
    ) {
      this.api.existing(this.userToCheck.username).subscribe(res => {
        if (res === true) {
          this.toast.error({ detail: "Invalid Username", summary: 'Username already taken', sticky: true });
          this.canClick = true;
          this.clearFields();
        } else {
          this.userToRegister = this.userToCheck;
          //hashing password ~mo
          // const bcrypt = require("bcrypt");
          const saltRounds = 10;

          bcrypt
            .hash(this.userToRegister.password, saltRounds)
            .then((hash: any) => {
              this.userToRegister.password = hash;
              console.log(this.userToRegister.password);
              this.clearFields();
              this.api.createUser(this.userToRegister).subscribe(res => {
                this.userToRegister = res;
                this.userdata.SetUser(
                  this.userToRegister.id,
                  this.userToRegister.username,
                  this.userToRegister.firstname,
                  this.userToRegister.lastname,
                  this.userToRegister.email,
                  this.userToRegister.bio
                );
                this.toast.success({ detail: "Registration Successful", summary: 'Welcome!', duration: 5000 });
                this.router.navigate(["../homepage"]);
                // Store hash in your password DB.
              })
            })
        }});
    } else {
      this.toast.error({ detail: "Invalid Username", summary: 'Usernames Contain Invalid Symbols', sticky: true });
      this.canClick = true;
      this.clearFields();
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
