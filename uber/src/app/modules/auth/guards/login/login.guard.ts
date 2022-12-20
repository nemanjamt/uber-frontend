import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public auth:AuthService, public router: Router){}

  canActivate():  boolean {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/user/profile']);
      return true;
    }
    return true;
  }
  
}
