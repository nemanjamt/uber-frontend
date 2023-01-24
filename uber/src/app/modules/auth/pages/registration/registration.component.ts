import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/modules/shared/validation/password-validation';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!:FormGroup;
  badMessage !:string ;
  successMessage !: string;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm();
   }

   createForm(){
    this.registrationForm = this.fb.group({
      name:["", [Validators.required, Validators.minLength(2)] ],
      lastName:["", [Validators.required,Validators.minLength(2)] ],
      username:["", [Validators.required, Validators.minLength(6)] ],
      phoneNumber:["",[Validators.required,Validators.minLength(8)]],
      city:["",[Validators.required,Validators.minLength(2)]],
      email:["", [Validators.required, Validators.email] ],
      password:["", [Validators.required,Validators.minLength(10)] ],
      pwConfirm:["", [Validators.required]]
    },{
      validator: ConfirmedValidator("password", "pwConfirm"),
    })
  }

  ngOnInit(): void {
  }

  registrate(){
    console.log(this.registrationForm.value);
    let req = this.registrationForm.value;
    req.phone = this.registrationForm.value.phoneNumber;
    req.address = this.registrationForm.value.city;
    this.userService.clientRegistration(req).subscribe({
      next: (res) => {
        this.successMessage = "Success registration. Check email to confirm registration";
        this.badMessage = "";
        console.log("USPJESNO");
        console.log(res);
      },

      error: (err) => { 
        console.log("NEUSPJESNO");
        console.log(err);
        console.log(err.error);
        this.badMessage = err.error;
        this.successMessage = "";
        }
    });
  }


}
