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

  public async scrollToConsultationAnim(): Promise<any>{
    this.getScreenSize();
    if(this.screenWidth <= 3000){
      await this.animationScroll(600, 600)
    }
    if(this.screenWidth <= 1300){
      await this.animationScroll(700, 700)
    }
    if(this.screenWidth <= 1200){
      await this.animationScroll(900, 900)
    }
    if(this.screenWidth <= 800){
      await this.animationScroll(500, 500)
    }
  }

  public async scrollToFreeSampleAnim(): Promise<any>{
    this.getScreenSize();
    if(this.screenWidth <= 3000){
      await this.animationScroll(2600, 2600)
    }
    if(this.screenWidth <= 1300){
      await this.animationScroll(2800, 2800)
    }
    if(this.screenWidth <= 1200){
      await this.animationScroll(2700, 2700)
    }
    if(this.screenWidth <= 900){
      await this.animationScroll(3000, 3000)
    }
    if(this.screenWidth <= 800){
      await this.animationScroll(2110, 2110)
    }
    if(this.screenWidth <= 700){
      await this.animationScroll(2100, 2100)
    }
    if(this.screenWidth <= 500){
      await this.animationScroll(2700, 2700)
    }
  }
  

  private async animationScroll(x: number = 2450, y: number = 2450): Promise<any>{
    await this.router.navigateByUrl('store');
    this.viewportScroll.scrollToPosition([x, y]);
  } 
}
