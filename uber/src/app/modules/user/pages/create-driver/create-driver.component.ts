import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/modules/shared/validation/password-validation';
import { DriverService } from '../../services/driver.service';
import { VehicleType } from '../../types/VehicleType';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.scss']
})
export class CreateDriverComponent implements OnInit {

  dataForm !: FormGroup;
  successCreated!:boolean;
  badCreated !:boolean;
  vehicleTypes: VehicleType[] = [
    {
        "id": 1,
        "name": "STANDARD"
    },
    {
        "id": 2,
        "name": "LUXURIOUS"
    },
    {
        "id": 3,
        "name": "VAN"
    }
];
  constructor(private fb: FormBuilder, private driverService: DriverService) {
    this.initForm();
   }

  initForm(){
    this.dataForm = this.fb.group({
      name: ["",[Validators.required, Validators.minLength(2)],],
      lastName: ["", [Validators.required]],//inicijalna vrijednost i validator tj sta mora ispuniti
      email: ["", [Validators.required, Validators.email]],
      username: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
      password:["", [Validators.required,Validators.minLength(10)] ],
      confirmedPassword:["", [Validators.required]],
      babyTransport:["true",Validators.required],
      petTransport:["true",Validators.required],
      capacity:[0,Validators.required],
      vehicleTypeId:[1,Validators.required]
    },{
      validator: ConfirmedValidator("password", "confirmedPassword"),
    });
  }
  ngOnInit(): void {
  }

  onSubmit(){
    

    this.driverService.createDriver(this.dataForm.value).subscribe({
      next:(res)=>{

        this.successCreated =true;
        this.badCreated = false;

      },
      error:(err)=>{
        this.successCreated =false;
        this.badCreated = true;

      }
    })
  }

}
