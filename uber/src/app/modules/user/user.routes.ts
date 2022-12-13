import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";

export const userRoutes:Routes=[

    // {
    //     path:"change-password",
    //     pathMatch:"full",
    //     component:ChangePasswordComponent,
        
    // },
    {
        path:"profile",
        pathMatch:"full",
        component:ProfileComponent,
        
    },
    
    // {
    //     path:"photo",
    //     loadChildren: () =>
    //       import("./../photo/photo.module").then((m) => m.PhotoModule)
    // }
    
];