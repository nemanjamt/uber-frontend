import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUserDataComponent } from './components/form-user-data/form-user-data.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { userRoutes } from './user.routes';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoModule } from '../photo/photo.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { SharedModule } from '../shared/shared.module';
import { DriverDataChangeRequestComponent } from './pages/driver-data-change-request/driver-data-change-request.component';
import { AllDataChangeRequestsComponent } from './pages/all-data-change-requests/all-data-change-requests.component';
import { CreateDriverComponent } from './pages/create-driver/create-driver.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
    FormUserDataComponent,
    DriverDataChangeRequestComponent,
    AllDataChangeRequestsComponent,
    CreateDriverComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PhotoModule,
    RouterModule.forChild(userRoutes),
  ]
})
export class UserModule { }
