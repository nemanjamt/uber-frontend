import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http:HttpClient) { }

  createDriver(driverRequest:any):Observable<HttpResponse<any>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    
    return this.http.post<HttpResponse<any>>("/api/driver",driverRequest, queryParams);
  }
}
