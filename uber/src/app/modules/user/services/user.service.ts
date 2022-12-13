import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  changeUserData(userData:UserData):Observable<HttpResponse<UserData>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response"
    };
    return this.http.put<HttpResponse<UserData>>("/api/users/"+userData.id,userData, queryParams);
  }
}
