import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DataChangeRequest } from '../../types/dataChangeRequest';

@Component({
  selector: 'app-all-data-change-requests',
  templateUrl: './all-data-change-requests.component.html',
  styleUrls: ['./all-data-change-requests.component.scss']
})
export class AllDataChangeRequestsComponent implements OnInit {

  requests:DataChangeRequest[] =[];
  constructor(private userService: UserService) { 
    
  }

  

  loadRequests(){
    this.userService.getAllDriverDataChangeRequest().subscribe({
      next: res =>{
        this.requests = res.body as DataChangeRequest[];
        
      }
    });
  }
  ngOnInit(): void {
   this.loadRequests();
  }


  approve(id:number){
    console.log(id);
    console.log("pozvan approve");
    this.userService.approveRequest(id).subscribe({
      next: res =>{
        this.loadRequests();
      }
    })

  }

  reject(id:number){
    this.userService.rejectRequest(id).subscribe({
      next: res =>{
        this.loadRequests();
      }
    });
  }

}
