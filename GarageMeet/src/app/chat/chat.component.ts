import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { chatMessage } from '../models/chatMessage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: chatMessage) => { this.addToInbox(receivedObj);});  
    // calls the service method to get the new messages sent
  }

  msgDto: chatMessage = new chatMessage();
  msgInboxArray: chatMessage[] = [];

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.username.length == 0 || this.msgDto.username.length == 0){
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto);                   // Send the message via a service
      }
    }
  }

  addToInbox(obj: chatMessage) {
    let newObj = new chatMessage();
    newObj.username = obj.username;
    newObj.message = obj.message;
    this.msgInboxArray.push(newObj);

  }
}
