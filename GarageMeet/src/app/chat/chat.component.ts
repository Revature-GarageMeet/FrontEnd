import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit, NgZone } from '@angular/core';
import { chatMessage } from '../models/chatMessage';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  title = 'ClientApp';
  txtMessage: string = "";
  uniqueID: string = new Date().getTime.toString();
  messages = new Array<chatMessage>();
  message = {} as chatMessage;
  username:string = "";
  constructor(private chatService: ChatService, private _ngZone: NgZone) {  this.subscribeToEvents(); }


  sendMessage(): void {
    if(this.txtMessage) {
      this.message = {} as chatMessage;
      this.message.uniqueId = this.uniqueID;
      this.message.type = "sent";
      this.message.message = this.txtMessage;
      this.message.dateCreated = new Date();
      this.message.username = this.username;
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage= '';
    }
  }

  private subscribeToEvents(): void {
    this.chatService.messageRecieved.subscribe((message : chatMessage) =>
      this._ngZone.run(() => {
        if (message.uniqueId !== this.uniqueID)
        {
          message.type = "received";
          this.messages.push(message);
        }
      })
    );
  }

  ngOnInit(): void {
  }

}
