import { Component, OnInit } from '@angular/core';
import { Bandmember } from '../models/bandmember';
import { BandmemberService } from '../services/bandmember.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css']
})
export class GrouppageComponent implements OnInit {

  constructor(private bandmemberService: BandmemberService, private userService: UserdataService) { }

  bandmembers: Bandmember[] = [];

  ngOnInit(): void {
  }

  getUsername(member: Bandmember) {

  }

}
