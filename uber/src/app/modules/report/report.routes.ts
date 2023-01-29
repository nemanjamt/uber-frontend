import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { ReportComponent } from "./pages/report/report.component";

export const routes : Routes = [
    {
        path:"",
        pathMatch:"full",
        component: ReportComponent,
        canActivate:[RoleGuard],
        data:{expectedRoles:"ROLE_ADMIN|ROLE_DRIVER|ROLE_CLIENT"}
    
    }];