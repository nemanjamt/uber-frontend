import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PhotoService } from 'src/app/modules/photo/services/photo.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { UserData } from 'src/app/modules/user/types/UserData';
import { RideService } from '../../services/ride.service';
import { Coordinates } from '../../types/Coordinates';
import { Review } from '../../types/Review';
import { RideUserData } from '../../types/RideUserData';

@Component({
  selector: 'app-detailed-ride-review',
  templateUrl: './detailed-ride-review.component.html',
  styleUrls: ['./detailed-ride-review.component.scss']
})
export class DetailedRideReviewComponent implements OnInit {

  reviewForm !: FormGroup;
  choosedStar :number = 0;
  driver!:UserData
  rideDriver!:RideUserData;
  reviews:Review[] = [];
  clients:UserData[] = [];

  rideClients : RideUserData[] = [];
  rideId !: number;
  coordinates!:Coordinates[] ;
  constructor(public photoService:PhotoService, public authService:AuthService, private fb: FormBuilder,private route: ActivatedRoute,
    private rideService:RideService, private userService:UserService) {
    this.createForm();
    this.getRide();
    this.getReviews();
   }

   

   createForm(){
    this.reviewForm = this.fb.group({
      grade: [0, [Validators.min(1), Validators.max(5)]],//inicijalna vrijednost i validator tj sta mora ispuniti
      comment: [""],
    });
   }

  getReviews(){
    this.rideService.getRidesReviews(this.rideId).subscribe({
      next:(res)=>{
        this.reviews = res;
      },
      error:(err)=>{

      }
    })
  }

  isLeavedReview():boolean{
    const clientId = this.userService.getCurrentlyLoggedId();
    return this.reviews.some(review => review.client.id == clientId);
  }

  getRide(){
    const id = this.route.snapshot.queryParamMap.get('rideId') ;
    if(id == null){
      return;
    }
    this.rideId = id as unknown as number;
    this.rideService.getDetailedRide(this.rideId).subscribe({
      next:(res) =>{

        // let clientsIds :number[] = res.clientsIds;
        let driverId  = res.driverId as number;
        this.coordinates = res.coordinates;
        this.userService.getUserById(driverId).subscribe({
          next:(res)=>{
            
            this.driver = res.body as UserData;
            this.rideDriver = {id:this.driver.id, username:this.driver.username,lastName:this.driver.lastName, name:this.driver.name, email:this.driver.email, photo:"./../../../../../../../assets/default-profile-pic.png"};
            if(this.driver.photoId){
              this.photoService.getPhotoById(this.driver.photoId).subscribe({
                next:(res) =>{
                  this.rideDriver.photo= 'data:image/jpeg;base64,'+res.body;;
                },
                error:(err)=>{
                  
                }
              });
            }
          },
          error:(err)=>{

          }
        });
        
        for(let clientId of res.clientsIds){
          
          this.userService.getUserById(clientId).subscribe({
            next:(res)=>{
              
              let client = res.body as UserData;
              let rideClient = {id:client.id, username:client.username,lastName:client.lastName, name:client.name, email:client.email, photo:"./../../../../../../../assets/default-profile-pic.png"};
              
              if(client.photoId){
                this.photoService.getPhotoById(client.photoId).subscribe({
                  next:(res) =>{
                    rideClient.photo= 'data:image/jpeg;base64,'+res.body;;
                  },
                  error:(err)=>{
                    
                  }
                });
              }
              
            this.rideClients.push(rideClient);
            },
            error:(err)=>{
  
            }
          })
        }
      },
      error:(err) =>{

      }
    });

    
  }

 
  ngOnInit(): void {
    
  }

  getPhoto(id:number):string{
    // this.photoService.getPhotoById(id).subscribe({
    //   next:(res) =>{
    //     return 'data:image/jpeg;base64,'+res.body;;
    //   },
    //   error:(err)=>{
    //     return "";
    //   }
    // });
    return "./../../../../../../../assets/default-profile-pic.png";
  }

  onStarClick(n:number){
    this.choosedStar = n;
    this.reviewForm.controls['grade'].setValue(n);

  }

  createReview(){
    let reviewRequest = {
      grade:this.reviewForm.value.grade,
      comment:this.reviewForm.value.comment,
      rideId:this.rideId,
      clientId:this.userService.getCurrentlyLoggedId()
    };
    this.rideService.createReview(reviewRequest).subscribe({
      next:(res)=>{
        this.getReviews();
      },
      error:(err)=>{

      }
    })
  }


}
