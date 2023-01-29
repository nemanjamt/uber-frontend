import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth/guards/login/login.guard';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { DetailedRideReviewComponent } from './pages/detailed-ride-review/detailed-ride-review.component';
import { HistoryReviewComponent } from './pages/history-review/history-review.component';

import { UnregisterUserRideComponent } from './pages/unregister-user-ride/unregister-user-ride.component';

export const routes: Routes = [
 {path:'unregister',
  component:UnregisterUserRideComponent,
  canActivate:[LoginGuard]
},{
  path:"history-review",
  component:HistoryReviewComponent,
  canActivate:[RoleGuard],
  data:{expectedRoles:"ROLE_DRIVER|ROLE_CLIENT|ROLE_ADMIN"}
 },
 {
  path:"detailed-ride",
  component:DetailedRideReviewComponent,
  canActivate:[RoleGuard],
  data:{expectedRoles:"ROLE_DRIVER|ROLE_CLIENT|ROLE_ADMIN"}
 }


];


