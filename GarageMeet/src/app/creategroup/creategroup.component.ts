import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<CreategroupComponent>) { }

  ngOnInit(): void {
  }

  // Need to call a Band Http Service for Post of a new Band ~Bailey

  close() {
    const opacity: string = "100%";
    this.modalRef.close(opacity);
  }
}
