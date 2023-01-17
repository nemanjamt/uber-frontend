import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../services/user.service';
import { DataChangeRequest } from '../../types/dataChangeRequest';

@Component({
  selector: 'app-driver-data-change-request',
  templateUrl: './driver-data-change-request.component.html',
  styleUrls: ['./driver-data-change-request.component.scss']
})
export class DriverDataChangeRequestComponent implements OnInit {

  dataForm !: FormGroup;
  dataChangeRequest : DataChangeRequest = {id:-1,name:"",lastName:"",email:"", username:"", phone:"", address:""};
  
  constructor(private fb:FormBuilder, private userService:UserService) { 
    this.findUser();
    this.initialize();
    this.createForm();
  }

  ngOnInit(): void {
  }

  isChanged(){
    return this.dataChangeRequest.name === this.dataForm.value.name && this.dataChangeRequest.lastName === this.dataForm.value.lastName
    && this.dataChangeRequest.email === this.dataForm.value.email && this.dataChangeRequest.username === this.dataForm.value.username 
    && this.dataChangeRequest.phone === this.dataForm.value.phone && this.dataChangeRequest.address == this.dataForm.value.address;
  }

  findUser(){
    const jwt: JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem("user");
    if(!token){
      return;
    }
    const info = jwt.decodeToken(token);
    return info.id;
  }

  createForm() {
    this.dataForm = this.fb.group({
      name: [this.dataChangeRequest.name,[Validators.required, Validators.minLength(2)],],
      lastName: [this.dataChangeRequest.lastName, [Validators.required]],//inicijalna vrijednost i validator tj sta mora ispuniti
      email: [this.dataChangeRequest.email, [Validators.required, Validators.email]],
      username: [this.dataChangeRequest.username, [Validators.required]],
      phone: [this.dataChangeRequest.phone, [Validators.required]],
      address: [this.dataChangeRequest.address, [Validators.required]]
    });
  }

  initialize(){
    
    this.userService.getDriverDataChangeRequest(this.findUser()).subscribe(res =>{
      this.dataChangeRequest = res.body as DataChangeRequest;
      console.log(this.dataChangeRequest);
      this.dataForm = this.fb.group({
        name: [this.dataChangeRequest.name,[Validators.required, Validators.minLength(2)],],
        lastName: [this.dataChangeRequest.lastName, [Validators.required]],//inicijalna vrijednost i validator tj sta mora ispuniti
        email: [this.dataChangeRequest.email, [Validators.required, Validators.email]],
        username: [this.dataChangeRequest.username, [Validators.required]],
        phone: [this.dataChangeRequest.phone],
        address:[this.dataChangeRequest.address]
      });
      
    });
    
    
  }

  onSubmit(){
    let request:DataChangeRequest = {id:this.dataChangeRequest.id, name:this.dataForm.value.name, lastName:this.dataForm.value.lastName,
      email:this.dataForm.value.email, username:this.dataForm.value.username, phone:this.dataForm.value.phone, address:this.dataForm.value.address}
    console.log("!#&&");
    console.log(this.dataForm.value.address);
    this.userService.changeDriverDataChangeRequest(request).subscribe({
      next:res =>{
        // this.errMessage = undefined;
        this.initialize();
        
      },
      // error:(err) =>{this.errMessage = err.error; }
      
    })
  }


}
