import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Band } from '../models/band';
import { BandService } from '../services/band.service';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<CreategroupComponent>, private bandService: BandService) { }

  ngOnInit(): void {
  }

  // Need to call a Band Http Service for Post of a new Band ~Bailey
  newband!: Band;

  close() {
    const opacity: string = "100%";
    this.bandService
    this.modalRef.close(opacity);
  }
}
