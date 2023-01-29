import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth/guards/login/login.guard';
import { RoleGuard } from '../auth/guards/role/role.guard';

import { UnregisterUserRideComponent } from './pages/unregister-user-ride/unregister-user-ride.component';

export const routes: Routes = [
 {path:'unregister',
  component:UnregisterUserRideComponent,
  canActivate:[LoginGuard]
},


];


