import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/share/data-base.service';
import { NavService } from 'src/app/share/nav.service';

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

  private window: Window | null;
  constructor(
    private dataBaseService: DataBaseService,
    private navService: NavService,
    @Inject(DOCUMENT) docref: Document
    ) {
      this.window = docref.defaultView;
     }

  ngOnInit(): void {
    this.window?.scrollTo(0,0)
  }


  sendConsultationForm(): void{
    this.dataBaseService
      .sendConsultaionForm(this.consultationForm.value)
      .subscribe(() => '');
  }

  emitScrollAction(): void{
    this.navService.animationScrollToConsultation();
  }


  
}
