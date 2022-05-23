import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  textEntry!: string;

  constructor() { }

  ngOnInit(): void {
  }

  submitComment(): void {
    console.log("submitting comment!");
    console.log(this.textEntry);
  }

}
