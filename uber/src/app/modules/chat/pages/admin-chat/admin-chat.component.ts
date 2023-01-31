import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/modules/photo/services/photo.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { UserData } from 'src/app/modules/user/types/UserData';
import { MessageService } from '../../services/message.service';
import { ChatComponent } from '../../types/ChatComponents';
import { ChatUser } from '../../types/ChatUser';
import { Message } from '../../types/Message';
import { WebSocketAPI } from '../../types/WebSocketAPI';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss']
})
export class AdminChatComponent implements OnInit, ChatComponent {

  webSocketAPI!: WebSocketAPI;
  name!:string;
  messages:Message[] = [];
  message:string = "";
  senderId : number = 2;
  reciverId : number = -1;
  receiver !: UserData;
  image : string = "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png";
  users: UserData[] = [];
  chatUsers:ChatUser[] = [];
  newMessageIds: number[] = [];
  constructor(private messageService:MessageService, private userService: UserService, private photoService: PhotoService,
    private datePipe: DatePipe) {
      this.findUsers();
     }
  handleMessage(message:any): void {
    const val : Message = message as Message;
    ;
    
    if(val.senderId == this.reciverId){
      this.messages.push(val);
    }else if(this.newMessageIds.indexOf(val.senderId) == -1){
      this.newMessageIds.push(val.senderId);
    }
    


    const index = this.users.findIndex(user => user.id === val.senderId);
      if (index > -1) {
    const user = this.users.splice(index, 1)[0];
    this.users.unshift(user);
  }
    
  }

  

  ngOnInit(): void {
    this.webSocketAPI = new WebSocketAPI(this, "/topic/admin");
    this.webSocketAPI._connect();
    this.senderId = this.userService.getCurrentlyLoggedId();
    
    this.getMessages();
    
  }

  getMessages(){
    if(this.reciverId != -1){
      this.findUser();
      //dobavi poruke za korisnika
      this.messageService.getMessagesBetweenUsers(this.reciverId)
      .subscribe(res =>{
        
        
        for(let message of res){
          this.messages.push(message);
          
        }
        
      })
    }
  }

  

  

  findUser(){
    this.userService.getUserById(this.reciverId).subscribe(res => {
      this.receiver = res.body as UserData;
      if(this.receiver.photoId == null)
        return;
      this.photoService.getPhotoById(this.receiver.photoId as number).subscribe(res =>{
        this.image = 'data:image/jpeg;base64,'+res.body;
      });
    });
  }

  changeReciver(id:number){
    
    if(this.newMessageIds.indexOf(id) != -1){
      this.newMessageIds.splice(this.newMessageIds.indexOf(id),1);
    }
    this.reciverId = id;
    this.messages = [];
    this.findUser();
    this.getMessages();
  }

 findUsers(){
  
  this.userService.findClients().subscribe(res =>{
      
      let clients = res.body as UserData[];
      for(let c of clients){
        // this.users.push(c);
        let client:ChatUser = {
          name: c.name,
          lastName: c.lastName,
          id: c.id,
          photo: "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png",
          username: c.username,
          email: c.email
        }

        if(c.photoId){
          this.photoService.getPhotoById(c.photoId as number).subscribe({
            next:(res)=>{
              client.photo = 'data:image/jpeg;base64,'+res.body;
            }
          });
        }
        this.chatUsers.push(client);
        
      }

      
     
    });
    
    this.userService.findDrivers().subscribe(res =>{
      
      let drivers = res.body as UserData[];
      for(let d of drivers){
        // this.users.push(d);
        let driver:ChatUser = {
          name: d.name,
          lastName: d.lastName,
          id: d.id,
          photo: "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png",
          username: d.username,
          email: d.email
        };

        if(d.photoId){
          this.photoService.getPhotoById(d.photoId as number).subscribe({
            next:(res)=>{
              driver.photo = 'data:image/jpeg;base64,'+res.body;
            }
          });
        }
        this.chatUsers.push(driver);
      }
    });

    

    
  }

  

  

  

  sendMessage(){
    const date = new Date();
    const vrijeme = [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes()];
    let m : Message = {content:this.message, receiverId:this.reciverId,senderId:this.senderId,time:vrijeme};
    this.webSocketAPI._send(m,"/app/to-user");
    this.message = "";
    this.messages.push(m);
  }

  formatDate(date: number[]): string {
    const dateObject = new Date(date[0],date[1]-1,date[2], date[3],date[4]);
    return `${this.datePipe.transform(dateObject, 'HH:mm dd.MM.yyyy')}`;
  }

  


}
