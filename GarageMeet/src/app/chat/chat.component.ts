import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { chatMessage } from '../models/chatMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // calls the service method to get the new messages sent
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: chatMessage) => { this.addToInbox(receivedObj);});  
  }

  msgDto: chatMessage = new chatMessage();
  msgInboxArray: chatMessage[] = [];

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.username.length == 0 || this.msgDto.username.length == 0){
        window.alert("Both fields are required.");
        return;
      } else {
        // Send the message via a service
        this.chatService.broadcastMessage(this.msgDto);
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
