import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { NavbarClientComponent } from './components/navbar-client/navbar-client.component';
import { NavbarDriverComponent } from './components/navbar-driver/navbar-driver.component';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './root.routes';
import { WelcomeComponent } from './pages/welcome/welcome.component';



@NgModule({
  declarations: [
    NavbarAdminComponent,
    NavbarClientComponent,
    NavbarDriverComponent,
    RootLayoutComponent,
    NotFoundPageComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes)
  ]
})
export class RootModule { }
