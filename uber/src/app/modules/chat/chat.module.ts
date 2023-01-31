import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminChatComponent } from './pages/admin-chat/admin-chat.component';
import { UserChatComponent } from './pages/user-chat/user-chat.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './chat.routes';



@NgModule({
  declarations: [
    AdminChatComponent,
    UserChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers:[DatePipe]
})
export class ChatModule { }
