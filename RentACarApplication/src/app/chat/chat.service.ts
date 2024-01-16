import { Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Subject } from "rxjs";
import { UserService } from "../user/service/user.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
     private hubConnection: HubConnection
    private currentUser;
     private messageRecieved = new Subject<{sender: string, message: string}>();

     messageRecieved$ = this.messageRecieved.asObservable();

     constructor(public userService: UserService){
      this.currentUser = this.userService.currentUserDto;
      this.hubConnection = new HubConnectionBuilder()
          .withUrl('http://localhost:19999/api/chatHub')
          .build();

      this.hubConnection.start().catch(err => console.error(err));

      this.hubConnection.on('ReceiveMessage', (sender: string, message: string) =>{
        this.messageRecieved.next({sender, message});
      } )
     }

     sendMessage(receiver: string, message: string): void {
      this.hubConnection.invoke('SendMessageToGroup', receiver, this.currentUser.userName , message).catch(err => console.error(err))
     }
}