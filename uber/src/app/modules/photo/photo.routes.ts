import { Routes } from "@angular/router";
import { ChangeProfilePictureComponent } from "./pages/change-profile-picture/change-profile-picture.component";

export const routes : Routes = [
    {
        path:"change-profile-picture",
        pathMatch:"full",
        component: ChangeProfilePictureComponent
    
    }];