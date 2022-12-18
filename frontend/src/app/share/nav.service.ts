import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  
  constructor(
    public router: Router,
    private viewportScroll: ViewportScroller
  ) { }
  
  

  async animationScrollToConsultation(): Promise<any>{
    await this.router.navigateByUrl('store');
    this.viewportScroll.scrollToPosition([2700, 2700]);
  }

  async animationScrollToConsultationMobile(): Promise<any>{
    await this.router.navigateByUrl('store');
    this.viewportScroll.scrollToPosition([2500, 2500]);
  }
  

}
