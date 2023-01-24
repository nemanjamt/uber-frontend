import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {

  message:string = "";
  successConfirm !: boolean ;
  constructor(private route: ActivatedRoute, private userService:UserService) { 
    this.getToken();
  }

  getToken(){
    const token: string = this.route.snapshot.queryParamMap.get('token') as string;
    if(token != null){
      this.userService.confirmRegistration(token).subscribe(
        {
          next: (res) => {
            
            this.successConfirm = true;
          },
  
          error: (err) => { 
            this.successConfirm = false;
            }
        }
      );
      
    }
    
  }

  ngOnInit(): void {
   
  }

}
