import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUserDataComponent } from './components/form-user-data/form-user-data.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { userRoutes } from './user.routes';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoModule } from '../photo/photo.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';



@NgModule({
  declarations: [
    FormUserDataComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PhotoModule,
    RouterModule.forChild(userRoutes),
  ]
})
export class UserModule { }
