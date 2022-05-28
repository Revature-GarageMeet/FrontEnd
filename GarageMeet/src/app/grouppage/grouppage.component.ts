import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Band } from '../models/band';
import { User } from '../models/user';
import { BandService } from '../services/band.service';
import { BandmemberService } from '../services/bandmember.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css']
})
export class GrouppageComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private bandmemberService: BandmemberService,
    private userService: UserdataService,
    private bandService: BandService,
    private route: Router)
    {
      this.router.params.subscribe(params => {
        this.bandTitle = params['band'];
      });
    }

  bandmembers: User[] = [];
  currBand: Band = {
    id: 0,
    title: '',
    description: '',
    memberLimit: 0
  };
  currUser!: User;
  bandTitle!: string;

  ngOnInit(): void {
    this.currUser = this.userService.GetUser();
    this.bandService.getBandDetails(this.bandTitle).subscribe((message) => {
      this.currBand = message;
      this.bandmemberService.getAllBandMems(this.currBand.id).subscribe((res) => {
        this.bandmembers = res;
      });
    });
  }

  goToProfile(user: User) {
    if(this.currUser.id === user.id)
    {
      this.route.navigate(['userprofile']);
    }
    else
    {
      this.route.navigate(['otherprofile', user.id]);
    }
  }

  leaveBand() {
    this.bandmemberService.getBandMember(this.currUser.id).subscribe((res) => {
      this.bandmemberService.removeBandMem(res.id).subscribe();
      this.currBand.memberLimit += 1;
      this.bandService.updateBand(this.currBand).subscribe();
      this.bandmemberService.getAllBandMems(this.currBand.id).subscribe((message) => {
        if (message.length - 1 > 0) {
          this.route.navigate(['bandPage']);
        }
        else
        {
          this.bandService.removeBand(this.currBand.id).subscribe();
          this.route.navigate(['bandPage']);
        }
      });
    });
  }

}
