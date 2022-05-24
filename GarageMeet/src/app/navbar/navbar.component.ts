import { Component, Injectable, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { UserdataService } from '../services/userdata.service';
import { User } from '../user';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private userdata: UserdataService) { }

  ngOnInit(): void {

    
  }
}
