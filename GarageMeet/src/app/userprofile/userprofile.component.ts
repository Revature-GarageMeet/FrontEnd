import { Component, OnInit } from '@angular/core';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UserdataService } from '../services/userdata.service';
import { User } from '../user';
import { PostService } from '../services/post.service';
import { EditProfileService } from '../services/edit-profile.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  modalRef: MdbModalRef<EditprofileComponent> | null = null;

  user: User = {
    id: -1,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    bio: ''
  }

  opacity: string = "100%";
  ownsProfile: boolean = true;

  // Used to notify user of no posts to show or show posts if there are any ~Bailey
  hasPosts: boolean = false;

  constructor(private modalService: MdbModalService,
    private userData: UserdataService, private postData: PostService, private editProfileData: EditProfileService ) { }

  openEditModal() {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(EditprofileComponent, {
      modalClass: 'modal-dialog-centered',
      data: { editUser: this.user }
    })
    this.modalRef.onClose.subscribe((message: any) => {
      this.opacity = message;
      this.editProfileData.updateUserData(this.user).subscribe();
    });
  }

  ngOnInit(): void {
    this.user = this.userData.GetUser();
  }

}
