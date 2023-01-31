import { Route } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { AdminChatComponent } from "./pages/admin-chat/admin-chat.component";
import { UserChatComponent } from "./pages/user-chat/user-chat.component";

export const routes:Route[]=[{
    path:"user-chat",
    component: UserChatComponent,
    canActivate:[RoleGuard],
    data:{expectedRoles:"ROLE_DRIVER|ROLE_CLIENT"}
},
{
    path:"admin-chat",
    pathMatch:"full",
    component: AdminChatComponent,
    canActivate:[RoleGuard],
    data:{expectedRoles:"ROLE_ADMIN"}
}];