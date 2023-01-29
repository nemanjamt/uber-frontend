import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../types/Review';
import { Ride } from '../types/Ride';
import { RideDetailed } from '../types/RideDetailed';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http:HttpClient) { }

  getRidesByClient(id:number):Observable<Ride[]>{
    return this.http.get<Ride[]>("/api/ride/findByClient/"+id);
  }
  getRidesByDriver(id:number):Observable<Ride[]>{
    return this.http.get<Ride[]>("/api/ride/findByDriver/"+id);
  }

  getRidesByUserUsername(username:string):Observable<Ride[]>{
    return this.http.get<Ride[]>("/api/ride/findByUsername/"+username);
  }

  getDetailedRide(id:number):Observable<RideDetailed>{
    return this.http.get<RideDetailed>("/api/ride/findDetailedRide/"+id);
  }

  getRidesReviews(id:number):Observable<Review[]>{
    return this.http.get<Review[]>("/api/review/findByRide/"+id);
  }

  createReview(review:any):Observable<HttpResponse<any>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    
    return this.http.post<HttpResponse<any>>("/api/review",review, queryParams);
  }

  
}
