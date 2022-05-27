import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CreategroupComponent } from '../creategroup/creategroup.component';

@Component({
  selector: 'app-band-home-page',
  templateUrl: './band-home-page.component.html',
  styleUrls: ['./band-home-page.component.css']
})
export class BandHomePageComponent implements OnInit {

  modalRef: MdbModalRef<CreategroupComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  opacity: string = "100%";

  ngOnInit(): void {
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

}
