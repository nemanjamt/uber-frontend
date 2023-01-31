import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/modules/photo/services/photo.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { UserData } from 'src/app/modules/user/types/UserData';
import { MessageService } from '../../services/message.service';
import { ChatComponent } from '../../types/ChatComponents';
import { Message } from '../../types/Message';
import { WebSocketAPI } from '../../types/WebSocketAPI';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit , ChatComponent {

  webSocketAPI!: WebSocketAPI;
  greeting: any;
  name !: string;
  messages:Message[] = [];
  senderId : number = 1;
  reciverId:number = -1;
  sender!: UserData;
  image !: string;
  @Input() message:string = "";
  constructor(private messageService:MessageService,private datePipe: DatePipe, private userService: UserService, private photoService: PhotoService) { 
    this.senderId = this.userService.getCurrentlyLoggedId();
    this.findUser();
  }

  ngOnInit(): void {
    
    
    this.webSocketAPI = new WebSocketAPI(this, "/topic/user/"+this.senderId);
    this.webSocketAPI._connect();

    this.reciverId = 2;
    this.getMessages();
    
  }

  findUser(){
    this.userService.getUserById(this.senderId).subscribe(res => {
      this.sender = res.body as UserData;
      if(this.sender.photoId == null){
        this.image = "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png";
        return;
      }
        
      this.photoService.getPhotoById(this.sender.photoId as number).subscribe(res =>{
        this.image = 'data:image/jpeg;base64,'+res.body;
      });
    });
  }

  getMessages(){
    if(this.reciverId != -1){
      //dobavi poruke za korisnika
      this.messageService.getMessagesBetweenUsers(this.senderId)
      .subscribe(res =>{
       
        
        for(let message of res){
          this.messages.push(message);
        }
       
      })
    }
  }

  connect(){
    
    // this.webSocketAPI._connect();
    
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    const date = new Date();
    const vrijeme = [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes()];
    let m : Message = {content:this.message, receiverId:2,senderId:this.senderId, time:vrijeme};
    this.webSocketAPI._send(m,"/app/to-admin");
    this.messages.push(m);
    this.message = "";
  }

  formatDate(date: number[]): string {
    const dateObject = new Date(date[0],date[1]-1,date[2], date[3],date[4]);
    return `${this.datePipe.transform(dateObject, 'HH:mm dd.MM.yyyy')}`;
  }

  handleMessage(message:any){

    const val : Message = message as Message;


    this.messages.push(val);
  }

  onMessageChange(event:any) {
    this.message = event;
  }


}
