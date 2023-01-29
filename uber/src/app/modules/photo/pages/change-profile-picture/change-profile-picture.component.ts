import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.scss']
})
export class ChangeProfilePictureComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private httpClient: HttpClient, private photoService:PhotoService, private router: Router, private userService:UserService) { }

  uploadedImage?: File;  
  dbImage: any; 
  postResponse: any;
  successResponse!: string;
  image: any;
  successMessage?:string;
  errorMessage ?:string;
  imgSrc ?:string;
  public onImageUpload(event:any) {    
    this.successMessage = undefined;
    this.errorMessage = undefined;
    if(event.target.files[0] == undefined)
      return;
    this.uploadedImage = undefined;

    if(!event.target.files[0].type.startsWith("image") ){
      this.errorMessage = "bad file type - upload just image";
      return;
    }
    if(event.target.files[0].size > 5000000){
      this.errorMessage = "max file size is 5mb";
      return;
    }
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imgSrc = reader.result as string;

    reader.readAsDataURL(this.uploadedImage as File);
  }


  

  imageUploadAction() {    
    if(this.uploadedImage == undefined){
      return;
    }
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
  

    this.photoService.changeProfilePicture(this.userService.getCurrentlyLoggedId(),imageFormData).subscribe(res =>{
      console.log("Promjenjena profilna slika?");
      this.router.navigate(['/uber/user/profile']);
    });
    
  }
}
