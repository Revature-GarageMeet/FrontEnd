import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CreategroupComponent } from '../creategroup/creategroup.component';
import { Band } from '../models/band';
import { BandService } from '../services/band.service';

@Component({
  selector: 'app-band-home-page',
  templateUrl: './band-home-page.component.html',
  styleUrls: ['./band-home-page.component.css']
})
export class BandHomePageComponent implements OnInit {

  modalRef: MdbModalRef<CreategroupComponent> | null = null;

  constructor(private modalService: MdbModalService, private bandservice: BandService) { }

  opacity: string = "100%";
  bands: Band[] = [];

  ngOnInit(): void {
    // this.bandservice get all currently created bands
  }

  openCreateGroupModal() {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(CreategroupComponent, {
      modalClass: 'modal-dialog-centered',
    })
    this.modalRef.onClose.subscribe((message: any) => {
      this.opacity = message;
    });
  }

  attemptToJoin() {
    // Check if there are still slots left to fill and deny a join if there isn't ~Bailey
  }

}
