import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-user-data',
  templateUrl: './form-user-data.component.html',
  styleUrls: ['./form-user-data.component.scss']
})
export class FormUserDataComponent implements OnInit {

  @Output()
  @Input()
  dataForm !: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
