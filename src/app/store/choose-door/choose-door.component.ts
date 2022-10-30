import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/share/data-base.service';

@Component({
  selector: 'dsa-choose-door',
  templateUrl: './choose-door.component.html',
  styleUrls: ['./choose-door.component.scss']
})
export class ChooseDoorComponent implements OnInit {
  consultationForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'phone': new FormControl('', [
      Validators.required, 
      Validators.pattern(/^(?:\+38)?(?:\(\d{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|\d{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|\d{3}[0-9]{7})$/)]),

  })
  constructor(private dataBaseService: DataBaseService) { }

  ngOnInit(): void {
  }


  sendConsultationForm(): void{
    this.dataBaseService
      .sendConsultaionForm(this.consultationForm.value)
      .subscribe((res: {name: string, phone: string}) => console.log(res));
  }
}
