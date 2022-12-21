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
    if(this.screenWidth <= 1300){
      await this.animationScroll(2950, 2950)
    }
    if(this.screenWidth <= 1200){
      await this.animationScroll(2400, 2400)
    }

  }

  public async animationScrollToConsultationMobile(): Promise<any>{
    this.getScreenSize();
    if(this.screenWidth <= 1000){
      await this.animationScroll(2400, 2400)
    }
    if(this.screenWidth <= 800){
      await this.animationScroll(2000, 2000)
    }
    if(this.screenWidth <= 700){
      await this.animationScroll(1900, 1900)
    }
    if(this.screenWidth <= 500){
      await this.animationScroll(2500, 2500)
    }
    
  }
  

  private async animationScroll(x: number = 2700, y: number = 2700): Promise<any>{
    await this.router.navigateByUrl('store');
    this.viewportScroll.scrollToPosition([x, y]);
  } 
}
