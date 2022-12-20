import { Routes } from "@angular/router";
import { RootLayoutComponent } from "./pages/root-layout/root-layout.component";

export const routes: Routes = [
    {
        path: "",
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
          
        ]
      }
]