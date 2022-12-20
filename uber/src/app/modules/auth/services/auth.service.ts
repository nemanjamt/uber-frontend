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
}
