import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeProfilePictureComponent } from './pages/change-profile-picture/change-profile-picture.component';
import { routes } from './photo.routes';
import { RouterModule } from '@angular/router';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { PhotoComponent } from './components/photo/photo.component';



@NgModule({
  declarations: [
    ChangeProfilePictureComponent,
    ProfilePictureComponent,
    PhotoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    ProfilePictureComponent
  ]
})
export class PhotoModule { }
