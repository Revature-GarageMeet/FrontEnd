import { Component, OnInit } from '@angular/core';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { User } from '../user';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  modalRef: MdbModalRef<EditprofileComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  userProfile : User = {
    id: -1,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }

  opacity: string = "100%"

  openEditModal() {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(EditprofileComponent, {
      modalClass: 'modal-dialog-centered'
      // data: { currPlayer } Might use for passing in profile user information to be able to edit BIO, Username, Real name visibility, and profile img
    })
    this.modalRef.onClose.subscribe((message: any) => {
      this.opacity = message;
    });
  }

  ngOnInit(): void {
  }

}
