import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnregisterUserRideComponent } from './pages/unregister-user-ride/unregister-user-ride.component';

import { RouterModule } from '@angular/router';
import { routes } from '../ride/ride.routes';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoModule } from '../photo/photo.module';



@NgModule({
  declarations: [
    UnregisterUserRideComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PhotoModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RideModule { }
