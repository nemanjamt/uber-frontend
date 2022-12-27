import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
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
}
