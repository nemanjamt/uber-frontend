import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { ChangePasswordComponent } from "./pages/change-password/change-password.component";
import { ProfileComponent } from "./pages/profile/profile.component";

export const userRoutes:Routes=[

    {
        path:"change-password",
        pathMatch:"full",
        component:ChangePasswordComponent,
        
    },
    {
        path:"profile",
        pathMatch:"full",
        component:ProfileComponent,
        canActivate:[RoleGuard],
        data:{expectedRoles:"ROLE_ADMIN|ROLE_DRIVER|ROLE_CLIENT"}
        
    },
    
    {
        path:"photo",
        loadChildren: () =>
          import("./../photo/photo.module").then((m) => m.PhotoModule)
    }
    
];