import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmedValidator } from 'src/app/modules/shared/validation/password-validation';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.scss']
})
export class CreateNewPasswordComponent implements OnInit {

  password !: string;
  confirmedPassword!:string;
  successMessage !: string;
  errorMessage !:string;
  passwordForm!:FormGroup;
  constructor(private route: ActivatedRoute, private userService:UserService, private fb: FormBuilder) {
    this.getToken();
    this.createForm();
   }

   createForm(){
    this.passwordForm = this.fb.group({
      password:["", [Validators.required, Validators.minLength(8)] ],
      confirmedPassword:["",[Validators.required, Validators.minLength(8)]]
    },{
      validator: ConfirmedValidator("password", "confirmedPassword"),
    });
  }

   getToken(){
    const token: string = this.route.snapshot.queryParamMap.get('token') as string;
    console.log(token);
    
      
    }

    changePassword(){
      const token: string = this.route.snapshot.queryParamMap.get('token') as string;
      if(token == null){ return;}
      let pw = {"newPassword":this.passwordForm.value.password};
      this.userService.resetPassword(token, pw).subscribe(
        {
          next: (res) => {
            
            this.successMessage = "PASSWORD SUCCESSFUL RESTART";
            this.errorMessage = "";
          },
  
          error: (err) => { 
            console.log(err);
            this.successMessage = "";
            this.errorMessage = err.error;
            }
        }
      );
    }
  ngOnInit(): void {
  }

}
