import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http:HttpClient) { }

  getPhotoById(id:number):Observable<HttpResponse<String>>{
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: 'text'
    };
    return this.http.get<HttpResponse<String>>("/api/photo/"+id, queryParams);
  }

  changeProfilePicture(userId:number, file:any):Observable<HttpResponse<any>>{
    let queryParams = {};
    queryParams = {
      observe: "response",
    };
    return this.http.post<HttpResponse<any>>("/api/photo/"+userId, file, queryParams);
  }
}
