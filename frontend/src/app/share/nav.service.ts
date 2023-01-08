import { ViewportScroller } from '@angular/common';
import { Injectable, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  screenWidth: number = 0;
  constructor(
    public router: Router,
    private viewportScroll: ViewportScroller
  ) {}
  @HostListener('window:resize', ['$event'])
  public getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
  }

  public async animationScrollToConsultation(): Promise<any>{
    this.getScreenSize();
    if(this.screenWidth <= 3000){
      await this.animationScroll()
    }
    if(this.screenWidth <= 1400){
      await this.animationScroll(2550, 2550)
    }
    if(this.screenWidth <= 1200){
      await this.animationScroll(2425, 2425)
    }

  }

  public async animationScrollToConsultationMobile(): Promise<any>{
    this.getScreenSize();
    if(this.screenWidth <= 1000){
      await this.animationScroll(2425, 2425)
    }
    if(this.screenWidth <= 900){
      await this.animationScroll(2700, 2700)
    }
    if(this.screenWidth <= 800){
      await this.animationScroll(2000, 2000)
    }
    if(this.screenWidth <= 700){
      await this.animationScroll(1900, 1900)
    }
    if(this.screenWidth <= 600){
      await this.animationScroll(1875, 1875)
    }
    if(this.screenWidth <= 500){
      await this.animationScroll(2500, 2500)
    }
    if(this.screenWidth <= 400){
      await this.animationScroll(2475, 2475)
    }
    if(this.screenWidth <= 375){
      await this.animationScroll(2450, 2450)
    }
  }
  

  private async animationScroll(x: number = 2450, y: number = 2450): Promise<any>{
    await this.router.navigateByUrl('store');
    this.viewportScroll.scrollToPosition([x, y]);
  } 
}
