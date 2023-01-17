import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { AllDataChangeRequestsComponent } from "./pages/all-data-change-requests/all-data-change-requests.component";
import { ChangePasswordComponent } from "./pages/change-password/change-password.component";
import { DriverDataChangeRequestComponent } from "./pages/driver-data-change-request/driver-data-change-request.component";
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
        path:"data-change-requests",
        pathMatch:"full",
        component:AllDataChangeRequestsComponent,
        canActivate:[RoleGuard],
        data:{expectedRoles:"ROLE_ADMIN"}
    }
    ,
    {
        path:"driver-data-change-requests",
        pathMatch:"full",
        component:DriverDataChangeRequestComponent,
        canActivate:[RoleGuard],
        data:{expectedRoles:"ROLE_DRIVER"}
    },
    
    {
        path:"photo",
        loadChildren: () =>
          import("./../photo/photo.module").then((m) => m.PhotoModule)
    }
    
];