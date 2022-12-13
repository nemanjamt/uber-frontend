import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm !: FormGroup;
  badPassword : Boolean = false;
  successPassword: Boolean = false;
  constructor(private fb:FormBuilder, private userService:UserService) {
    this.createForm();
   }

   createForm() {
    this.passwordForm = this.fb.group({
      newPassword: ["", [Validators.required, Validators.minLength(6)]],//inicijalna vrijednost i validator tj sta mora ispuniti
      confirmPassword: ["", [Validators.required]],
    });
  }

  onSubmit(){
    if(this.passwordForm.value.newPassword != this.passwordForm.value.confirmPassword){
      this.badPassword = true;
      return;
    }
    let changePasswordReq = {"newPassword":this.passwordForm.value.newPassword};
    this.userService.changePassword(changePasswordReq,1).subscribe(
      {
        next: (res) => {
          this.badPassword=false;
          this.successPassword = true;
        },

        error: (err) => { this.badPassword=true;console.log(err); this.successPassword = false;}
      }
    );
  }

  ngOnInit(): void {
  }

}
