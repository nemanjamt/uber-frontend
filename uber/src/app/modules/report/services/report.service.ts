import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RideReport } from '../types/RideReport';
import { RideSummaryReport } from '../types/RideSummaryReport';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http:HttpClient) { }

  getReportAdmin(request:any):Observable<HttpResponse<RideReport[]>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.post<HttpResponse<RideReport[]>>("/api/ride/reportAdmin",request, queryParams);
  }

  getReportClient(request:any, id:number):Observable<HttpResponse<RideReport[]>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.post<HttpResponse<RideReport[]>>("/api/ride/reportClient/"+id,request, queryParams);
  }

  getReportDriver(request:any, id:number):Observable<HttpResponse<RideReport[]>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.post<HttpResponse<RideReport[]>>("/api/ride/reportDriver/"+id,request, queryParams);
  }

  getReportByUsername(request:any, username:string):Observable<HttpResponse<RideReport[]>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.post<HttpResponse<RideReport[]>>("/api/ride/reportByUsername/"+username,request, queryParams);
  }

  getReportSummaryAdmin(request:any):Observable<HttpResponse<RideSummaryReport>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.post<HttpResponse<RideSummaryReport>>("/api/ride/reportSummaryAdmin",request, queryParams);
  }

  getReportSummaryClient(request:any,id:number):Observable<HttpResponse<RideSummaryReport>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.post<HttpResponse<RideSummaryReport>>("/api/ride/reportSummaryClient/"+id,request, queryParams);
  }

  getReportSummaryDriver(request:any,id:number):Observable<HttpResponse<RideSummaryReport>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.post<HttpResponse<RideSummaryReport>>("/api/ride/reportSummaryDriver/"+id,request, queryParams);
  }

  getReportSummaryByUsername(request:any,username:string):Observable<HttpResponse<RideSummaryReport>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.post<HttpResponse<RideSummaryReport>>("/api/ride/reportSummaryByUsername/"+username,request, queryParams);
  }
}
