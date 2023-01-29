import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { RideService } from '../../services/ride.service';
import { Ride } from '../../types/Ride';

@Component({
  selector: 'app-history-review',
  templateUrl: './history-review.component.html',
  styleUrls: ['./history-review.component.scss']
})
export class HistoryReviewComponent implements OnInit {

  rides:Ride[] = [];
  username : string = "";
  sortOrder:string = 'desc';
  sortBy:string= "";
  constructor(private rideService:RideService, private datePipe: DatePipe,private userService:UserService, public authService:AuthService) { 
    this.getRides();
  }

  getRides(){
    if(this.authService.isClient()){
      this.getRidesClient();
    }else if(this.authService.isDriver()){
      this.getRidesDriver();
    }
    
  }

  getRidesClient(){
    this.rideService.getRidesByClient(this.userService.getCurrentlyLoggedId()).subscribe({
      next:(res)=>{
        this.rides = [];
        for(let ride of res as Ride[]){
          
          // ride.startDate = this.formatDate(ride.startDate as any);
          // ride.endDate = this.formatDate(ride.endDate as any);
          this.rides.push(ride);
        }
        
      },
      error:(err)=>{

      }
    });
  }

  getRidesDriver(){
    this.rideService.getRidesByDriver(this.userService.getCurrentlyLoggedId()).subscribe({
      next:(res)=>{
        this.rides = [];
        
        for(let ride of res as Ride[]){
          
          // ride.startDate = this.formatDate(ride.startDate as any);
          // ride.endDate = this.formatDate(ride.endDate as any);
          this.rides.push(ride);
        }
        
      },
      error:(err)=>{

      }
    });
  }

  formatDate(date: number[]): string {
    const dateObject = new Date(date[0],date[1]-1,date[2], date[3],date[4]);
    return `${this.datePipe.transform(dateObject, 'HH:mm dd.MM.yyyy')}`;
  }

  ngOnInit(): void {
  }

  searchUserRides(){

    this.rideService.getRidesByUserUsername(this.username).subscribe({
      next:(res)=>{
        this.rides = [];

        for(let ride of res as Ride[]){
          
          // ride.startDate = this.formatDate(ride.startDate as any);
          // ride.endDate = this.formatDate(ride.endDate as any);
          this.rides.push(ride);
        }
        
      },
      error:(err)=>{

      }
    });
  }

  
  
  sortTable(property: keyof Ride) {
    this.sortBy = property;
    this.sortOrder = this.sortOrder == 'asc' ? 'desc':'asc';
    this.rides.sort((a: Ride, b: Ride) => {
      if (a[property] > b[property]) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      if (a[property] < b[property]) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

}
