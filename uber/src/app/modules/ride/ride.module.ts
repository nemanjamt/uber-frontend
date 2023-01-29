import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UnregisterUserRideComponent } from './pages/unregister-user-ride/unregister-user-ride.component';

import { RouterModule } from '@angular/router';
import { routes } from '../ride/ride.routes';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoModule } from '../photo/photo.module';
import { HistoryReviewComponent } from './pages/history-review/history-review.component';



@NgModule({
  declarations: [
    UnregisterUserRideComponent,
    HistoryReviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PhotoModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers:[DatePipe]
})
export class RideModule { }
