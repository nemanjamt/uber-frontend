import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../shared/types/login';
import { Token } from '../../shared/types/token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) { }

  login(auth: Login):Observable<HttpResponse<Token>>{

    return this.http.post<HttpResponse<Token>>("api/auth/login", auth, {
      headers: this.headers,
      responseType: "json",
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  isLoggedIn():boolean {
    if(!localStorage.getItem("user")){
      return false;
    }

    return true;
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
  
  deactivateDriver():Observable<HttpResponse<any>>{

    return this.http.put<HttpResponse<any>>("api/driver/deactivate/"+this.getCurrentlyLoggedId(), {
      headers: this.headers,
      responseType: "json",
    });
  }

  activateDriver(){
    return this.http.put<HttpResponse<any>>("api/driver/activate/"+this.getCurrentlyLoggedId(), {
      headers: this.headers,
      responseType: "json",
    });
  }

  // getCurrentLogged(){
  //   const jwt: JwtHelperService = new JwtHelperService();
  //   const token = localStorage.getItem("user");
  //   if(!token){
  //     return;
  //   }
  //   const info = jwt.decodeToken(token);
  //   let u:User = {id:info.id, username:info.username};
  //   console.log(u);
  //   return u;

  // }

  isDriver():boolean{
    let token = localStorage.getItem("user");
    if(token){
      const jwt: JwtHelperService = new JwtHelperService();
      const info = jwt.decodeToken(token);
      return info.role === 'ROLE_DRIVER';
    }
    return false;
  }

  isClient():boolean{
    let token = localStorage.getItem("user");
    if(token){
      const jwt: JwtHelperService = new JwtHelperService();
      const info = jwt.decodeToken(token);
      return info.role === 'ROLE_CLIENT';
    }
    return false;
  }

  isAdmin():boolean{
    let token = localStorage.getItem("user");
    if(token){
      const jwt: JwtHelperService = new JwtHelperService();
      const info = jwt.decodeToken(token);
      return info.role === 'ROLE_ADMIN';
    }
    return false;
  }

}
