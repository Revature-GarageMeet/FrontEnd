import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Band } from '../models/band';
import { Bandmember } from '../models/bandmember';
import { User } from '../models/user';
import { BandService } from '../services/band.service';
import { BandmemberService } from '../services/bandmember.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<CreategroupComponent>, private bandService: BandService, private bandMemberService: BandmemberService, private userData: UserdataService) { }

  ngOnInit(): void {
  }

  newband: Band = {
    id: 0,
    title: '',
    description: '',
    memberLimit: 2
  }

  newBandMem: Bandmember = {
    id: 0,
    userId: this.userData.GetUser().id,
    bandId: 0,
    dateJoined: new Date(0)
  }

  close() {
    const opacity: string = "100%";
    this.bandService.createABand(this.newband).subscribe((message) => {
      this.newband = message;
      this.newBandMem.bandId = this.newband.id;
      this.bandMemberService.addBandMem(this.newBandMem).subscribe((res) => {
        res;
        this.newband.memberLimit -= 1;
        this.bandService.updateBand(this.newband).subscribe();
      });
    });
    this.modalRef.close(opacity);
  }
}
