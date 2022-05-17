import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'; //interface for the user class ~Leo
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
// import { HttpService } from 'wherever it is';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //constructor(private api: HttpService) {} when we get the http service made
  constructor(private router: Router) { }
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

    if (this.userToCheck.username == 'test') {
      this.userToCheck.username = 'confirmed';
    }
    else {
      this.userToCheck.username = 'testfailed';
    }
    this.userToCheck.password = '';
  }

  forgotPassword() {
    /*
      an option i guess, ask others if we want it
    
    */
  }


  ngOnInit(): void {
  }

}
