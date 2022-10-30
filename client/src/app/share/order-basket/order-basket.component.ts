
import { DOCUMENT } from '@angular/common';
import { Component,
   ElementRef,
   Inject,
   OnInit, ViewChild, AfterViewInit, DoCheck, ContentChild, TemplateRef } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartLine } from 'src/app/models/cart-line.model';
import { CartService } from '../cart.service';
import { DataBaseService } from '../data-base.service';




@Component({
  selector: 'dsa-order-basket',
  templateUrl: './order-basket.component.html',
  styleUrls: ['./order-basket.component.scss']
})
export class OrderBasketComponent implements OnInit, AfterViewInit, DoCheck {
  window: Window | null;
  sendForm: boolean = false;
  @ViewChild('orderForm', {static: false}) public elemOrderForm!: ElementRef;
  @ViewChild('carouselLine', {static: false}) public carouselLine!: ElementRef;
  @ViewChild('carouselWrap', {static: false}) public carouselWrap!: ElementRef;
  @ViewChild('orderBasket', {static: false}) public orderBasket!: ElementRef;
  @ViewChild('emptyBasket', {static: true}) public emptyBasket!: TemplateRef<any>;
  cartLines: CartLine[] = [];
  constructor(
    @Inject(DOCUMENT) docRef: Document,
    public cartService:CartService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataBaseService: DataBaseService,
    private matDialogRef: MatDialogRef<OrderBasketComponent>
    ) {
      this.window = docRef.defaultView;
     }

  ngOnInit(): void {
    this.getCarts();
    
    // emptyBasket.style.width = this.emptyBasket.nativeElement - 240 + 'px';
  }

  clearCarts(): void{
    this.cartService.clearCarts();
    this.getCarts();
  }

  private getCarts(): void{
    this.cartLines = this.cartService.getCartLines();
  }

  deleteCart(id: string): void{
    this.cartService.deleteCardLine(id)
    this.getCarts();
  }

  toCatalog(): void{
    this.dialog.closeAll()
    this.router.navigate(['/catalog'])
  }

  toOrderForm(): void{
    const carouselLine = this.carouselLine.nativeElement as HTMLElement;
    carouselLine.style.transform = (`translate(-${carouselLine.offsetWidth / 2}px)`)
    console.log(carouselLine.offsetWidth);
    const orderForm = this.elemOrderForm.nativeElement as HTMLElement;
    setTimeout(() => {
      orderForm.scrollIntoView({block: 'start', behavior: 'smooth'})
    }, 1500);
    
  }

  goBackFromForm(e?: Event): void{
    const carouselLine = this.carouselLine.nativeElement as HTMLElement;
    carouselLine.style.transform = (`translate(${0}px)`)
    
  }

  sendEmitFromForm(e: Event): void{
    this.sendForm = !this.sendForm
  }

  toCatalogAfterSubmit(): void{
    this.sendForm = false;
    this.goBackFromForm();
    this.cartService.clearCarts();
    this.dialog.closeAll();
    this.router.navigate(['catalog'])
  }

  ngAfterViewInit(): void {
    if(this.emptyBasket){
      const emptyBasket = this.emptyBasket.elementRef.nativeElement.previousElementSibling.children[2] as HTMLElement;
      console.log(this.window!.innerWidth);
      console.log(emptyBasket.offsetWidth)
    }
    
    const adaptiveFn = (): void => {
      
      if(this.carouselWrap && this.orderBasket && this.carouselLine && this.window!.innerWidth <= 1200){
        const carouselWrap = this.carouselWrap?.nativeElement as HTMLElement;
        carouselWrap.style.width = this.window!.innerWidth - 240 + 'px';
        const orderBasket = this.orderBasket?.nativeElement as HTMLElement;
        orderBasket.style.width = this.window!.innerWidth - 240 + 'px';
        const carouselLine = this.carouselLine?.nativeElement as HTMLElement;
        carouselLine.style.width = (this.window!.innerWidth - 240) * 2 + 'px';
        
        // emptyBasket.style.width = this.window!.innerWidth - 240 + 'px';
        if(this.window!.innerWidth <= 550){
          carouselWrap.style.width = this.window!.innerWidth - 30 + 'px';
          orderBasket.style.width = this.window!.innerWidth - 30 + 'px';
          carouselLine.style.width = (this.window!.innerWidth - 30) * 2 + 'px';
          // emptyBasket.style.width = this.emptyBasket.nativeElement - 30 + 'px';
        }
       
        for(const child of carouselLine.children as any){
          child.style.width = carouselWrap.offsetWidth + 'px';
          child.style.height = 'auto';
        }
        this.goBackFromForm();
    }
    }
    this.window?.addEventListener('resize', adaptiveFn);
    adaptiveFn();
  }

  ngDoCheck(): void {
    // this.adaptiveTableMobile(500);
    // this.adaptiveTableMobile(1000);
  }

  private adaptiveTableMobile(screenW: number){
    if(this.window!.innerWidth <= screenW){
      
      if(this.carouselLine && this.carouselWrap){
        const carouselWrap = this.carouselWrap?.nativeElement as HTMLElement;
        const carouselLine = this.carouselLine?.nativeElement as HTMLElement;
        carouselLine.style.width = carouselWrap.offsetWidth * 2 + 'px'
        for(const child of carouselLine.children as any){
          child.style.width = carouselWrap.offsetWidth + 'px';
          child.style.height = 'auto';
        }
      }
    }
  }
}
