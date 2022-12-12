import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DataBaseService } from 'src/app/share/data-base.service';
import { map, merge, Observable, reduce } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { productMultiSingleType } from 'src/app/interfaces/multiType';
import { NavService } from 'src/app/share/nav.service';

@Component({
  selector: 'dsa-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('chooseDoorFormTarget2', {static: true}) private chooseDoorFormRef2!: ElementRef
  @ViewChild('chooseDoorFormTarget', {static: true}) private chooseDoorFormRef!: ElementRef
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
  products: productMultiSingleType[] = [];
  constructor(
    private dataBaseService: DataBaseService,
    private router: Router,
    @Inject(DOCUMENT) docRef: Document,
    public navService: NavService,
    private viewScroller: ViewportScroller
  ) { 
    this.window = docRef.defaultView
  }

  ngOnInit(): void {
    // this.window?.scrollTo(0,0)
    this.getProds()
      .subscribe((res: productMultiSingleType[]) => {
        console.log(res);
        this.products = res
      })
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


  emitScrollAction(): void{
    this.navService.animationScrollToConsultation();
    const chooseDoorFormRef = this.chooseDoorFormRef.nativeElement as HTMLElement;
    setTimeout(() => {
      chooseDoorFormRef.classList.add('flashing')
    }, 1000)
    setTimeout(() => {
      chooseDoorFormRef.classList.remove('flashing')
    }, 2000) 
  }

  emitScrollAction2(): void{
    this.navService.animationScrollToConsultation();
    const chooseDoorFormRef2 = this.chooseDoorFormRef2.nativeElement as HTMLElement;
    setTimeout(() => {
      chooseDoorFormRef2.classList.add('flashing2')
    }, 1000)
    setTimeout(() => {
      chooseDoorFormRef2.classList.remove('flashing2')
    }, 2000) 
  }



  private getProds():Observable<productMultiSingleType[]> {
    return merge(
      this.dataBaseService.getEntranceDoors(),
      this.dataBaseService.getInteriorDoors(),
      this.dataBaseService.getFurnituras(),
      this.dataBaseService.getWindows()
    ).pipe(
      reduce((acc, cur): any => [...acc, ...cur], []),
      map((el: productMultiSingleType[]) => el.filter((el:productMultiSingleType) => el.homePage === true))
    )
  }


}
