import { Component, OnInit } from '@angular/core';
import { PositionAndSizeInterface } from 'src/app/modules/shared/types/PositionAndSize.interface';

@Component({
  selector: 'app-unregister-user-ride',
  templateUrl: './unregister-user-ride.component.html',
  styleUrls: ['./unregister-user-ride.component.scss']
})
export class UnregisterUserRideComponent implements OnInit {
  public mapPosition : PositionAndSizeInterface ={
    height: '60%',
    width: '60%',
    top: '30%',
    left: '25%',
  }
  constructor() { }

  ngOnInit(): void {
  }

}
