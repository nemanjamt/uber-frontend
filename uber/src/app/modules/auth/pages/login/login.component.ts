import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/modules/shared/types/login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errMessage ?:string;
  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
   }

  //  googleURL:string = "http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:4200/auth/login";
  //  facebookURL:string = "http://localhost:8080/oauth2/authorization/facebook?redirect_uri=http://localhost:4200/auth/login";
 
  ngOnInit(): void {
    const token : string = this.route.snapshot.queryParamMap.get('token') as string;
    const error : string = this.route.snapshot.queryParamMap.get('error') as string;
    if(token){
      
      localStorage.setItem("user",JSON.stringify(token));
      this.router.navigate(["/user/profile"]);
    }
    else if(error){
        this.errMessage = error;
    }
  }

  submit(){
    this.errMessage = undefined;
    const auth: Login = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.login(auth).subscribe(
      {
        next: (res) => {
          localStorage.setItem("user",JSON.stringify(res));
          this.router.navigate(["/user/profile"]); 
        },

        error: (err) => { this.errMessage = "wrong username/password";}
      }
    );
  }

}
