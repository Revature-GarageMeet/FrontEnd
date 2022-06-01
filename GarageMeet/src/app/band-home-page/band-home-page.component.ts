import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgToastService } from 'ng-angular-popup';
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

  constructor(
    private modalService: MdbModalService,
    private bandservice: BandService,
    private bandMemberService: BandmemberService,
    private userData: UserdataService,
    private toast: NgToastService,
    private router: Router
    ) { }

  opacity: string = "100%";
  n!: number;
  user!: User;
  newBandMem!: Bandmember;
  currBandMem: Bandmember = {
    id: 0,
    userId: 0,
    dateJoined: new Date(0),
    bandId: 0
  };
  bands: Band[] = [{id:0, title: "", memberLimit: 0, description: ""}];
  tempBands: Band[] = [];
  check!: number;

  ngOnInit(): void {
    this.user = this.userData.GetUser();
    this.bandservice.getAllBands().subscribe(message => {
      this.bands = message;
      this.bandMemberService.getBandMember(this.user.id).subscribe((res) => {
        this.currBandMem.bandId = res.bandId;
        this.currBandMem.dateJoined = res.dateJoined;
        this.currBandMem.id = res.id;
        this.currBandMem.userId = res.userId;
        this.bandMemberService.isInABand(this.user.id).subscribe((check) => {
          if (check) { // This will find the current band a user is in and place it first in the list
            this.tempBands = this.bands.filter(band => band.id != this.currBandMem.bandId);
            const index = this.bands.findIndex(band => band.id === this.currBandMem.bandId);
            this.tempBands.push(this.bands[index]);
            this.bands = this.tempBands.reverse();
          }
        });
      });
    });
  }

  openCreateGroupModal() {
    if(this.currBandMem.bandId > 0) {
      this.toast.info({ detail: "Already In A Band", summary: 'Can not create a new band', sticky: true })
    } else {
      this.opacity = "25%";
      this.modalRef = this.modalService.open(CreategroupComponent, {
        modalClass: 'modal-dialog-centered',
      })
      this.modalRef.onClose.subscribe((message: any) => {
        this.opacity = message;
        this.ngOnInit();
      });
    }
  }

  goToPage(band: Band) {
    this.router.navigate(['groupPage', band.title]);
  }

  // Checks if the user is already in a band or if the band does not have any available member slots in the database
  attemptToJoin(band: Band) {
    this.bandMemberService.isInABand(this.user.id).subscribe((message) => {
      if(message === false) {
        this.bandservice.getBandMemberLimit(band.id).subscribe((res) => {
          const num = res;
          if(num > 0) {
            this.newBandMem = {
              id: 0,
              userId: this.user.id,
              bandId: band.id,
              dateJoined: new Date('0')
            }
            this.bandMemberService.addBandMem(this.newBandMem).subscribe((res) => {
              band.memberLimit -= 1;
              this.bandservice.updateBand(band).subscribe((res) => {
                this.goToPage(band);
              });
            });
          }
        });
      } else {
        this.toast.info({ detail: "Already In A Band", summary: 'Can not join another band', sticky: true })
      }
    });
  }

}
