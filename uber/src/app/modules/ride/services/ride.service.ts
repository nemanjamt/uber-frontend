import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from '../types/Ride';

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

  
}
