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
  
  

  animationScrollToConsultation(): void{
    this.router.navigateByUrl('store').then(() => {
      this.viewportScroll.scrollToPosition([2700, 2700]);
    })
  }
  

}
