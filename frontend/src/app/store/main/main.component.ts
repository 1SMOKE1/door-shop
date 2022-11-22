import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DataBaseService } from 'src/app/share/data-base.service';
import { map } from 'rxjs';
import { ProductI } from 'src/app/interfaces/product';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'dsa-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('chooseDoor', {static: false}) private chooseDoorRef!: ElementRef
  private window: Window | null;
  consultationForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'phone': new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?:\+38)?(?:\(\d{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|\d{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|\d{3}[0-9]{7})$/)]),
  })

  freeSampleForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'phone': new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?:\+38)?(?:\(\d{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|\d{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|\d{3}[0-9]{7})$/)]),
    'address': new FormControl('', Validators.required)
  })

  links: string[] = ['Наші виробники', 'Двері міжкімнатні', 'Двері вхідні', 'Вікна', 'Фурнітура'];
  products: ProductI[] = [];
  constructor(
    private dataBaseService: DataBaseService,
    private router: Router,
    @Inject(DOCUMENT) docRef: Document
  ) { 
    this.window = docRef.defaultView
  }

  ngOnInit(): void {
    this.window?.scrollTo(0,0)
    this.dataBaseService
      .getProducts()
      .pipe(
        map((el: ProductI[]) => el.filter((el: ProductI) => el.home_page === true))
      ).subscribe((products: ProductI[]) => this.products = products)

  }

  redirectToCard(id: string): void{
    this.router.navigate(['catalog', 'card', id])
  }

  sendConsultationForm(): void{
    this.dataBaseService
      .sendConsultaionForm(this.consultationForm.value)
      .subscribe((res: {name: string, phone: string}) => console.log(res));
    this.consultationForm.reset();
  }

  sendFreeSampleForm(): void{
    this.dataBaseService
      .sendFreeSampleForm(this.freeSampleForm.value)
      .subscribe((res: {name: string, phone: string, address: string}) => console.log(res))
    this.freeSampleForm.reset();
  }


  emitScrollAction(e: Event): void{
    const chooseDoorRef = this.chooseDoorRef.nativeElement as HTMLElement;
    chooseDoorRef.scrollIntoView({block: 'start', behavior: 'smooth'})
  }
}
