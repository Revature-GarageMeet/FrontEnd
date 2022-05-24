import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<EditprofileComponent>) { }

  ngOnInit(): void {
  }

  close() {
    const opacity = "100%";
    this.modalRef.close(opacity)
  }

}
