import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ConfirmRegistrationComponent } from './pages/confirm-registration/confirm-registration.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ConfirmRegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthModule { }
