import { Component, OnDestroy } from "@angular/core";
import { ChatService } from "./chat.service";
import { UserService } from "../user/service/user.service";
import { Subscription } from "rxjs";
import { UserDto } from "../user/dtos/user.dto";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})

export class ChatComponent implements OnDestroy {
  selectedUser: UserDto = null;
  users: any[] = [];
  messages: {sender: string, message: string}[] = []
  currentUser;
  newMessage:string = '';
  
  private messageSubscription: Subscription
  constructor(private chatService: ChatService, private userService: UserService){
    this.messageSubscription = this.chatService.messageRecieved$.subscribe(message => {
      this.messages.push(message)
    });

    this.currentUser = this.userService.currentUserDto;
  }
  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  selectUser(selectedUser : any): void{
    this.selectedUser = selectedUser;
    this.messages = []
  }

  sendMessage(): void {
    if(this.newMessage.trim() !== ''){
      this.chatService.sendMessage(this.selectedUser.userName, this.newMessage);
      this.newMessage = '';
    }
  }
}