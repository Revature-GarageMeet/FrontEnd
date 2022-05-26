import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserdataService } from '../services/userdata.service';
import { User } from '../user';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<EditprofileComponent>, private userData: UserdataService) { }

  editUser!: User;

  userFirstName!: string;
  userLastName!: string;
  userEmail!: string;
  userBio!: string;

  ngOnInit(): void {
    this.userFirstName = this.editUser.firstname;
    this.userLastName = this.editUser.lastname;
    this.userEmail = this.editUser.email;
    this.userBio = this.editUser.bio;
  }

  close() {
    const opacity = "100%";
    this.editUser.firstname = this.userFirstName;
    this.editUser.lastname = this.userLastName;
    this.editUser.email = this.userEmail;
    this.editUser.bio = this.userBio;
    this.userData.SetUser(this.editUser.id, this.editUser.username, this.editUser.firstname, this.editUser.lastname, this.editUser.email, this.editUser.bio);
    this.modalRef.close(opacity);
  }

}
