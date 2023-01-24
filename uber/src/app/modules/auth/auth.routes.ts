import { Routes } from "@angular/router";
import { LoginGuard } from "./guards/login/login.guard";
import { ConfirmRegistrationComponent } from "./pages/confirm-registration/confirm-registration.component";
import { CreateNewPasswordComponent } from "./pages/create-new-password/create-new-password.component";
import { ForgottenPasswordComponent } from "./pages/forgotten-password/forgotten-password.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistrationComponent } from "./pages/registration/registration.component";

export const routes:Routes = [
    {
       path:"login",
       pathMatch:"full",
       component:LoginComponent,
       canActivate:[LoginGuard]
    },
    {
      path:"registration",
      pathMatch:"full",
      component:RegistrationComponent,
      canActivate:[LoginGuard]
    },
    {
      path:"confirm-registration",
      pathMatch:"full",
      component:ConfirmRegistrationComponent,
      canActivate:[LoginGuard]
    },
    {
     path:"forgotten-password",
     pathMatch:"full",
     component:ForgottenPasswordComponent,
     canActivate:[LoginGuard]
   },
   {
     path:"create-new-password",
     pathMatch:"full",
     component:CreateNewPasswordComponent,
     canActivate:[LoginGuard]
   }
   ];