import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DataBaseService } from 'src/app/share/data-base.service';
import { map, merge, Observable, reduce } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { productMultiSingleType } from 'src/app/interfaces/multiType';
import { NavService } from 'src/app/share/nav.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  links: any[] = [
    {text: 'Наші виробники',  path:'/contacts'},
    {text: 'Двері міжкімнатні', path:'/catalog'},
    {text: 'Двері вхідні', path:'/catalog'},
    {text: 'Вікна', path:'/catalog'},
    {text: 'Фурнітура', path:'/catalog'}];
  products: productMultiSingleType[] = [];
  constructor(
    private dataBaseService: DataBaseService,
    private router: Router,
    @Inject(DOCUMENT) docRef: Document,
    public navService: NavService,
    private viewScroller: ViewportScroller,
    private snackBar: MatSnackBar
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
      .subscribe((res: {name: string, phone: string}) => this.openSnackBar('\"консультацію\"'));
    this.consultationForm.reset();
  }

  private openSnackBar(text: string): void{
    this.snackBar.open(`Заявка на ${text} була відправлено успішно`, 'X', {
      duration: 5000
    })
  }

  sendFreeSampleForm(): void{
    this.dataBaseService
      .sendFreeSampleForm(this.freeSampleForm.value)
      .subscribe((res: {name: string, phone: string, address: string}) =>  this.openSnackBar('\"підбір дверей та розрахування вартості\"'))
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
