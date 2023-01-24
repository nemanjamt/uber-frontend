import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  @Input() username:string = "";
  passwordForm!:FormGroup;
  badMessage !:string ;
  successMessage !: string;
  constructor(private userService: UserService,private fb: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.passwordForm = this.fb.group({
      username:["", [Validators.required, Validators.minLength(2)] ]
    });
  }
  ngOnInit(): void {
  }

  forgotPassword(){
    this.username = this.passwordForm.value.username;
    this.userService.forgotPassword(this.username).subscribe({
      next: (res) =>{
        console.log(res);
        this.successMessage = "check your email to reset password";
        this.badMessage = "";
      },
      error: (err) =>{
        this.successMessage = "";
        this.badMessage = "unsuccessful - bad username";
      }
    })
    console.log(this.username);
  }


}
