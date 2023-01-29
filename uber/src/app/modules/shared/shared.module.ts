import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { MapComponent } from './components/map/map.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MapComponent
  ],
  providers:[{
    provide: HTTP_INTERCEPTORS, useClass:Interceptor, multi:true
  }]
})
export class SharedModule { }
