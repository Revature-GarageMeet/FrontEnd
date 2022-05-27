import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { throws } from 'assert';
import { chatMessage } from '../models/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messageRecieved = new EventEmitter<chatMessage>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  

  // probably won't work tbh
  constructor(private _hubConnection: HubConnection) {
    //this._hubConnection = hubConnection;
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  sendMessage(message : chatMessage)
  {
    this._hubConnection.invoke('NewMessage', message);
  }

  private createConnection()
  {
    this._hubConnection = new HubConnectionBuilder().withUrl(window.location.href + 'MessageHub').build();
  }

  private startConnection(): void
  {
    this._hubConnection
    .start()
    .then(()=> {
      this.connectionIsEstablished = true;
      console.log("Hub connection started");
      this.connectionEstablished.emit(true);
    })
    .catch(err =>
      {
        console.log("Error while establishing connection ");
        //setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on("MessageRecieved", (data: any) => {
      this.messageRecieved.emit(data);
    })
  }

}
