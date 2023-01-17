import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PhotoService } from 'src/app/modules/photo/services/photo.service';
import { UserService } from '../../services/user.service';
import { UserData } from '../../types/UserData';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  dataForm !: FormGroup;
  userData : UserData = {id:-1,name:"",lastName:"",address:"",email:"", username:"", phone:""};
  errMessage ?: string;
  image ?:string;
  isDriver!: boolean;
  constructor(private fb:FormBuilder,public router:Router, private userService:UserService, private photoService:PhotoService, private authService: AuthService) { 
    
    this.isDriver = authService.isDriver();
    this.findUser();
    this.initialize();
    this.createForm();
  }

  createForm() {
    this.dataForm = this.fb.group({
      name: [this.userData.name,[Validators.required, Validators.minLength(2)],],
      lastName: [this.userData.lastName, [Validators.required]],//inicijalna vrijednost i validator tj sta mora ispuniti
      email: [this.userData.email, [Validators.required, Validators.email]],
      username: [this.userData.username, [Validators.required]],
      phone: [this.userData.phone, [Validators.required]],
      address: [this.userData.address, [Validators.required]]
    });
  }

 
  findUser(){
    const jwt: JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem("user");
    if(!token){
      return;
    }
    const info = jwt.decodeToken(token);
    this.userData.id = info.id;
  }

  isChanged(){
    return this.userData.name === this.dataForm.value.name && this.userData.lastName === this.dataForm.value.lastName
    && this.userData.email === this.dataForm.value.email && this.userData.username === this.dataForm.value.username 
    && this.userData.phone === this.dataForm.value.phone && this.userData.address === this.dataForm.value.address;
  }

  onSubmit(){
    let changedUserData:UserData = {id:this.userData.id, name:this.dataForm.value.name, lastName:this.dataForm.value.lastName,
    email:this.dataForm.value.email,address:this.dataForm.value.address, username:this.dataForm.value.username, phone:this.dataForm.value.phone}
      console.log(changedUserData);
      console.log(":)");
    this.userService.changeUserData(changedUserData).subscribe(
      {
        next:res =>{
          this.errMessage = undefined;
          this.initialize();
          
        },
        error:(err) =>{this.errMessage = err.error; }
      }
      
    
    );
  }

  onDriverSubmit(){
    let changedUserData:UserData = {id:this.userData.id, name:this.dataForm.value.name, lastName:this.dataForm.value.lastName,
      email:this.dataForm.value.email,address:this.dataForm.value.address, username:this.dataForm.value.username, phone:this.dataForm.value.phone}
    console.log(changedUserData);
    console.log(":)");
      this.userService.createDriverDataChangeRequest(changedUserData).subscribe(
        {next:res =>{
          this.errMessage = undefined;
          //ubaciti redirect na stranicu za prikaz zahtjeva za izmjenu podataka
          this.router.navigate(['/user/driver-data-change-requests']);
          // this.initialize();
          
        },
        error:(err) =>{this.errMessage = err.error; }
      }
        );
  }


  
  initialize(){
    
    this.userService.getUserById(this.userData.id).subscribe(res =>{
      this.userData = res.body as UserData;
      console.log(this.userData);
      this.dataForm = this.fb.group({
        name: [this.userData.name,[Validators.required, Validators.minLength(2)],],
        lastName: [this.userData.lastName, [Validators.required]],//inicijalna vrijednost i validator tj sta mora ispuniti
        email: [this.userData.email, [Validators.required, Validators.email]],
        username: [this.userData.username, [Validators.required]],
        phone: [this.userData.phone],
        address:[this.userData.address]
      });
      if(res.body?.photoId){
        this.photoService.getPhotoById(this.userData.photoId as number).subscribe(res =>{
          this.image = 'data:image/jpeg;base64,'+res.body;
        });
      }else{
        this.image = "./../../../../../../../assets/default-profile-pic.png";
      }
    });
    
    
  }

  ngOnInit(): void {
    
  }


}
