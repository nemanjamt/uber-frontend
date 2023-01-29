import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar-driver',
  templateUrl: './navbar-driver.component.html',
  styleUrls: ['./navbar-driver.component.scss']
})
export class NavbarDriverComponent implements OnInit {

  isActive!:boolean;
  constructor(private router:Router, private authService:AuthService) { }
  
  ngOnInit(): void {
    if(localStorage.getItem("driverActive")){
      this.isActive = true;
    }
  }

  logout(){
    this.authService.deactivateDriver().subscribe({
      next:(res)=>{
        this.authService.logout();
        this.router.navigate(["/uber/auth/login"]);
      },
      error:(err)=>{

      }
    })
    
  }

  onActiveChange(){
    if(this.isActive){
      this.authService.activateDriver().subscribe({
        next:(res)=>{
          localStorage.setItem("driverActive","true");
        }
      });
    }else{
      this.authService.deactivateDriver().subscribe({
        next:(res)=>{
          localStorage.removeItem("driverActivate");
        }
      });
    }
  }

}
