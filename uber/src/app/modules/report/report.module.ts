import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportComponent } from './pages/report/report.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { routes } from './report.routes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
  ],
  providers:[DatePipe]
})
export class ReportModule { }
