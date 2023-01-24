import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { DataChangeRequest } from '../types/dataChangeRequest';
import { UserData } from '../types/UserData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http:HttpClient) { }

  getUserById(id:number):Observable<HttpResponse<UserData>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.get<HttpResponse<UserData>>("/api/users/"+id, queryParams);
  }

  getCurrentlyLoggedId():number{
    const item = localStorage.getItem("user");

    if (item) {
      const jwt: JwtHelperService = new JwtHelperService();
      let id = jwt.decodeToken(item).id;
      return id;
    }
    return -1;
  }

  changeUserData(userData:UserData):Observable<HttpResponse<UserData>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.put<HttpResponse<UserData>>("/api/users/"+userData.id,userData, queryParams);
  }

  changePassword(changePasswordReq:any, userId:number):Observable<HttpResponse<any>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.put<HttpResponse<any>>("/api/users/changePassword/"+userId,changePasswordReq, queryParams);
  }

  createDriverDataChangeRequest(userData:UserData):Observable<HttpResponse<UserData>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    
    return this.http.post<HttpResponse<UserData>>("/api/driver/dataChangeRequest/"+userData.id,userData, queryParams);
  }


  getDriverDataChangeRequest(driverId:number):Observable<HttpResponse<DataChangeRequest>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    
    return this.http.get<HttpResponse<DataChangeRequest>>("/api/driver/dataChangeRequest/"+driverId, queryParams);
  }


  changeDriverDataChangeRequest(request:DataChangeRequest){
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.put<HttpResponse<UserData>>("/api/driver/dataChangeRequest/"+request.id,request, queryParams);
  }

  getAllDriverDataChangeRequest():Observable<HttpResponse<DataChangeRequest[]>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.get<HttpResponse<DataChangeRequest[]>>("/api/driver/dataChangeRequests", queryParams);
  }

  approveRequest(id:number){
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.put("/api/driver/approveDataChangeRequest/"+id, queryParams);
  }

  rejectRequest(id:number){
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.put("/api/driver/rejectDataChangeRequest/"+id, queryParams);
  }

  confirmRegistration(token:string):Observable<HttpResponse<any>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.put<HttpResponse<any>>("/api/client/confirm/"+token, queryParams);
  }

  clientRegistration(request:any):Observable<HttpResponse<any>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.post<HttpResponse<any>>("/api/client",request, queryParams);
  }
}
