import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesMoveService {

  private coordinates = new Subject<{}>();

  coordinates$ = this.coordinates.asObservable();

  constructor() {


   }


  // Service message commands
  sendCoordinates(coord:any) {
    this.coordinates.next(coord);
    // this.coordinates.next(mission);
  }
}
