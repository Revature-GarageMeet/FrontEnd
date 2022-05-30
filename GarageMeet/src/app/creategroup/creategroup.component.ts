import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Band } from '../models/band';
import { Bandmember } from '../models/bandmember';
import { NgToastService } from 'ng-angular-popup';
import { BandService } from '../services/band.service';
import { BandmemberService } from '../services/bandmember.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent {

  constructor(
    public modalRef: MdbModalRef<CreategroupComponent>,
    private bandService: BandService,
    private bandMemberService: BandmemberService,
    private userData: UserdataService,
    private toast: NgToastService
    ) { }

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

  bandExists!: boolean;

  attemptToClose() {
    this.bandService.checkIfExists(this.newband.title).subscribe((res) => {
      this.bandExists = res;

      // Check if band name is already taken
      if(this.bandExists)
      {
        this.toast.error({ detail: "Name Taken", summary: 'Choose a different band name', sticky: true })
      }
      else
      {
        // Create new band via Band Post call and reset main page opacity to 100%
        const opacity: string = "100%";
        this.bandService.createABand(this.newband).subscribe((message) => {
          this.newband = message;
          this.newBandMem.bandId = this.newband.id;
          this.bandMemberService.addBandMem(this.newBandMem).subscribe((res) => {
            this.newband.memberLimit -= 1;
            this.bandService.updateBand(this.newband).subscribe((res) => {
              this.modalRef.close(opacity);
            });
          });
        });
      }
    });
  }
}
