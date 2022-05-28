import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CreategroupComponent } from '../creategroup/creategroup.component';
import { Band } from '../models/band';
import { Bandmember } from '../models/bandmember';
import { BandService } from '../services/band.service';
import { BandmemberService } from '../services/bandmember.service';
import { UserdataService } from '../services/userdata.service';
import { User } from '../user';

@Component({
  selector: 'app-band-home-page',
  templateUrl: './band-home-page.component.html',
  styleUrls: ['./band-home-page.component.css']
})
export class BandHomePageComponent implements OnInit {

  modalRef: MdbModalRef<CreategroupComponent> | null = null;

  constructor(private modalService: MdbModalService, private bandservice: BandService, private bandMemberService: BandmemberService, private userData: UserdataService) { }

  opacity: string = "100%";
  n!: number;
  user!: User;
  newBandMem!: Bandmember;
  bands: Band[] = [];

  ngOnInit(): void {
    this.user = this.userData.GetUser();
    this.bandservice.getAllBands().subscribe(message => {
      this.bands = message;
    });
  }

  openCreateGroupModal() {
    console.log(this.bands);
    this.opacity = "25%";
    this.modalRef = this.modalService.open(CreategroupComponent, {
      modalClass: 'modal-dialog-centered',
    })
    this.modalRef.onClose.subscribe((message: any) => {
      this.opacity = message;
    });
  }

  // Checks if the user is already in a band or if the band does not have any available member slots in the database
  attemptToJoin(bandId: number) {
    this.bandMemberService.isInABand(this.user.id).subscribe((message) => {
      if(message === false) {
        this.bandservice.getBandMemberLimit(bandId).subscribe((res) => {
          const num = res;
          if(num > 0) {
            this.newBandMem = {
              id: 0,
              userId: this.user.id,
              BandId: bandId,
              DateJoined: new Date('0')
            }
            this.bandMemberService.addBandMem(this.newBandMem);
          }
        });
      }
    });
  }

}
