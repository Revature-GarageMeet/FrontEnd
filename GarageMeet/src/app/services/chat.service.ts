import { Injectable, EventEmitter, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';
import { chatMessage } from '../models/chatMessage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private  connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:7088/chatsocket")
    .configureLogging(signalR.LogLevel.Information)
    .build();
  readonly POST_URL = "https://localhost:7088/Chat/send"
  
  private receivedMessageObj :chatMessage = new chatMessage();

  private connectionIsEstablished = false;
  private sharedObj = new Subject<chatMessage>();

  // probably won't work tbh
  constructor(private http: HttpClient) {
      this.connection.onclose(async () => {
        await this.start();
      });
    this.connection.on("MessageReceived", (username : string, message : string) => { this.mapReceivedMessage(username, message); });
    this.start();                 
  }


   // Start the connection
  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      console.log("Hi, this isn't working right now")
      setTimeout(() => this.start(), 5000);
    } 
  }

  private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObj.username = user;
    this.receivedMessageObj.message = message;
    this.sharedObj.next(this.receivedMessageObj);
  }

   /* ****************************** Public Mehods **************************************** */

   // Calls the controller method
public broadcastMessage(msg: any) {
  this.http.post(this.POST_URL, msg).subscribe(data => console.log(data));
     // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  public retrieveMappedObject(): Observable<chatMessage> {
    return this.sharedObj.asObservable();
  }
}
