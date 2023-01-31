import { Routes } from "@angular/router";
import { LoginGuard } from "../auth/guards/login/login.guard";
import { RootLayoutComponent } from "./pages/root-layout/root-layout.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";

export const routes: Routes = [
  {
    path:"",
    component:WelcomeComponent,
    canActivate:[LoginGuard]
  },
    {
        path: "uber",
        component: RootLayoutComponent,
        children:[
          {
            path:"user",
            loadChildren: () =>
              import("./../user/user.module").then((m) => m.UserModule)
          },
          {
            path:"auth",
            loadChildren:() => 
              import("./../auth/auth.module").then((m) => m.AuthModule),
            
          },
          {
            path:"ride",
            loadChildren:() =>
            import("./../ride/ride.module").then((m) => m.RideModule),
          },
          {
            path:"report",
            loadChildren: () =>
              import("./../report/report.module").then((m) => m.ReportModule)
          },
          {
            path:"chat",
            loadChildren:()=>
            import("../chat/chat.module").then((m) => m.ChatModule),
          }
          
        ]
      }
]